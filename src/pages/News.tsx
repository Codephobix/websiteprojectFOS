import { AdBanner } from '../components/ui/AdBanner';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, X, ArrowLeft } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: 'ESL School League Niedersachsen Spring 2026 startet',
    category: 'Turniere',
    date: '02. Mai 2026',
    readTime: '4 Min',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
    featured: true,
    content: `Die Anmeldephase für die ESL School League Niedersachsen Spring 2026 hat begonnen. 18 Teams aus ganz Niedersachsen haben sich bereits registriert.

Das Turnier findet im Spiel Valorant statt und richtet sich exklusiv an Schülerinnen und Schüler niedersächsischer Schulen. Die Gruppenphase beginnt am 20. Mai 2026, das Finale ist für Mitte Juni geplant.

Interessierte Teams können sich bis zum 18. Mai 2026 über die Turnierseite anmelden. Jede Schule darf maximal zwei Teams anmelden. Alle teilnehmenden Spieler müssen zum Zeitpunkt des Turniers aktive Schüler sein.

Die ESL School League freut sich auf eine faire und spannende Saison!`,
  },
  {
    id: 2,
    title: 'Weekend Clash #67 — Jetzt anmelden',
    category: 'Turniere',
    date: '08. Mai 2026',
    readTime: '2 Min',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
    content: `Der nächste Weekend Clash im CS:GO 2 findet am 17. Mai 2026 statt. Noch sind Plätze frei — meldet euch jetzt an!

Das Turnier ist offen für alle Schülerinnen und Schüler und bietet eine gute Gelegenheit, erste Turniererfahrungen zu sammeln. Das Format ist Best of 1, die Spiele laufen über den gesamten Samstag.

Anmeldungen sind über die Turnierseite möglich.`,
  },
  {
    id: 3,
    title: 'Fairplay-Initiative: Unsere neuen Community-Regeln',
    category: 'Community',
    date: '25. Apr 2026',
    readTime: '5 Min',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=800',
    content: `Die ESL School League hat ihre Fairplay-Richtlinien überarbeitet. Ziel ist es, eine respektvolle und faire Spielumgebung für alle Teilnehmer zu schaffen.

Zu den wichtigsten Neuerungen gehören: Verstöße gegen das Fairplay-Gebot werden künftig nicht nur mit Turnier-Sperren geahndet — bei schwerwiegendem Fehlverhalten wird auch die Schulleitung der betreffenden Schule schriftlich informiert.

Cheating, Hacking oder das absichtliche Ausnutzen von Bugs führt weiterhin zur sofortigen Disqualifikation und einem dauerhaften Ausschluss von der Plattform.

Die vollständigen Regeln sind auf der Regelseite einsehbar.`,
  },
  {
    id: 4,
    title: 'ESL School League expandiert nach Hamburg',
    category: 'News',
    date: '10. Apr 2026',
    readTime: '3 Min',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800',
    content: `Nach dem erfolgreichen Start in Niedersachsen weitet die ESL School League ihr Angebot auf Hamburg aus. Das Hamburg Open Spring 2026 im League of Legends ist das erste offizielle Turnier in der Hansestadt.

16 Teams haben sich bereits angemeldet — alle Plätze sind vergeben. Interessierte Schulen aus Hamburg können sich für die nächste Saison vormerken lassen.

Mittelfristig plant die ESL School League, ihr Angebot auf weitere Bundesländer auszuweiten.`,
  },
];

export function News() {
  const [selected, setSelected] = useState<typeof articles[0] | null>(null);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="mb-12">
        <h1 className="text-5xl md:text-6xl font-display font-black mb-6">NACHRICHTEN</h1>
        <p className="text-xl text-zinc-400 max-w-2xl">Bleibe auf dem Laufenden mit den neuesten Updates.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured */}
        <div className="lg:col-span-2">
          {articles.filter(a => a.featured).map(item => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelected(item)}
              className="group relative rounded-3xl overflow-hidden cursor-pointer h-full min-h-[400px]">
              <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="px-3 py-1 rounded-full bg-violet-600 text-white text-xs font-bold uppercase tracking-wider w-fit mb-4">{item.category}</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 group-hover:text-violet-300 transition-colors">{item.title}</h2>
                <div className="flex items-center gap-4 text-zinc-300 text-sm">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {item.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {item.readTime} Lesezeit</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Side articles */}
        <div className="flex flex-col gap-6">
          {articles.filter(a => !a.featured).map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              onClick={() => setSelected(item)}
              className="group flex gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors cursor-pointer">
              <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-xs font-bold uppercase tracking-wider text-violet-400 mb-1">{item.category}</span>
                <h3 className="text-sm font-display font-bold text-white mb-2 group-hover:text-violet-300 transition-colors line-clamp-2">{item.title}</h3>
                <span className="text-xs text-zinc-500 flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Artikel-Overlay */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 bg-black/80 backdrop-blur-sm overflow-y-auto"
            onClick={() => setSelected(null)}>
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#0a0a0a] border border-white/10 rounded-3xl w-full max-w-2xl shadow-2xl mb-8">
              <div className="relative h-64 rounded-t-3xl overflow-hidden">
                <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-transparent" />
                <button onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-8">
                <span className="px-3 py-1 rounded-full bg-violet-600 text-white text-xs font-bold uppercase tracking-wider mb-4 inline-block">{selected.category}</span>
                <h2 className="text-3xl font-display font-bold text-white mb-3">{selected.title}</h2>
                <div className="flex items-center gap-4 text-zinc-400 text-sm mb-8">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {selected.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {selected.readTime} Lesezeit</span>
                </div>
                <div className="text-zinc-300 leading-relaxed space-y-4">
                  {selected.content.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                <button onClick={() => setSelected(null)}
                  className="mt-8 flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors cursor-pointer">
                  <ArrowLeft className="w-4 h-4" /> Zurück zur Übersicht
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AdBanner />
    </div>
  );
}
