import { AdBanner } from '../components/ui/AdBanner';
import { motion } from 'motion/react';
import { Users, Trophy, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const games = [
  { id: 1, name: 'Valorant', genre: 'Tactical Shooter', players: '342', tournaments: 18, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800', color: 'from-red-500/20 to-orange-500/20' },
  { id: 2, name: 'League of Legends', genre: 'MOBA', players: '289', tournaments: 14, image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=800', color: 'from-blue-500/20 to-cyan-500/20' },
  { id: 3, name: 'CS:GO 2', genre: 'Tactical Shooter', players: '418', tournaments: 22, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800', color: 'from-yellow-500/20 to-amber-500/20' },
  { id: 4, name: 'Rocket League', genre: 'Sports', players: '156', tournaments: 9, image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800', color: 'from-blue-600/20 to-indigo-600/20' },
  { id: 5, name: 'Dota 2', genre: 'MOBA', players: '98', tournaments: 6, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800', color: 'from-red-600/20 to-rose-600/20' },
  { id: 6, name: 'Apex Legends', genre: 'Battle Royale', players: '74', tournaments: 3, image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=800', color: 'from-red-500/20 to-yellow-500/20' },
];

export function Games() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="mb-16">
        <h1 className="text-5xl md:text-6xl font-display font-black mb-6">SPIELE</h1>
        <p className="text-xl text-zinc-400 max-w-2xl">
          Wähle dein Spiel und entdecke Turniere, Teams und Statistiken.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game, i) => (
          <Link key={game.id} to={`/turniere?game=${encodeURIComponent(game.name)}`} className="block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-3xl overflow-hidden cursor-pointer bg-white/5 border border-white/10 hover:border-white/20 transition-all h-full flex flex-col"
            >
              <div className="aspect-video relative overflow-hidden">
                <img src={game.image} alt={game.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className={`absolute inset-0 bg-gradient-to-br ${game.color} mix-blend-overlay`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/50 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-white/70 mb-1 block">{game.genre}</span>
                  <h3 className="text-3xl font-display font-bold text-white">{game.name}</h3>
                </div>
              </div>
              <div className="p-6 bg-[#111] flex-grow flex flex-col justify-between">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Users className="w-5 h-5" />
                    <span className="font-medium text-white">{game.players}</span>
                    <span className="text-sm">registrierte Spieler</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Trophy className="w-5 h-5 text-violet-400" />
                    <span className="font-medium text-white">{game.tournaments}</span>
                    <span className="text-sm">Turniere</span>
                  </div>
                </div>
                <div className="w-full py-3 rounded-xl bg-white/5 group-hover:bg-white/10 text-white font-medium transition-colors flex items-center justify-center gap-2 border border-white/5">
                  Turniere ansehen <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
      <AdBanner />
    </div>
  );
}
