import { createContext, useContext, useState, ReactNode } from 'react';
import { Modal } from './Modal';
import { Trophy, Mail, Lock, Shield, Users, Search, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTournaments, useTeams, useUser } from '../../store/useStore';
import { Tournament } from '../../data/tournaments';
import { Team } from '../../store/useStore';

type ModalType =
  | 'login' | 'register'
  | 'createTournament'
  | 'createTeam'
  | 'viewProfile'
  | 'invitePlayer'
  | 'registerTournament'
  | null;

interface ModalContextType {
  openModal: (type: ModalType, payload?: unknown) => void;
  closeModal: () => void;
  isLoggedIn: boolean;
  logout: () => void;
  tournaments: Tournament[];
  addTournament: (t: Omit<Tournament, 'id'>) => Tournament;
  incrementTeamCount: (id: number) => void;
  teams: Team[];
  user: ReturnType<typeof useUser>['user'];
  registerForTournament: (id: number) => void;
  updateDisplayName: (name: string) => void;
  setActiveTeam: (teamId: number) => void;
  updateOrganisation: (org: string) => void;
  leaveTeam: (teamId: number) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModals() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModals must be used within a ModalProvider');
  return ctx;
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [modalPayload, setModalPayload] = useState<unknown>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);

  const navigate = useNavigate();
  const { tournaments, addTournament, incrementTeamCount } = useTournaments();
  const { teams, createTeam } = useTeams();
  const { user, registerForTournament, updateDisplayName, joinTeam, setActiveTeam, updateOrganisation, leaveTeam } = useUser();

  // Form states
  const [newTournament, setNewTournament] = useState({ title: '', game: 'Valorant', date: '', maxTeams: 32, beschreibung: '', inviteOnly: false });
  const [newTeam, setNewTeam] = useState({ name: '', game: 'Valorant' });

  const openModal = (type: ModalType, payload?: unknown) => {
    setActiveModal(type);
    setModalPayload(payload ?? null);
    setInviteSent(false);
    if (type === 'createTournament') setNewTournament({ title: '', game: 'Valorant', date: '', maxTeams: 32, beschreibung: '', inviteOnly: false });
    if (type === 'createTeam') setNewTeam({ name: '', game: 'Valorant' });
  };

  const closeModal = () => { setActiveModal(null); setModalPayload(null); };

  const handleAuth = () => { setIsLoggedIn(true); closeModal(); navigate('/dashboard'); };
  const logout = () => { setIsLoggedIn(false); navigate('/'); };

  const handleCreateTournament = () => {
    if (!newTournament.title.trim()) return;
    addTournament({
      title: newTournament.title,
      game: newTournament.game,
      prizepool: 'Ausstehend',
      date: newTournament.date || 'Datum folgt',
      maxTeams: newTournament.maxTeams,
      currentTeams: 0,
      status: 'Registrierung offen',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
      beschreibung: newTournament.beschreibung.trim() || 'Turnierbeschreibung folgt.',
      regeln: ['Regeln folgen.'],
      organisator: user.displayName,
      isCommunityEvent: true,
      inviteOnly: newTournament.inviteOnly,
    });
    closeModal();
    navigate('/turniere');
  };

  const handleCreateTeam = () => {
    if (!newTeam.name.trim()) return;
    // Neues Team erstellen — User wird als Captain eingetragen
    const team = createTeam(newTeam.name, newTeam.game, user.displayName);
    // User dem Team hinzufügen
    joinTeam(team.id);
    closeModal();
    navigate('/dashboard');
  };

  const handleRegisterTournament = () => {
    const tournamentId = modalPayload as number;
    if (tournamentId) {
      registerForTournament(tournamentId);
      incrementTeamCount(tournamentId);
    }
    closeModal();
    navigate('/dashboard');
  };

  const handleSendInvite = () => {
    setInviteSent(true);
    setTimeout(() => closeModal(), 1500);
  };

  return (
    <ModalContext.Provider value={{
      openModal, closeModal, isLoggedIn, logout,
      tournaments, addTournament, incrementTeamCount,
      teams,
      user, registerForTournament, updateDisplayName, setActiveTeam, updateOrganisation, leaveTeam,
    }}>
      {children}

      {/* Login / Register */}
      <Modal isOpen={activeModal === 'login' || activeModal === 'register'} onClose={closeModal}
        title={activeModal === 'login' ? 'Willkommen zurück' : 'Konto erstellen'}>
        <div className="space-y-4">
          <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl p-3 text-sm text-violet-300 text-center">
            Demo-Modus: Jede Eingabe führt zum Demo-Account.
          </div>
          {activeModal === 'register' && (
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Benutzername</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-violet-500 transition-colors" placeholder="Dein Username" />
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">E-Mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-violet-500 transition-colors" placeholder="name@beispiel.de" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Passwort</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input type="password" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-violet-500 transition-colors" placeholder="••••••••" />
            </div>
          </div>
          <button onClick={handleAuth} className="w-full py-3 mt-4 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-500 transition-colors cursor-pointer">
            {activeModal === 'login' ? 'Anmelden' : 'Registrieren'}
          </button>
          <div className="text-center">
            <button onClick={() => setActiveModal(activeModal === 'login' ? 'register' : 'login')} className="text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer">
              {activeModal === 'login' ? 'Noch kein Konto? Jetzt registrieren' : 'Bereits ein Konto? Anmelden'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Turnier erstellen */}
      <Modal isOpen={activeModal === 'createTournament'} onClose={closeModal} title="Neues Turnier erstellen">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Turniername</label>
            <input type="text" value={newTournament.title} onChange={e => setNewTournament({ ...newTournament, title: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-violet-500 transition-colors" placeholder="z.B. ESL School Cup Berlin" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Spiel</label>
            <select value={newTournament.game} onChange={e => setNewTournament({ ...newTournament, game: e.target.value })}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-violet-500 transition-colors">
              <option value="Valorant">Valorant</option>
              <option value="CS:GO 2">CS:GO 2</option>
              <option value="League of Legends">League of Legends</option>
              <option value="Rocket League">Rocket League</option>
              <option value="Dota 2">Dota 2</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Startdatum</label>
              <input type="date" value={newTournament.date} onChange={e => setNewTournament({ ...newTournament, date: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-violet-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Max. Teams</label>
              <input type="number" value={newTournament.maxTeams} onChange={e => setNewTournament({ ...newTournament, maxTeams: Number(e.target.value) })}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-violet-500 transition-colors" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Beschreibung</label>
            <textarea
              rows={3}
              value={newTournament.beschreibung}
              onChange={e => setNewTournament({ ...newTournament, beschreibung: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-violet-500 transition-colors resize-none placeholder:text-zinc-600"
              placeholder="Kurze Beschreibung des Turniers..." />
          </div>
          <label className="flex items-center gap-3 cursor-pointer select-none group">
            <div
              onClick={() => setNewTournament({ ...newTournament, inviteOnly: !newTournament.inviteOnly })}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${newTournament.inviteOnly ? 'bg-violet-600 border-violet-600' : 'border-white/30 bg-white/5 group-hover:border-white/50'}`}
            >
              {newTournament.inviteOnly && <span className="text-white text-xs font-bold">✓</span>}
            </div>
            <div>
              <span className="text-sm text-white font-medium">Nur auf Einladung (Invite Only)</span>
              <p className="text-xs text-zinc-500 mt-0.5">Spieler können sich nicht selbst anmelden</p>
            </div>
          </label>
          <button onClick={handleCreateTournament} className="w-full py-3 mt-4 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-500 transition-colors flex items-center justify-center gap-2 cursor-pointer">
            <Trophy className="w-5 h-5" /> Turnier anlegen
          </button>
        </div>
      </Modal>

      {/* Team erstellen */}
      <Modal isOpen={activeModal === 'createTeam'} onClose={closeModal} title="Neues Team gründen">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Teamname</label>
            <input type="text" value={newTeam.name} onChange={e => setNewTeam({ ...newTeam, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-violet-500 transition-colors" placeholder="z.B. School Warriors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Hauptspiel</label>
            <select value={newTeam.game} onChange={e => setNewTeam({ ...newTeam, game: e.target.value })}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-violet-500 transition-colors">
              <option value="Valorant">Valorant</option>
              <option value="CS:GO 2">CS:GO 2</option>
              <option value="League of Legends">League of Legends</option>
              <option value="Rocket League">Rocket League</option>
              <option value="Dota 2">Dota 2</option>
            </select>
          </div>
          <button onClick={handleCreateTeam} className="w-full py-3 mt-4 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-500 transition-colors flex items-center justify-center gap-2 cursor-pointer">
            <Shield className="w-5 h-5" /> Team erstellen
          </button>
        </div>
      </Modal>

      {/* Für Turnier anmelden */}
      <Modal isOpen={activeModal === 'registerTournament'} onClose={closeModal} title="Für Turnier anmelden">
        <div className="space-y-4">
          <p className="text-zinc-400 text-sm">Deine Anmeldung wird in deinem Dashboard unter "Meine Turniere" gespeichert.</p>
          <button onClick={handleRegisterTournament} className="w-full py-3 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-500 transition-colors flex items-center justify-center gap-2 cursor-pointer">
            <Trophy className="w-5 h-5" /> Jetzt anmelden
          </button>
          <button onClick={closeModal} className="w-full py-3 rounded-xl bg-white/5 text-zinc-400 hover:bg-white/10 transition-colors cursor-pointer">
            Abbrechen
          </button>
        </div>
      </Modal>

      {/* Spieler einladen */}
      <Modal isOpen={activeModal === 'invitePlayer'} onClose={closeModal} title="Spieler einladen">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-violet-500 transition-colors" placeholder="Benutzername" />
          </div>
          <button onClick={handleSendInvite} className="w-full py-3 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-500 transition-colors cursor-pointer flex items-center justify-center gap-2">
            {inviteSent ? <><Check className="w-5 h-5" /> Einladung gesendet</> : 'Einladung senden'}
          </button>
        </div>
      </Modal>

      {/* Profil */}
      <Modal isOpen={activeModal === 'viewProfile'} onClose={closeModal} title="Spielerprofil">
        <div className="text-center py-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 mx-auto flex items-center justify-center text-3xl font-bold mb-4">P</div>
          <h3 className="text-2xl font-display font-bold text-white mb-1">ProPlayer123</h3>
          <p className="text-zinc-400 mb-6">Valorant • Immortal 3</p>
          <button onClick={handleSendInvite} className="w-full py-3 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-colors cursor-pointer flex items-center justify-center gap-2">
            {inviteSent ? <><Check className="w-5 h-5 text-green-400" /> Eingeladen</> : 'Ins Team einladen'}
          </button>
        </div>
      </Modal>
    </ModalContext.Provider>
  );
}
