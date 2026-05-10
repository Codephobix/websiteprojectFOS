import { Link } from 'react-router-dom';
import { Trophy, Twitter, Instagram, Youtube, Twitch } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">
                <Trophy className="w-4 h-4 text-white" />
              </div>
              {/* Logo-Platzhalter: Ersetze durch <img src="/logo.png" alt="ESports School League" className="h-8 w-auto" /> sobald vorhanden */}
              <span className="font-display font-bold text-lg tracking-tight text-white">
                ESports<span className="text-violet-400"> School League</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Die offizielle Plattform für ESports-Turniere an Schulen. Verbinde dich mit Mitschülern, gründe Teams und nimm an Turnieren teil.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-white/10 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-white/10 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-white/10 hover:text-white transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-white/10 hover:text-white transition-colors">
                <Twitch className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-6">Plattform</h4>
            <ul className="space-y-4">
              <li><Link to="/turniere" className="text-zinc-400 hover:text-white text-sm transition-colors">Turniere finden</Link></li>
              <li><Link to="/spiele" className="text-zinc-400 hover:text-white text-sm transition-colors">Spiele durchsuchen</Link></li>
              <li><Link to="/teams" className="text-zinc-400 hover:text-white text-sm transition-colors">Teams & Spieler</Link></li>
              <li><Link to="/ranglisten" className="text-zinc-400 hover:text-white text-sm transition-colors">Ranglisten</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-6">Ressourcen</h4>
            <ul className="space-y-4">
              <li><Link to="/nachrichten" className="text-zinc-400 hover:text-white text-sm transition-colors">Nachrichten & Blog</Link></li>
              <li><Link to="/hilfe" className="text-zinc-400 hover:text-white text-sm transition-colors">Hilfe-Center</Link></li>
              <li><Link to="/regeln" className="text-zinc-400 hover:text-white text-sm transition-colors">Turnierregeln</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-6">Unternehmen</h4>
            <ul className="space-y-4">
              <li><Link to="/ueber-uns" className="text-zinc-400 hover:text-white text-sm transition-colors">Über uns</Link></li>
              <li><Link to="/presse" className="text-zinc-400 hover:text-white text-sm transition-colors">Presse</Link></li>
              <li><Link to="/kontakt" className="text-zinc-400 hover:text-white text-sm transition-colors">Kontakt</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} ESports School League. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/datenschutz" className="text-zinc-500 hover:text-white text-sm transition-colors">Datenschutz</Link>
            <Link to="/agb" className="text-zinc-500 hover:text-white text-sm transition-colors">AGB</Link>
            <Link to="/impressum" className="text-zinc-500 hover:text-white text-sm transition-colors">Impressum</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
