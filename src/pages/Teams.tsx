import { AdBanner } from '../components/ui/AdBanner';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Shield, Trophy, Users, X, Star, Building } from 'lucide-react';
import { useModals } from '../components/ui/ModalContext';

const SEED_TEAMS = [
  { id: 101, name: 'ESL Nordhorn Squad', game: 'Valorant', school: 'Musterschule A', members: ['Demo Spieler', 'AimBot_Dave', 'Tactical_Tina', 'FlashKing99'], wins: 7, tournaments: 5 },
  { id: 102, name: 'School Warriors', game: 'CS:GO 2', school: 'Beispielschule B', members: ['SniperElite', 'Demo Spieler', 'RushB_Always'], wins: 4, tournaments: 6 },
  { id: 103, name: 'Digital Eagles', game: 'League of Legends', school: 'Lernzentrum C', members: ['MidLane99', 'JungleKing', 'ADCarry_X', 'SupportPro', 'TopFrag'], wins: 9, tournaments: 8 },
  { id: 104, name: 'Pixel Wolves', game: 'Valorant', school: 'Akademie D', members: ['WolfAlpha', 'QuickScope', 'Phantom_X'], wins: 2, tournaments: 3 },
  { id: 105, name: 'Storm Riders', game: 'Rocket League', school: 'Schule E', members: ['RocketAce', 'AerialKing', 'GoalieGod'], wins: 5, tournaments: 4 },
  { id: 106, name: 'Code Breakers', game: 'CS:GO 2', school: 'Bildungszentrum F', members: ['HackerX', 'BombDefuser', 'SprayControl', 'PeekMaster'], wins: 3, tournaments: 5 },
];

export function Teams() {
  const { openModal, isLoggedIn, teams: storeTeams } = useModals();
  const [search, setSearch] = useState('');
  const [viewTeam, setViewTeam] = useState<(typeof SEED_TEAMS[0]) | null>(null);

  // Merge Seed-Teams + neu erstellte Teams aus dem Store (nur neue, keine Duplikate)
  const storeTeamsMapped = storeTeams.map(t => ({
    id: t.id,
    name: t.name,
    game: t.game,
    school: 'Musterschule',
    members: t.members.map(m => m.displayName),
    wins: 0,
    tournaments: 0,
  }));
  const seedIds = new Set(SEED_TEAMS.map(t => t.id));
  const newTeams = storeTeamsMapped.filter(t => !seedIds.has(t.id));
  const allTeams = [...SEED_TEAMS, ...newTeams];

  const filtered = allTeams.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.game.toLowerCase().includes(search.toLowerCase()) ||
    t.school.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="mb-12">
        <h1 className="text-5xl md:text-6xl font-display font-black mb-6">TEAMS</h1>
        <p className="text-xl text-zinc-400 max-w-2xl">Entdecke Schulteams oder gründe dein eigenes.</p>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Team, Spiel oder Schule suchen..."
            className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all" />
        </div>
        <button onClick={() => isLoggedIn ? openModal('createTeam') : openModal('login')}
          className="px-6 py-3 rounded-full bg-violet-600 text-white font-medium hover:bg-violet-500 transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-violet-600/20">
          <Shield className="w-5 h-5" /> Team gründen
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((team, i) => (
          <motion.div key={team.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-xl font-bold text-white flex-shrink-0">
                {team.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-display font-bold text-white truncate">{team.name}</h3>
                <span className="text-sm text-zinc-400">{team.game}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-4">
              <Building className="w-3 h-3" /><span>{team.school}</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="bg-black/30 rounded-xl p-3 text-center border border-white/5">
                <div className="text-zinc-500 text-xs mb-1 flex items-center justify-center gap-1"><Star className="w-3 h-3" /> Siege</div>
                <div className="font-bold text-white">{team.wins}</div>
              </div>
              <div className="bg-black/30 rounded-xl p-3 text-center border border-white/5">
                <div className="text-zinc-500 text-xs mb-1 flex items-center justify-center gap-1"><Trophy className="w-3 h-3" /> Turniere</div>
                <div className="font-bold text-white">{team.tournaments}</div>
              </div>
              <div className="bg-black/30 rounded-xl p-3 text-center border border-white/5">
                <div className="text-zinc-500 text-xs mb-1 flex items-center justify-center gap-1"><Users className="w-3 h-3" /> Roster</div>
                <div className="font-bold text-white">{team.members.length}/5</div>
              </div>
            </div>
            <button onClick={() => setViewTeam(team)}
              className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors border border-white/5 cursor-pointer">
              Team ansehen
            </button>
          </motion.div>
        ))}
      </div>

      {/* Team-Detail Modal */}
      <AnimatePresence>
        {viewTeam && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setViewTeam(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#111] border border-white/10 rounded-3xl p-8 w-full max-w-md shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-2xl font-bold text-white">
                    {viewTeam.name[0]}
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold text-white">{viewTeam.name}</h2>
                    <p className="text-zinc-400 text-sm">{viewTeam.game}</p>
                  </div>
                </div>
                <button onClick={() => setViewTeam(null)} className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-400 mb-6">
                <Building className="w-4 h-4" /><span>{viewTeam.school}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-white">{viewTeam.wins}</div>
                  <div className="text-xs text-zinc-500 mt-1">Siege</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-white">{viewTeam.tournaments}</div>
                  <div className="text-xs text-zinc-500 mt-1">Turniere</div>
                </div>
              </div>
              <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">Roster</h3>
              <div className="space-y-2">
                {viewTeam.members.map((m, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-white">{m[0]}</div>
                    <span className="text-white text-sm font-medium">{m}</span>
                    <span className="ml-auto text-xs text-zinc-500">{i === 0 ? 'Captain' : 'Player'}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AdBanner />
    </div>
  );
}
