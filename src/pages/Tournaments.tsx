import { AdBanner } from '../components/ui/AdBanner';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Calendar, Users, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useModals } from '../components/ui/ModalContext';

const statusFilters = ['Alle', 'Registrierung offen', 'Aktiv', 'Bevorstehend', 'Abgeschlossen'];
const gameFilters = ['Alle Spiele', 'Valorant', 'League of Legends', 'CS:GO 2', 'Rocket League', 'Dota 2'];

export function Tournaments() {
  const [activeStatus, setActiveStatus] = useState('Alle');
  const [activeGame, setActiveGame] = useState('Alle Spiele');
  const [searchQuery, setSearchQuery] = useState('');
  const { tournaments } = useModals();

  const filtered = tournaments.filter(t => {
    const matchStatus = activeStatus === 'Alle' || t.status === activeStatus;
    const matchGame = activeGame === 'Alle Spiele' || t.game === activeGame;
    const matchSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.game.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchGame && matchSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="mb-12">
        <h1 className="text-5xl md:text-6xl font-display font-black mb-6">TURNIERE</h1>
        <p className="text-xl text-zinc-400 max-w-2xl">
          Finde das perfekte Turnier für dich und dein Team.
        </p>
      </div>

      {/* Search */}
      <div className="relative w-full md:w-96 mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
        <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
          placeholder="Turnier suchen..."
          className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500 transition-all" />
      </div>

      {/* Game Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4">
        <Filter className="w-4 h-4 text-zinc-500 flex-shrink-0" />
        {gameFilters.map(g => (
          <button key={g} onClick={() => setActiveGame(g)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              activeGame === g ? 'bg-violet-600 text-white' : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
            }`}>
            {g}
          </button>
        ))}
      </div>

      {/* Status Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-12">
        {statusFilters.map(f => (
          <button key={f} onClick={() => setActiveStatus(f)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              activeStatus === f ? 'bg-white text-black' : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
            }`}>
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24 text-zinc-500">
          <Trophy className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg">Keine Turniere gefunden.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tournament, i) => (
            <Link key={tournament.id} to={`/turniere/${tournament.id}`}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="group h-full bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-violet-500/50 transition-colors cursor-pointer flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img src={tournament.image} alt={tournament.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
                      tournament.status === 'Registrierung offen' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      tournament.status === 'Aktiv' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      tournament.status === 'Abgeschlossen' ? 'bg-zinc-500/20 text-zinc-400 border border-zinc-500/30' :
                      'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>{tournament.status}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-md bg-black/50 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-white border border-white/10">
                      {tournament.game}
                    </span>
                    {tournament.isCommunityEvent && (
                      <span className="px-2 py-1 rounded-md bg-violet-600/50 backdrop-blur-md text-xs font-bold text-violet-200 border border-violet-500/30">
                        Community
                      </span>
                    )}
                    {tournament.inviteOnly && (
                      <span className="px-2 py-1 rounded-md bg-zinc-800/80 backdrop-blur-md text-xs font-bold text-zinc-300 border border-zinc-600/50">
                        🔒 Invite Only
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-display font-bold text-white mb-4 group-hover:text-violet-400 transition-colors line-clamp-2">{tournament.title}</h3>
                  <div className="mt-auto space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-500 flex items-center gap-2"><Calendar className="w-4 h-4" /> Datum</span>
                      <span className="text-white font-medium">{tournament.date}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-500 flex items-center gap-2"><Users className="w-4 h-4" /> Teams</span>
                      <span className="text-white font-medium">{tournament.currentTeams}/{tournament.maxTeams}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm pt-3 border-t border-white/10">
                      <span className="text-zinc-500 flex items-center gap-2"><Trophy className="w-4 h-4 text-violet-400" /> Preispool</span>
                      <span className="text-zinc-400 font-medium">{tournament.prizepool}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
      <AdBanner />
    </div>
  );
}
