import { motion } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Shield, HelpCircle, FileText, Users, Newspaper, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export function StaticPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const getTitle = (path: string) => {
    switch (path) {
      case '/ranglisten': return 'Ranglisten';
      case '/hilfe': return 'Hilfe-Center';
      case '/regeln': return 'Turnierregeln';
      case '/ueber-uns': return 'Über uns';
      case '/presse': return 'Presse';
      case '/kontakt': return 'Kontakt';
      case '/datenschutz': return 'Datenschutz';
      case '/agb': return 'AGB';
      case '/impressum': return 'Impressum';
      default: return 'Seite';
    }
  };

  const title = getTitle(location.pathname);

  const renderContent = () => {
    switch (location.pathname) {

      // ── Ranglisten ──────────────────────────────────────────────────────────
      case '/ranglisten':
        return <Ranglisten />;

      // ── Hilfe ───────────────────────────────────────────────────────────────
      case '/hilfe':
        return <Hilfe navigate={navigate} />;

      // ── Regeln ──────────────────────────────────────────────────────────────
      case '/regeln':
        return (
          <div className="space-y-8 text-zinc-300">
            <p className="text-lg">Diese Regeln gelten für alle offiziellen ESports School League Turniere.</p>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2"><Shield className="w-6 h-6 text-violet-400" /> 1. Fairplay</h3>
                <p className="mb-3">Alle Teilnehmer verpflichten sich zu fairem, respektvollem Verhalten gegenüber Mitspielern, Gegnern und Admins.</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-400">
                  <li>Cheating, Hacking oder das Ausnutzen von Bugs führt zur sofortigen Disqualifikation und einem permanenten Bann.</li>
                  <li>Kein Einsatz von Drittanbieter-Software, die einen unfairen Vorteil verschafft.</li>
                  <li>Beleidigungen, Diskriminierung oder Toxizität im Chat werden nicht toleriert.</li>
                  <li>Respektvoller Umgang ist Pflicht — im Spiel wie auch außerhalb.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2"><Users className="w-6 h-6 text-blue-400" /> 2. Team-Anforderungen</h3>
                <p className="mb-3">Jedes Team muss die vorgeschriebene Mindestanzahl aktiver Schulschüler aufweisen.</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-400">
                  <li>Alle Spieler müssen zum Zeitpunkt des Turniers aktive Schülerinnen oder Schüler der angemeldeten Schule sein.</li>
                  <li>Jeder Spieler darf pro Saison nur für eine Schule antreten.</li>
                  <li>Roster-Änderungen sind nach dem Check-in nicht mehr möglich.</li>
                  <li>Pünktlichkeit: Teams haben 10 Minuten Zeit, der Lobby beizutreten — danach gilt das Spiel als verloren.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2"><FileText className="w-6 h-6 text-orange-400" /> 3. Strafen & Konsequenzen</h3>
                <p className="mb-3">Verstöße gegen diese Regeln werden je nach Schwere geahndet.</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-400">
                  <li>Leichte Verstöße (z.B. verspätetes Erscheinen): Verwarnung oder Rundenverlust.</li>
                  <li>Schwere Verstöße (z.B. Cheating, Beleidigungen): sofortige Disqualifikation und Turniersperre.</li>
                  <li>Bei schwerem oder wiederholtem Fehlverhalten behält sich die ESL School League vor, die Schulleitung der betreffenden Schule schriftlich zu informieren.</li>
                  <li>Alle Entscheidungen der Admins sind final und bindend.</li>
                </ul>
              </div>
            </div>
          </div>
        );

      // ── Über uns ────────────────────────────────────────────────────────────
      case '/ueber-uns':
        return (
          <div className="space-y-8">
            <div className="aspect-video rounded-2xl overflow-hidden mb-8 relative">
              <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200" alt="Esports" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                <h2 className="text-3xl font-display font-bold text-white">E-Sport an Schulen — professionell und fair.</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-300">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Unsere Mission</h3>
                <p className="mb-4">Die ESL School League bietet Schülerinnen und Schülern eine professionelle Plattform für kompetitives Gaming. Wir glauben, dass E-Sport Teamwork, Konzentration und strategisches Denken fördert.</p>
                <p>Unsere Turniere richten sich ausschließlich an Schülerinnen und Schüler und bieten eine faire, strukturierte Umgebung für alle Skill-Level.</p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400 font-bold text-lg">50+</div>
                  <div>
                    <div className="text-white font-bold">Gespielte Turniere seit der Gründung</div>
                    <div className="text-sm text-zinc-400">Und stetig wachsend</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 font-bold text-lg">1.4K</div>
                  <div>
                    <div className="text-white font-bold">Aktive Spieler in Deutschland</div>
                    <div className="text-sm text-zinc-400">Aktuell auf unserer Plattform</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      // ── Presse ──────────────────────────────────────────────────────────────
      case '/presse':
        return (
          <div className="space-y-8">
            <div className="flex items-start gap-4 mb-8">
              <Newspaper className="w-10 h-10 text-violet-400 flex-shrink-0 mt-1" />
              <p className="text-xl text-zinc-300">Für Presseanfragen sende uns bitte eine Nachricht über unser Kontaktformular.</p>
            </div>
            <button onClick={() => navigate('/kontakt')}
              className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl transition-colors cursor-pointer">
              Zur Kontaktseite
            </button>
            <div className="border-t border-white/10 pt-8">
              <h3 className="text-2xl font-bold text-white mb-6">Letzte Meldungen</h3>
              <button onClick={() => navigate('/nachrichten')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors cursor-pointer flex items-center gap-2">
                <Newspaper className="w-5 h-5" /> Zu den Nachrichten
              </button>
            </div>
          </div>
        );

      // ── Kontakt ─────────────────────────────────────────────────────────────
      case '/kontakt':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-6">Schreib uns</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-violet-500 transition-colors" placeholder="Dein Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">E-Mail</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-violet-500 transition-colors" placeholder="deine@email.de" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Nachricht</label>
                  <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-violet-500 transition-colors resize-none" placeholder="Wie können wir helfen?"></textarea>
                </div>
                <button type="button" className="w-full py-3 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-500 transition-colors cursor-pointer">
                  Nachricht senden
                </button>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">Kontaktinformationen</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-zinc-300">
                    <Mail className="w-5 h-5 text-violet-400 flex-shrink-0" />
                    <span>support@mail.de</span>
                  </div>
                  <div className="flex items-center gap-4 text-zinc-300">
                    <Phone className="w-5 h-5 text-violet-400 flex-shrink-0" />
                    <span>+49 xxx xxxxxxx</span>
                  </div>
                  <div className="flex items-center gap-4 text-zinc-300">
                    <MapPin className="w-5 h-5 text-violet-400 flex-shrink-0" />
                    <span>Deutschland</span>
                  </div>
                </div>
              </div>
              <div className="bg-violet-600/10 border border-violet-500/20 rounded-2xl p-8">
                <h3 className="text-lg font-bold text-white mb-2">Antwortzeit</h3>
                <p className="text-zinc-400">Wir versuchen, immer so schnell wie möglich zu antworten. Eine garantierte Wartezeit können wir nicht nennen, aber wir bemühen uns um eine schnelle Rückmeldung.</p>
              </div>
            </div>
          </div>
        );

      // ── Default ─────────────────────────────────────────────────────────────
      default:
        return (
          <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
            <p>Willkommen auf der Seite <strong className="text-white">{title}</strong>.</p>
            <p>Diese Seite wird in Kürze mit Inhalten gefüllt. Bitte schauen Sie später wieder vorbei.</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 md:px-12 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-display font-black mb-10 text-white">{title}</h1>
        {renderContent()}
      </motion.div>
    </div>
  );
}

// ── Ranglisten Komponente ────────────────────────────────────────────────────
function Ranglisten() {
  const [activeGame, setActiveGame] = useState('Valorant');
  const [activeScope, setActiveScope] = useState('Regional');

  const games = ['Valorant', 'CS:GO 2', 'League of Legends', 'Rocket League', 'Dota 2'];
  const scopes = ['Regional', 'National', 'Bundesweit'];

  const data: Record<string, Record<string, { rank: number; team: string; school: string; wins: number; losses: number; points: number }[]>> = {
    Valorant: {
      Regional: [
        { rank: 1, team: 'ESL Nordhorn Squad', school: 'Musterschule A', wins: 7, losses: 1, points: 210 },
        { rank: 2, team: 'Pixel Wolves', school: 'Akademie D', wins: 5, losses: 3, points: 165 },
        { rank: 3, team: 'Storm Riders', school: 'Schule E', wins: 4, losses: 4, points: 130 },
        { rank: 4, team: 'Code Breakers', school: 'Musterschule A', wins: 3, losses: 5, points: 95 },
        { rank: 5, team: 'Blue Hawks', school: 'Schule O Lingen', wins: 2, losses: 6, points: 60 },
      ],
      National: [
        { rank: 1, team: 'Cyber Lions', school: 'Akademie G München', wins: 12, losses: 1, points: 380 },
        { rank: 2, team: 'ESL Nordhorn Squad', school: 'Musterschule A', wins: 10, losses: 3, points: 310 },
        { rank: 3, team: 'Digital Storm', school: 'Schule H Essen', wins: 9, losses: 4, points: 275 },
        { rank: 4, team: 'Iron Wolves', school: 'Schule I Hamburg', wins: 8, losses: 5, points: 240 },
        { rank: 5, team: 'Pixel Wolves', school: 'Akademie D', wins: 7, losses: 6, points: 205 },
      ],
      Bundesweit: [
        { rank: 1, team: 'Cyber Lions', school: 'Akademie G München', wins: 18, losses: 2, points: 560 },
        { rank: 2, team: 'Phoenix Rising', school: 'Akademie J Berlin', wins: 16, losses: 4, points: 500 },
        { rank: 3, team: 'Digital Storm', school: 'Schule H Essen', wins: 15, losses: 5, points: 470 },
        { rank: 4, team: 'ESL Nordhorn Squad', school: 'Musterschule A', wins: 14, losses: 6, points: 435 },
        { rank: 5, team: 'Iron Wolves', school: 'Schule I Hamburg', wins: 12, losses: 8, points: 370 },
      ],
    },
    'CS:GO 2': {
      Regional: [
        { rank: 1, team: 'School Warriors', school: 'Schule B', wins: 8, losses: 0, points: 240 },
        { rank: 2, team: 'Code Breakers', school: 'Musterschule A', wins: 5, losses: 3, points: 155 },
        { rank: 3, team: 'Recon Team', school: 'Schule C', wins: 4, losses: 4, points: 120 },
        { rank: 4, team: 'Flash Point', school: 'Schule P Meppen', wins: 2, losses: 6, points: 65 },
        { rank: 5, team: 'Rush Force', school: 'Schule Q Nordhorn', wins: 1, losses: 7, points: 30 },
      ],
      National: [
        { rank: 1, team: 'School Warriors', school: 'Schule B', wins: 11, losses: 2, points: 335 },
        { rank: 2, team: 'Bomb Squad', school: 'Schule K Hamburg', wins: 10, losses: 3, points: 305 },
        { rank: 3, team: 'Code Breakers', school: 'Musterschule A', wins: 8, losses: 5, points: 245 },
        { rank: 4, team: 'Flash Point', school: 'Schule P Meppen', wins: 6, losses: 7, points: 180 },
        { rank: 5, team: 'Recon Team', school: 'Schule C', wins: 5, losses: 8, points: 150 },
      ],
      Bundesweit: [
        { rank: 1, team: 'Bomb Squad', school: 'Schule K Hamburg', wins: 17, losses: 2, points: 525 },
        { rank: 2, team: 'School Warriors', school: 'Schule B', wins: 15, losses: 4, points: 460 },
        { rank: 3, team: 'Clutch Kings', school: 'Schule L München', wins: 14, losses: 5, points: 430 },
        { rank: 4, team: 'Code Breakers', school: 'Musterschule A', wins: 12, losses: 7, points: 365 },
        { rank: 5, team: 'Flash Point', school: 'Schule P Meppen', wins: 10, losses: 9, points: 300 },
      ],
    },
    'League of Legends': {
      Regional: [
        { rank: 1, team: 'Digital Eagles', school: 'Schule C', wins: 9, losses: 1, points: 275 },
        { rank: 2, team: 'Mid Lane Masters', school: 'Musterschule A', wins: 6, losses: 4, points: 185 },
        { rank: 3, team: 'Baron Slayers', school: 'Schule B', wins: 5, losses: 5, points: 155 },
        { rank: 4, team: 'Dragon Force', school: 'Schule P Meppen', wins: 3, losses: 7, points: 90 },
        { rank: 5, team: 'Gank Squad', school: 'Bildungszentrum F', wins: 2, losses: 8, points: 60 },
      ],
      National: [
        { rank: 1, team: 'Digital Eagles', school: 'Schule C', wins: 13, losses: 2, points: 400 },
        { rank: 2, team: 'Nexus Destroyers', school: 'Akademie M Köln', wins: 11, losses: 4, points: 340 },
        { rank: 3, team: 'Mid Lane Masters', school: 'Musterschule A', wins: 9, losses: 6, points: 275 },
        { rank: 4, team: 'Baron Slayers', school: 'Schule B', wins: 8, losses: 7, points: 245 },
        { rank: 5, team: 'Rift Walkers', school: 'Schule N Bremen', wins: 6, losses: 9, points: 185 },
      ],
      Bundesweit: [
        { rank: 1, team: 'Nexus Destroyers', school: 'Akademie M Köln', wins: 19, losses: 1, points: 590 },
        { rank: 2, team: 'Digital Eagles', school: 'Schule C', wins: 16, losses: 4, points: 495 },
        { rank: 3, team: 'Rift Walkers', school: 'Schule N Bremen', wins: 14, losses: 6, points: 430 },
        { rank: 4, team: 'Mid Lane Masters', school: 'Musterschule A', wins: 12, losses: 8, points: 365 },
        { rank: 5, team: 'Baron Slayers', school: 'Schule B', wins: 10, losses: 10, points: 305 },
      ],
    },
    'Rocket League': {
      Regional: [
        { rank: 1, team: 'Storm Riders', school: 'Schule E', wins: 5, losses: 1, points: 155 },
        { rank: 2, team: 'Aerial Kings', school: 'Akademie D', wins: 4, losses: 2, points: 125 },
        { rank: 3, team: 'Boost Gang', school: 'Schule Q Nordhorn', wins: 2, losses: 4, points: 65 },
      ],
      National: [
        { rank: 1, team: 'Rocket Stars', school: 'Akademie R Frankfurt', wins: 9, losses: 1, points: 280 },
        { rank: 2, team: 'Storm Riders', school: 'Schule E', wins: 7, losses: 3, points: 215 },
        { rank: 3, team: 'Aerial Kings', school: 'Akademie D', wins: 6, losses: 4, points: 185 },
      ],
      Bundesweit: [
        { rank: 1, team: 'Rocket Stars', school: 'Akademie R Frankfurt', wins: 14, losses: 2, points: 435 },
        { rank: 2, team: 'Supersonic Squad', school: 'Akademie S Stuttgart', wins: 12, losses: 4, points: 370 },
        { rank: 3, team: 'Storm Riders', school: 'Schule E', wins: 10, losses: 6, points: 310 },
      ],
    },
    'Dota 2': {
      Regional: [
        { rank: 1, team: 'Ancient Guards', school: 'Schule C', wins: 4, losses: 0, points: 120 },
        { rank: 2, team: 'Roshan Raiders', school: 'Musterschule A', wins: 2, losses: 2, points: 65 },
      ],
      National: [
        { rank: 1, team: 'Ancient Guards', school: 'Schule C', wins: 7, losses: 1, points: 215 },
        { rank: 2, team: 'Aegis Holders', school: 'Gymnasium München', wins: 5, losses: 3, points: 155 },
        { rank: 3, team: 'Roshan Raiders', school: 'Musterschule A', wins: 4, losses: 4, points: 125 },
      ],
      Bundesweit: [
        { rank: 1, team: 'Aegis Holders', school: 'Gymnasium München', wins: 12, losses: 2, points: 370 },
        { rank: 2, team: 'Ancient Guards', school: 'Schule C', wins: 10, losses: 4, points: 310 },
        { rank: 3, team: 'Roshan Raiders', school: 'Musterschule A', wins: 8, losses: 6, points: 245 },
      ],
    },
  };

  const rows = data[activeGame]?.[activeScope] ?? [];

  return (
    <div className="space-y-8">
      <p className="text-zinc-400">Offizielle Platzierungen der ESL School League — Stand Mai 2026. Dummy-Daten.</p>

      {/* Game selector */}
      <div className="flex flex-wrap gap-2">
        {games.map(g => (
          <button key={g} onClick={() => setActiveGame(g)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${activeGame === g ? 'bg-violet-600 text-white' : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'}`}>
            {g}
          </button>
        ))}
      </div>

      {/* Scope selector */}
      <div className="flex gap-2">
        {scopes.map(s => (
          <button key={s} onClick={() => setActiveScope(s)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${activeScope === s ? 'bg-white text-black' : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 px-6 py-3 border-b border-white/10 text-xs font-bold uppercase tracking-wider text-zinc-500">
          <span className="col-span-1">#</span>
          <span className="col-span-4">Team</span>
          <span className="col-span-4 hidden md:block">Schule</span>
          <span className="col-span-2 text-center">S/N</span>
          <span className="col-span-1 text-right">Pts</span>
        </div>
        {rows.map((row, i) => (
          <div key={i} className={`grid grid-cols-12 px-6 py-4 border-b border-white/5 last:border-b-0 items-center ${i === 0 ? 'bg-violet-600/10' : 'hover:bg-white/5'} transition-colors`}>
            <span className={`col-span-1 font-bold ${i === 0 ? 'text-violet-400' : i === 1 ? 'text-zinc-300' : i === 2 ? 'text-amber-600' : 'text-zinc-500'}`}>
              {row.rank}.
            </span>
            <span className="col-span-4 font-bold text-white text-sm">{row.team}</span>
            <span className="col-span-4 hidden md:block text-zinc-400 text-sm truncate">{row.school}</span>
            <span className="col-span-2 text-center text-sm text-zinc-300">
              <span className="text-green-400">{row.wins}</span>
              <span className="text-zinc-600"> / </span>
              <span className="text-red-400">{row.losses}</span>
            </span>
            <span className="col-span-1 text-right font-bold text-violet-400 text-sm">{row.points}</span>
          </div>
        ))}
        {rows.length === 0 && (
          <div className="px-6 py-8 text-center text-zinc-500 text-sm">Noch keine Daten für diese Kombination.</div>
        )}
      </div>
    </div>
  );
}

// ── Hilfe Komponente ─────────────────────────────────────────────────────────
function Hilfe({ navigate }: { navigate: (path: string) => void }) {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    {
      category: 'Account & Profil',
      icon: <HelpCircle className="w-6 h-6 text-violet-400" />,
      items: [
        { q: 'Wie registriere ich mich?', a: 'Klicke oben rechts auf "Anmelden" und dann auf "Noch kein Konto? Jetzt registrieren". Im Demo-Modus führt jede Eingabe zum Demo-Account.' },
        { q: 'Kann ich meinen Anzeigenamen ändern?', a: 'Ja — gehe ins Dashboard → Einstellungen und trage dort deinen neuen Anzeigenamen ein.' },
        { q: 'Welche Schule gehöre ich an?', a: 'Deine Schule/Organisation siehst und änderst du im Dashboard unter "Organisation".' },
      ],
    },
    {
      category: 'Turniere',
      icon: <FileText className="w-6 h-6 text-green-400" />,
      items: [
        { q: 'Wie melde ich mich für ein Turnier an?', a: 'Öffne die Turnier-Detailseite und klicke auf "Jetzt anmelden". Du musst eingeloggt sein.' },
        { q: 'Wo sehe ich meine angemeldeten Turniere?', a: 'Im Dashboard unter "Meine Turniere" findest du eine Übersicht aller Turniere bei denen du angemeldet bist.' },
        { q: 'Kann ich ein Turnier selbst erstellen?', a: 'Ja — wenn du eingeloggt bist, erscheint im Dashboard der Button "Turnier erstellen". Selbst erstellte Turniere werden als Verifiziertes Community Event gekennzeichnet.' },
      ],
    },
    {
      category: 'Teams',
      icon: <Users className="w-6 h-6 text-blue-400" />,
      items: [
        { q: 'Wie gründe ich ein Team?', a: 'Dashboard → "Meine Teams" → "Team gründen". Du wirst automatisch als Captain eingetragen.' },
        { q: 'Wie trete ich einem Team bei?', a: 'Du kannst von anderen Spielern eingeladen werden. Eine direkte Beitrittsfunktion ist in Planung.' },
        { q: 'Kann ich mehreren Teams angehören?', a: 'Ja — du kannst Mitglied in mehreren Teams sein. Im Dashboard kannst du ein aktives Hauptteam festlegen.' },
      ],
    },
  ];

  let counter = 0;

  return (
    <div className="space-y-8">
      <p className="text-xl text-zinc-300">Häufig gestellte Fragen</p>
      <div className="space-y-6">
        {faqs.map(section => (
          <div key={section.category}>
            <div className="flex items-center gap-3 mb-4">
              {section.icon}
              <h3 className="text-xl font-bold text-white">{section.category}</h3>
            </div>
            <div className="space-y-2">
              {section.items.map(item => {
                const idx = counter++;
                return (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <button onClick={() => setOpen(open === idx ? null : idx)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left text-white font-medium hover:bg-white/5 transition-colors cursor-pointer">
                      <span>{item.q}</span>
                      {open === idx ? <ChevronUp className="w-4 h-4 text-zinc-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-zinc-400 flex-shrink-0" />}
                    </button>
                    {open === idx && (
                      <div className="px-5 pb-4 text-zinc-400 text-sm leading-relaxed border-t border-white/10 pt-3">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 p-6 bg-violet-600/20 border border-violet-500/30 rounded-2xl text-center">
        <h3 className="text-xl font-bold text-white mb-2">Nichts Passendes gefunden?</h3>
        <p className="text-zinc-300 mb-4">Kontaktiere uns direkt über unser Kontaktformular.</p>
        <button onClick={() => navigate('/kontakt')}
          className="px-6 py-3 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-500 transition-colors cursor-pointer">
          Support kontaktieren
        </button>
      </div>
    </div>
  );
}
