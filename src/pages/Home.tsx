import { motion } from 'motion/react';
import { ArrowRight, Trophy, Users, Calendar, ChevronRight, Tv, Megaphone, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useModals } from '../components/ui/ModalContext';

const trendingGames = [
  { id: 1, name: 'Valorant', players: '2.4M', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800' },
  { id: 2, name: 'League of Legends', players: '3.1M', image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=800' },
  { id: 3, name: 'CS:GO 2', players: '1.8M', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800' },
  { id: 4, name: 'Rocket League', players: '900K', image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800' },
];

export function Home() {
  const { openModal, isLoggedIn, tournaments } = useModals();
  const navigate = useNavigate();

  const upcomingTournaments = tournaments
    .filter(t => t.status !== 'Abgeschlossen')
    .slice(0, 3);

  return (
    <div className="w-full">
      {/* Hero + Seitliche Werbeplatzhalter */}
      <div className="relative flex items-stretch w-full">
        {/* Linke Werbung — im Vordergrund über dem Hero-Bild */}
        <div className="hidden xl:flex flex-col gap-4 w-80 flex-shrink-0 absolute left-0 top-0 h-full z-30 py-12 px-3 justify-center pointer-events-none">
          {[1,2,3].map(i => (
            <div key={i} className="flex-1 min-h-[160px] rounded-2xl bg-zinc-900/90 border border-zinc-700 border-dashed flex items-center justify-center text-zinc-500 text-xs font-medium backdrop-blur-sm pointer-events-auto">
              Werbung {i}
            </div>
          ))}
        </div>

        {/* Hero Section */}
        <section className="relative flex-1 min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505] z-10" />
          <img
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2000"
            alt="Esports Arena"
            className="w-full h-full object-cover opacity-40"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/20 rounded-full blur-[120px] mix-blend-screen"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-zinc-300">Live: ESL School League Niedersachsen Season 5</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter mb-6 leading-[0.9]">
              Aus Talent <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-500 to-orange-500 pr-2">
                wird ein Team!
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Die offizielle ESports-Plattform für Schülerinnen und Schüler. Nimm an Turnieren teil,
              baue dein Team auf und kämpfe für deine Schule.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/turniere" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2">
                Turnier finden <ArrowRight className="w-5 h-5" />
              </Link>
              <button
                onClick={() => isLoggedIn ? openModal('createTournament') : openModal('login')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 text-white font-bold text-lg hover:bg-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2 border border-white/10 cursor-pointer"
              >
                Turnier erstellen
              </button>
            </div>
          </motion.div>
        </div>
        </section>

        {/* Rechte Werbung — im Vordergrund über dem Hero-Bild */}
        <div className="hidden xl:flex flex-col gap-4 w-80 flex-shrink-0 absolute right-0 top-0 h-full z-30 py-12 px-3 justify-center pointer-events-none">
          {[4,5,6].map(i => (
            <div key={i} className="flex-1 min-h-[160px] rounded-2xl bg-zinc-900/90 border border-zinc-700 border-dashed flex items-center justify-center text-zinc-500 text-xs font-medium backdrop-blur-sm pointer-events-auto">
              Werbung {i}
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { label: 'Aktive Spieler', value: '[Spieler]' },
              { label: 'Gespielte Turniere', value: '[Turniere]' },
              { label: 'Teilnehmende Schulen', value: '[Schulen]' },
              { label: 'Registrierte Teams', value: '[Teams]' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="text-4xl md:text-5xl font-display font-black text-white mb-2">{stat.value}</div>
                <div className="text-zinc-500 font-medium uppercase tracking-wider text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WERBUNG PLATZHALTER ── */}
      <section className="py-12 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-2 mb-6 text-zinc-600 text-xs font-bold uppercase tracking-widest">
            <Megaphone className="w-4 h-4" /> Werbung
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-28 rounded-2xl bg-zinc-900 border border-zinc-800 border-dashed flex items-center justify-center text-zinc-600 text-sm font-medium">
                Werbeanzeige {i} — Platzhalter
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Games */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Beliebte Spiele</h2>
              <p className="text-zinc-400 text-lg">Entdecke Turniere in deinen Lieblingsspielen.</p>
            </div>
            <Link to="/spiele" className="hidden md:flex items-center gap-2 text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Alle Spiele <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingGames.map((game, i) => (
              <Link key={game.id} to="/spiele">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer h-full"
                >
                  <img src={game.image} alt={game.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-2xl font-display font-bold text-white mb-1">{game.name}</h3>
                    <p className="text-zinc-400 text-sm flex items-center gap-2"><Users className="w-4 h-4" /> {game.players} Spieler</p>
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-5 h-5 text-white" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPONSOREN PLATZHALTER ── */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-2 mb-8 text-zinc-600 text-xs font-bold uppercase tracking-widest">
            <Star className="w-4 h-4" /> Sponsoren & Partner
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-20 rounded-xl bg-zinc-900 border border-zinc-800 border-dashed flex items-center justify-center text-zinc-600 text-xs font-medium">
                Sponsor {i}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE STREAMS / VIDEO PLATZHALTER ── */}
      <section className="py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3 text-zinc-500 text-xs font-bold uppercase tracking-widest">
                <Tv className="w-4 h-4" /> Live & Videos
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Übertragungen</h2>
              <p className="text-zinc-400 text-lg">Verfolge laufende Spiele und vergangene Highlights.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Haupt-Stream Platzhalter */}
            <div className="md:col-span-2 aspect-video rounded-3xl bg-zinc-900 border border-zinc-800 border-dashed flex flex-col items-center justify-center gap-3 text-zinc-600">
              <Tv className="w-10 h-10 opacity-40" />
              <span className="text-sm font-medium">Live-Stream Platzhalter</span>
              <span className="text-xs opacity-60">z.B. Twitch-Embed oder YouTube-Live</span>
            </div>
            {/* Weitere Videos */}
            <div className="flex flex-col gap-4">
              {[1, 2].map(i => (
                <div key={i} className="aspect-video rounded-2xl bg-zinc-900 border border-zinc-800 border-dashed flex flex-col items-center justify-center gap-2 text-zinc-600">
                  <Tv className="w-6 h-6 opacity-40" />
                  <span className="text-xs font-medium">Video Platzhalter {i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Tournaments */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Bevorstehende Turniere</h2>
              <p className="text-zinc-400 text-lg">Melde dich jetzt an und sichere dir deinen Platz.</p>
            </div>
            <Link to="/turniere" className="hidden md:flex items-center gap-2 text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Alle Turniere <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {upcomingTournaments.map((tournament, i) => (
              <Link key={tournament.id} to={`/turniere/${tournament.id}`}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="group flex flex-col md:flex-row items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-6 w-full md:w-auto mb-6 md:mb-0">
                    <div className="w-16 h-16 rounded-xl bg-zinc-900 flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-8 h-8 text-violet-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-violet-400 bg-violet-400/10 px-2 py-1 rounded-md">{tournament.game}</span>
                        <span className="text-xs font-medium text-zinc-500 flex items-center gap-1"><Calendar className="w-3 h-3" /> {tournament.date}</span>
                      </div>
                      <h3 className="text-xl font-display font-bold text-white group-hover:text-violet-300 transition-colors">{tournament.title}</h3>
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-auto">
                    <div className="text-left md:text-right">
                      <div className="text-sm text-zinc-500 mb-1">Teams</div>
                      <div className="font-medium text-white">{tournament.currentTeams}/{tournament.maxTeams}</div>
                    </div>
                    <div className="text-left md:text-right">
                      <div className="text-sm text-zinc-500 mb-1">Preispool</div>
                      <div className="font-medium text-zinc-400">{tournament.prizepool}</div>
                    </div>
                    <div className="hidden md:flex w-10 h-10 rounded-full bg-white text-black items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 to-fuchsia-900/20" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-violet-600/30 rounded-full blur-[100px] mix-blend-screen"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-display font-black mb-6">
            BEREIT FÜR DIE <br />NÄCHSTE HERAUSFORDERUNG?
          </h2>
          <p className="text-xl text-zinc-400 mb-10">
            Erstelle dein Team, nimm an Turnieren teil und vertritte deine Schule. Die Anmeldung ist kostenlos.
          </p>
          {isLoggedIn ? (
            <button onClick={() => navigate('/dashboard')} className="px-10 py-5 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)] cursor-pointer">
              Zum Dashboard
            </button>
          ) : (
            <button onClick={() => openModal('register')} className="px-10 py-5 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)] cursor-pointer">
              Jetzt kostenlos registrieren
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
