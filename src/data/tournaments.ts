export interface Tournament {
  id: number;
  title: string;
  game: string;
  prizepool: string;
  date: string;
  maxTeams: number;
  currentTeams: number;
  status: 'Registrierung offen' | 'Aktiv' | 'Bevorstehend' | 'Abgeschlossen';
  image: string;
  beschreibung: string;
  regeln: string[];
  organisator: string;
  isCommunityEvent?: boolean;
  inviteOnly?: boolean;
}

export const SEED_TOURNAMENTS: Tournament[] = [
  {
    id: 1,
    title: 'ESL School League Niedersachsen Spring 2026',
    game: 'Valorant',
    prizepool: 'Ausstehend',
    date: '20. Mai 2026',
    maxTeams: 32,
    currentTeams: 18,
    status: 'Registrierung offen',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
    beschreibung: 'Die Frühjahressaison der ESL School League Niedersachsen. Schülerteams aus ganz Niedersachsen treten im taktischen Shooter Valorant gegeneinander an.',
    regeln: [
      'Format: 5v5, Best of 3 (Bo3) ab Viertelfinale, davor Bo1',
      'Alle Spieler müssen aktive Schüler einer niedersächsischen Schule sein',
      'Anti-Cheat-Software ist obligatorisch und wird vor Spielbeginn überprüft',
      'Pünktlichkeit: Teams haben 10 Minuten Zeit der Lobby beizutreten',
      'Fairplay: Beleidigungen und Toxizität führen zur sofortigen Disqualifikation',
      'Bei schwerem Fehlverhalten wird die jeweilige Schule schriftlich informiert',
      'Jeder Spieler darf nur für eine Schule pro Saison antreten',
    ],
    organisator: 'ESports School League',
  },
  {
    id: 2,
    title: 'ESL School League Hamburg Open Spring 2026',
    game: 'League of Legends',
    prizepool: 'Ausstehend',
    date: '12. Mai 2026',
    maxTeams: 16,
    currentTeams: 16,
    status: 'Aktiv',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=800',
    beschreibung: 'Das aktive Frühjahrsturnier der ESL School League Hamburg im League of Legends. Die besten Schulteams der Stadt kämpfen um den Titel.',
    regeln: [
      'Format: 5v5, Bo1 Gruppenphase, Bo3 Playoffs',
      'Alle Spieler müssen aktive Schüler einer Hamburger Schule sein',
      'Kein Einsatz von Smurf-Accounts oder geboostetem Rang',
      'Spieler müssen mindestens 14 Jahre alt sein',
      'Fairplay-Gebot: Hasskommunikation führt zur sofortigen Disqualifikation',
      'Bei schwerem Fehlverhalten behält sich die ESL vor, die Schule zu benachrichtigen',
    ],
    organisator: 'ESports School League',
  },
  {
    id: 3,
    title: 'Weekend Clash #67',
    game: 'CS:GO 2',
    prizepool: 'Ausstehend',
    date: '17. Mai 2026',
    maxTeams: 64,
    currentTeams: 41,
    status: 'Registrierung offen',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
    beschreibung: 'Das wöchentliche Community-Turnier für CS:GO 2. Offen für alle Schülerteams, ideal für Einsteiger.',
    regeln: [
      'Format: 5v5, Best of 1 (Bo1)',
      'Offen für alle Schülerinnen und Schüler',
      'VAC-Ban führt zum sofortigen Ausschluss und wird gemeldet',
      'Respektvoller Umgang ist Pflicht',
      'Pünktlichkeit: Teams haben 10 Minuten Zeit der Lobby beizutreten',
      'Schwere Verstöße gegen das Fairplay-Gebot werden der Schulleitung gemeldet',
    ],
    organisator: 'ESports School League',
  },
  {
    id: 4,
    title: 'Rocket League School Cup Summer 2026',
    game: 'Rocket League',
    prizepool: 'Ausstehend',
    date: '14. Jun 2026',
    maxTeams: 32,
    currentTeams: 8,
    status: 'Bevorstehend',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800',
    beschreibung: 'Der offizielle Rocket League Cup der ESL School League. Teams aus ganz Deutschland treten als 3er-Mannschaft an.',
    regeln: [
      'Format: 3v3, Best of 3 (Bo3)',
      'Alle Spieler müssen aktive Schüler sein',
      'Jede Schule darf maximal 2 Teams anmelden',
      'Fairplay-Gebot gilt für Chat, Voice und Gameplay',
      'Bei Fehlverhalten wird die Schule des betreffenden Spielers benachrichtigt',
    ],
    organisator: 'ESports School League',
  },
  {
    id: 5,
    title: 'Dota 2 School Invitational Summer 2026',
    game: 'Dota 2',
    prizepool: 'Ausstehend',
    date: '28. Jun 2026',
    maxTeams: 16,
    currentTeams: 4,
    status: 'Bevorstehend',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
    beschreibung: 'Einladungsturnier für die besten Schul-Dota-2-Teams Deutschlands. Nur top-platzierte Teams aus der Vorsaison erhalten eine Einladung.',
    regeln: [
      'Format: 5v5, Best of 3 (Bo3)',
      'Nur eingeladene Teams; Einladungen basieren auf der Vorsaison-Platzierung',
      'Alle Spieler müssen aktive Schüler sein',
      'Null-Toleranz-Politik gegenüber Toxizität und Cheating',
      'Verstöße werden schriftlich an die jeweilige Schule kommuniziert',
    ],
    organisator: 'ESports School League',
    inviteOnly: true,
  },
  {
    id: 6,
    title: 'ESL School League Winter Cup 2025',
    game: 'Valorant',
    prizepool: 'Ausstehend',
    date: '15. Dez 2025',
    maxTeams: 32,
    currentTeams: 32,
    status: 'Abgeschlossen',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
    beschreibung: 'Das Winterturnier 2025 ist abgeschlossen. Herzlichen Glückwunsch an alle Teilnehmer und die Siegerteams.',
    regeln: ['Format: 5v5, Best of 3', 'Offen für alle Schüler.'],
    organisator: 'ESports School League',
  },
  {
    id: 7,
    title: 'CS:GO 2 Community Cup #3',
    game: 'CS:GO 2',
    prizepool: 'Ausstehend',
    date: '03. Apr 2026',
    maxTeams: 32,
    currentTeams: 32,
    status: 'Abgeschlossen',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
    beschreibung: 'Der dritte Community Cup im CS:GO 2 ist abgeschlossen.',
    regeln: ['Format: 5v5, Bo1', 'Community Event'],
    organisator: 'Demo Spieler',
    isCommunityEvent: true,
  },
];
