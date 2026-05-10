import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, Trophy, Shield } from 'lucide-react';
import { useModals } from '../components/ui/ModalContext';

export function TournamentDetails() {
  const { id } = useParams();
  const { openModal, isLoggedIn, tournaments, user } = useModals();

  const tournament = tournaments.find(t => t.id === Number(id));
  const isRegistered = isLoggedIn && user.registeredTournamentIds.includes(Number(id));

  if (!tournament) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 text-center">
        <h1 className="text-4xl font-display font-bold mb-4">Turnier nicht gefunden</h1>
        <Link to="/turniere" className="text-violet-400 hover:text-white transition-colors">← Zurück zu Turnieren</Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12">
      <Link to="/turniere" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Zurück zu Turnieren
      </Link>

      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
        <div className="relative h-64 md:h-96">
          <img
            src={tournament.image}
            alt={tournament.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/50 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md mb-4 inline-block ${
              tournament.status === 'Registrierung offen' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
              tournament.status === 'Aktiv' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
              tournament.status === 'Abgeschlossen' ? 'bg-zinc-500/20 text-zinc-400 border border-zinc-500/30' :
              'bg-blue-500/20 text-blue-400 border border-blue-500/30'
            }`}>
              {tournament.status}
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-2">
              {tournament.title}
            </h1>
            <p className="text-xl text-zinc-300">{tournament.game}</p>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Über das Turnier</h2>
              <p className="text-zinc-400 leading-relaxed">{tournament.beschreibung}</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold mb-4">Regeln</h2>
              <ul className="list-disc list-inside text-zinc-400 space-y-2">
                {tournament.regeln.map((regel, i) => (
                  <li key={i}>{regel}</li>
                ))}
              </ul>
            </section>
          </div>

          <div className="space-y-6">
            <div className="bg-black/30 rounded-2xl p-6 border border-white/5">
              <h3 className="font-display font-bold text-lg mb-4">Turnierdetails</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 flex items-center gap-2"><Calendar className="w-4 h-4" /> Startdatum</span>
                  <span className="text-white font-medium">{tournament.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 flex items-center gap-2"><Users className="w-4 h-4" /> Teams</span>
                  <span className="text-white font-medium">{tournament.currentTeams}/{tournament.maxTeams}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 flex items-center gap-2"><Trophy className="w-4 h-4 text-violet-400" /> Preispool</span>
                  <span className="text-zinc-400 font-bold">{tournament.prizepool}</span>
                </div>
              </div>

              {tournament.status === 'Abgeschlossen' ? (
                <div className="w-full mt-6 py-3 rounded-xl bg-zinc-800 text-zinc-500 font-medium text-center">
                  Turnier abgeschlossen
                </div>
              ) : tournament.status === 'Aktiv' ? (
                <div className="w-full mt-6 py-3 rounded-xl bg-zinc-800/60 text-zinc-400 font-medium text-center border border-zinc-700">
                  Anmeldung geschlossen — Turnier läuft
                </div>
              ) : tournament.inviteOnly ? (
                <div className="w-full mt-6 py-3 rounded-xl bg-zinc-800/60 text-zinc-400 font-medium text-center border border-zinc-700 flex items-center justify-center gap-2">
                  <span>🔒</span> Nur auf Einladung
                </div>
              ) : isRegistered ? (
                <div className="w-full mt-6 py-3 rounded-xl bg-green-600/20 text-green-400 border border-green-500/30 font-medium text-center flex items-center justify-center gap-2">
                  ✓ Angemeldet
                </div>
              ) : (
                <button
                  onClick={() => isLoggedIn ? openModal('registerTournament', tournament.id) : openModal('login')}
                  className="w-full mt-6 py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-500 transition-colors cursor-pointer"
                >
                  Jetzt anmelden
                </button>
              )}
            </div>

            <div className="bg-black/30 rounded-2xl p-6 border border-white/5">
              <h3 className="font-display font-bold text-lg mb-4">Organisator</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-white">{tournament.organisator}</div>
                  <div className="text-sm text-zinc-400">{tournament.isCommunityEvent ? 'Verifiziertes Community Event' : 'Offizieller Veranstalter'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
