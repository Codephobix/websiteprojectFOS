import { useState } from 'react';
import { Tournament, SEED_TOURNAMENTS } from '../data/tournaments';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface TeamMember {
  displayName: string;
  role: 'Captain' | 'Player';
}

export interface Team {
  id: number;
  name: string;
  game: string;
  members: TeamMember[];
}

export interface UserProfile {
  username: string;
  displayName: string;
  email: string;
  registeredTournamentIds: number[];
  teamIds: number[];           // alle Teams bei denen der User Mitglied ist
  activeTeamId: number | null; // das "Hauptteam" das im Profil angezeigt wird
  organisation: string;        // Schule/Organisation
}

// ─── Seed-Daten ───────────────────────────────────────────────────────────────

const DEMO_USER_DISPLAY_NAME = 'Demo Spieler';

const SEED_TEAMS: Team[] = [
  {
    id: 1,
    name: 'ESL Musterschule Squad',
    game: 'Valorant',
    members: [
      { displayName: DEMO_USER_DISPLAY_NAME, role: 'Captain' },
      { displayName: 'AimBot_Dave', role: 'Player' },
      { displayName: 'Tactical_Tina', role: 'Player' },
      { displayName: 'FlashKing99', role: 'Player' },
    ],
  },
  {
    id: 2,
    name: 'Schule B Warriors',
    game: 'CS:GO 2',
    members: [
      { displayName: 'SniperElite', role: 'Captain' },
      { displayName: DEMO_USER_DISPLAY_NAME, role: 'Player' },
      { displayName: 'RushB_Always', role: 'Player' },
    ],
  },
];

const DEFAULT_USER: UserProfile = {
  username: 'demospieler',
  displayName: DEMO_USER_DISPLAY_NAME,
  email: 'demo@muster-schule.de',
  registeredTournamentIds: [1, 3],
  teamIds: [1, 2],
  activeTeamId: 1,
  organisation: 'Musterschule A',
};

// ─── Storage helpers ──────────────────────────────────────────────────────────

const KEYS = {
  tournaments: 'esl_tournaments',
  teams: 'esl_teams',
  user: 'esl_user',
};

function load<T>(key: string, seed: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (key === KEYS.user && parsed) {
        if (!parsed.teamIds) {
          parsed.teamIds = parsed.teamId != null ? [parsed.teamId] : (seed as unknown as UserProfile).teamIds ?? [];
        }
        if (!('activeTeamId' in parsed)) {
          parsed.activeTeamId = parsed.teamId ?? (seed as unknown as UserProfile).activeTeamId ?? null;
        }
        if (!parsed.registeredTournamentIds) {
          parsed.registeredTournamentIds = [];
        }
        delete parsed.teamId;
        localStorage.setItem(key, JSON.stringify(parsed));
      }
      return parsed as T;
    }
    localStorage.setItem(key, JSON.stringify(seed));
    return seed;
  } catch {
    return seed;
  }
}

function persist<T>(key: string, value: T) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
}

// ─── Tournaments ──────────────────────────────────────────────────────────────

export function useTournaments() {
  const [tournaments, setTournamentsRaw] = useState<Tournament[]>(() =>
    load(KEYS.tournaments, SEED_TOURNAMENTS)
  );

  const setTournaments = (updated: Tournament[]) => {
    setTournamentsRaw(updated);
    persist(KEYS.tournaments, updated);
  };

  const addTournament = (t: Omit<Tournament, 'id'>) => {
    const newT: Tournament = { ...t, id: Date.now() };
    setTournaments([...tournaments, newT]);
    return newT;
  };

  const incrementTeamCount = (tournamentId: number) => {
    setTournaments(
      tournaments.map(t =>
        t.id === tournamentId ? { ...t, currentTeams: t.currentTeams + 1 } : t
      )
    );
  };

  return { tournaments, addTournament, incrementTeamCount };
}

// ─── Teams ────────────────────────────────────────────────────────────────────

export function useTeams() {
  const [teams, setTeamsRaw] = useState<Team[]>(() =>
    load(KEYS.teams, SEED_TEAMS)
  );

  const setTeams = (updated: Team[]) => {
    setTeamsRaw(updated);
    persist(KEYS.teams, updated);
  };

  /**
   * Erstellt ein neues Team, trägt den User als Captain ein und gibt die ID zurück.
   */
  const createTeam = (name: string, game: string, creatorDisplayName: string): Team => {
    const newTeam: Team = {
      id: Date.now(),
      name,
      game,
      members: [{ displayName: creatorDisplayName, role: 'Captain' }],
    };
    setTeams([...teams, newTeam]);
    return newTeam;
  };

  const addMemberToTeam = (teamId: number, displayName: string) => {
    setTeams(
      teams.map(t =>
        t.id === teamId
          ? { ...t, members: [...t.members, { displayName, role: 'Player' }] }
          : t
      )
    );
  };

  return { teams, createTeam, addMemberToTeam };
}

// ─── User ─────────────────────────────────────────────────────────────────────

export function useUser() {
  const [user, setUserRaw] = useState<UserProfile>(() =>
    load(KEYS.user, DEFAULT_USER)
  );

  const setUser = (updated: UserProfile) => {
    setUserRaw(updated);
    persist(KEYS.user, updated);
  };

  const registerForTournament = (tournamentId: number) => {
    if (user.registeredTournamentIds.includes(tournamentId)) return;
    setUser({
      ...user,
      registeredTournamentIds: [...user.registeredTournamentIds, tournamentId],
    });
  };

  const updateDisplayName = (name: string) => {
    setUser({ ...user, displayName: name });
  };

  /** Fügt ein Team zur Teamliste des Users hinzu und setzt es als aktiv */
  const joinTeam = (teamId: number) => {
    setUser({
      ...user,
      teamIds: user.teamIds.includes(teamId) ? user.teamIds : [...user.teamIds, teamId],
      activeTeamId: teamId,
    });
  };

  const setActiveTeam = (teamId: number) => {
    setUser({ ...user, activeTeamId: teamId });
  };

  const leaveTeam = (teamId: number) => {
    const newIds = user.teamIds.filter(id => id !== teamId);
    const newActive = user.activeTeamId === teamId ? (newIds[0] ?? null) : user.activeTeamId;
    setUser({ ...user, teamIds: newIds, activeTeamId: newActive });
  };

  const updateOrganisation = (org: string) => {
    setUser({ ...user, organisation: org });
  };

  return { user, registerForTournament, updateDisplayName, joinTeam, setActiveTeam, updateOrganisation, leaveTeam };
}
