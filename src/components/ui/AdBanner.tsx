import { Megaphone, Star } from 'lucide-react';

export function AdBanner() {
  return (
    <div className="w-full bg-zinc-950 border-y border-white/5">
      {/* Werbung */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        <div className="flex items-center gap-2 mb-4 text-zinc-600 text-xs font-bold uppercase tracking-widest">
          <Megaphone className="w-4 h-4" /> Werbung
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 rounded-2xl bg-zinc-900 border border-zinc-800 border-dashed flex items-center justify-center text-zinc-600 text-sm font-medium">
              Werbeanzeige {i} — Platzhalter
            </div>
          ))}
        </div>
      </div>

      {/* Sponsoren */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-8">
        <div className="flex items-center gap-2 mb-4 text-zinc-600 text-xs font-bold uppercase tracking-widest">
          <Star className="w-4 h-4" /> Sponsoren & Partner
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-16 rounded-xl bg-zinc-900 border border-zinc-800 border-dashed flex items-center justify-center text-zinc-600 text-xs font-medium">
              Sponsor {i}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
