import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Settings, Trophy, Users, Bell, Plus, ChevronRight, LogOut, Shield, Star, Building } from 'lucide-react';
import { useEffect } from 'react';
import { useModals } from '../components/ui/ModalContext';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

type Tab = 'profil' | 'turniere' | 'team' | 'benachrichtigungen' | 'organisation' | 'einstellungen';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.35 } },
};

export function Dashboard() {
  const { openModal, isLoggedIn, logout, tournaments, teams, user, updateDisplayName, setActiveTeam, updateOrganisation, leaveTeam } = useModals();
  const [activeTab, setActiveTab] = useState<Tab>('profil');
  const [nameInput, setNameInput] = useState(user.displayName);
  const [profileMember, setProfileMember] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
      openModal('login');
    }
  }, [isLoggedIn]);

  // Alle Teams bei denen der User Mitglied ist
  if (!isLoggedIn) return null;
  const myTeams = teams.filter(t => user.teamIds.includes(t.id));
  const activeTeam = teams.find(t => t.id === user.activeTeamId) ?? myTeams[0] ?? null;
  const registeredTournaments = tournaments.filter(t => user.registeredTournamentIds.includes(t.id));

  const tabs = [
    { id: 'profil', label: 'Profil', icon: User },
    { id: 'turniere', label: 'Meine Turniere', icon: Trophy },
    { id: 'team', label: 'Meine Teams', icon: Users },
    { id: 'benachrichtigungen', label: 'Benachrichtigungen', icon: Bell },
    { id: 'organisation', label: 'Organisation', icon: Building },
    { id: 'einstellungen', label: 'Einstellungen', icon: Settings },
  ] as const;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="flex flex-col md:flex-row gap-8">

        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sticky top-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-violet-500/20">
                {user.displayName[0].toUpperCase()}
              </div>
              <div>
                <div className="font-bold text-white">{user.displayName}</div>
                <div className="text-sm text-zinc-400">@{user.username}</div>
              </div>
            </div>

            <nav className="space-y-1 relative mb-8">
              {tabs.map(tab => {
                const isActive = activeTab === tab.id;
                return (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors relative z-10 cursor-pointer',
                      isActive ? 'text-violet-400' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    )}>
                    <tab.icon className="w-5 h-5" /> {tab.label}
                    {isActive && (
                      <motion.div layoutId="dashboard-tab" className="absolute inset-0 bg-violet-600/20 rounded-xl -z-10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }} />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="pt-6 border-t border-white/10">
              <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors cursor-pointer">
                <LogOut className="w-5 h-5" /> Abmelden
              </button>
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="flex-grow min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.18 }}>

              {/* ── Profil ── */}
              {activeTab === 'profil' && (
                <motion.div variants={containerVariants} initial="hidden" animate="show">
                  <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-display font-bold">Übersicht</h1>
                    <button onClick={() => openModal('createTournament')}
                      className="px-4 py-2 rounded-full bg-violet-600 text-white font-medium hover:bg-violet-500 transition-colors flex items-center gap-2 text-sm cursor-pointer shadow-lg shadow-violet-600/20">
                      <Plus className="w-4 h-4" /> Turnier erstellen
                    </button>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group">
                      <div className="text-zinc-400 text-sm mb-2 flex items-center gap-2"><Trophy className="w-4 h-4 text-violet-400" /> Angemeldete Turniere</div>
                      <div className="text-4xl font-display font-bold text-white group-hover:scale-105 transition-transform origin-left">{registeredTournaments.length}</div>
                    </motion.div>
                    <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group">
                      <div className="text-zinc-400 text-sm mb-2 flex items-center gap-2"><Users className="w-4 h-4 text-blue-400" /> Meine Teams</div>
                      <div className="text-4xl font-display font-bold text-white group-hover:scale-105 transition-transform origin-left">{myTeams.length}</div>
                    </motion.div>
                    <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group cursor-pointer"
                      onClick={() => setActiveTab('team')}>
                      <div className="text-zinc-400 text-sm mb-2 flex items-center gap-2"><Shield className="w-4 h-4 text-green-400" /> Aktives Team</div>
                      <div className="text-xl font-display font-bold text-white mt-1 group-hover:text-green-400 transition-colors truncate">
                        {activeTeam ? activeTeam.name : 'Kein Team'}
                      </div>
                    </motion.div>
                  </div>

                  <motion.h2 variants={itemVariants} className="text-xl font-display font-bold mb-4">Aktive Teilnahmen</motion.h2>
                  <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                    {registeredTournaments.length === 0 ? (
                      <div className="p-8 text-center text-zinc-500">
                        <Trophy className="w-8 h-8 mx-auto mb-3 opacity-30" />
                        <p>Noch keine Turniere. <button onClick={() => navigate('/turniere')} className="text-violet-400 hover:text-violet-300 cursor-pointer">Jetzt anmelden →</button></p>
                      </div>
                    ) : (
                      <>
                        {registeredTournaments.slice(0, 3).map(t => (
                          <div key={t.id} onClick={() => navigate(`/turniere/${t.id}`)}
                            className="p-6 border-b border-white/10 last:border-b-0 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Trophy className="w-6 h-6 text-violet-400" />
                              </div>
                              <div>
                                <h3 className="font-bold text-white group-hover:text-violet-300 transition-colors">{t.title}</h3>
                                <div className="text-sm text-zinc-400">{t.game} • {t.date}</div>
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors group-hover:translate-x-1" />
                          </div>
                        ))}
                        {registeredTournaments.length > 3 && (
                          <div onClick={() => setActiveTab('turniere')} className="p-5 flex items-center justify-center text-zinc-500 text-sm hover:bg-white/10 hover:text-white transition-colors cursor-pointer">
                            Alle {registeredTournaments.length} Turniere ansehen
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                </motion.div>
              )}

              {/* ── Meine Turniere ── */}
              {activeTab === 'turniere' && (
                <motion.div variants={containerVariants} initial="hidden" animate="show">
                  <motion.h1 variants={itemVariants} className="text-3xl font-display font-bold mb-8">Meine Turniere</motion.h1>
                  {registeredTournaments.length === 0 ? (
                    <motion.div variants={itemVariants} className="text-center py-24 text-zinc-500">
                      <Trophy className="w-12 h-12 mx-auto mb-4 opacity-30" />
                      <p className="mb-4">Du bist noch bei keinem Turnier angemeldet.</p>
                      <button onClick={() => navigate('/turniere')} className="px-6 py-3 rounded-full bg-violet-600 text-white font-medium hover:bg-violet-500 transition-colors cursor-pointer">
                        Turniere entdecken
                      </button>
                    </motion.div>
                  ) : (
                    <div className="space-y-4">
                      {registeredTournaments.map(t => (
                        <motion.div key={t.id} variants={itemVariants} onClick={() => navigate(`/turniere/${t.id}`)}
                          className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer group">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Trophy className="w-6 h-6 text-violet-400" />
                            </div>
                            <div>
                              <h3 className="font-bold text-white group-hover:text-violet-300 transition-colors">{t.title}</h3>
                              <div className="text-sm text-zinc-400">{t.game} • {t.status}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-zinc-400">Datum</div>
                            <div className="font-bold text-white">{t.date}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* ── Meine Teams ── */}
              {activeTab === 'team' && (
                <motion.div variants={containerVariants} initial="hidden" animate="show">
                  <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-display font-bold">Meine Teams</h1>
                    <button onClick={() => openModal('createTeam')}
                      className="px-4 py-2 rounded-full bg-violet-600 text-white font-medium hover:bg-violet-500 transition-colors flex items-center gap-2 text-sm cursor-pointer shadow-lg shadow-violet-600/20">
                      <Plus className="w-4 h-4" /> Team gründen
                    </button>
                  </motion.div>

                  {myTeams.length === 0 ? (
                    <motion.div variants={itemVariants} className="text-center py-24 text-zinc-500">
                      <Shield className="w-12 h-12 mx-auto mb-4 opacity-30" />
                      <p className="mb-4">Du bist noch in keinem Team.</p>
                      <button onClick={() => openModal('createTeam')} className="px-6 py-3 rounded-full bg-violet-600 text-white font-medium hover:bg-violet-500 transition-colors cursor-pointer">
                        Team gründen
                      </button>
                    </motion.div>
                  ) : (
                    <div className="space-y-6">
                      {myTeams.map(team => {
                        const isActive = team.id === user.activeTeamId;
                        return (
                          <motion.div key={team.id} variants={itemVariants}
                            className={cn(
                              'bg-white/5 border rounded-3xl p-8 relative overflow-hidden transition-colors',
                              isActive ? 'border-violet-500/50' : 'border-white/10'
                            )}>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                            <div className="relative z-10 flex items-center gap-6 mb-6">
                              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-xl shadow-blue-500/20">
                                <Shield className="w-8 h-8 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 flex-wrap">
                                  <h2 className="text-2xl font-display font-bold text-white">{team.name}</h2>
                                  {isActive && (
                                    <span className="px-2 py-0.5 rounded-full bg-violet-600/30 text-violet-300 text-xs font-bold border border-violet-500/30 flex items-center gap-1">
                                      <Star className="w-3 h-3" /> Aktiv
                                    </span>
                                  )}
                                </div>
                                <div className="text-zinc-400 text-sm mt-1">{team.game}</div>
                              </div>
                              {!isActive && (
                                <button onClick={() => setActiveTeam(team.id)}
                                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors cursor-pointer">
                                  Als aktiv setzen
                                </button>
                              )}
                            </div>

                            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">
                              Roster ({team.members.length}/5)
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                              {team.members.map((member, i) => {
                                const isMe = member.displayName === user.displayName;
                                return (
                                  <div key={i} className={cn(
                                    'rounded-xl p-4 flex items-center gap-3 border transition-colors',
                                    isMe
                                      ? 'bg-violet-600/10 border-violet-500/30'
                                      : 'bg-black/40 border-white/5 hover:bg-white/10 cursor-pointer'
                                  )}
                                    onClick={() => !isMe && setProfileMember(member.displayName)}>
                                    <div className={cn(
                                      'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white',
                                      isMe ? 'bg-violet-600' : 'bg-zinc-800'
                                    )}>
                                      {member.displayName[0].toUpperCase()}
                                    </div>
                                    <div>
                                      <div className="font-bold text-white text-sm">
                                        {member.displayName} {isMe && <span className="text-violet-400 font-normal">(Du)</span>}
                                      </div>
                                      <div className="text-xs text-zinc-500">{member.role}</div>
                                    </div>
                                  </div>
                                );
                              })}
                              {team.members.length < 5 && (
                                <div onClick={() => openModal('invitePlayer')}
                                  className="bg-white/5 border border-white/10 border-dashed rounded-xl p-4 flex items-center justify-center gap-2 text-zinc-500 hover:text-white hover:border-white/30 transition-colors cursor-pointer">
                                  <Plus className="w-4 h-4" /> Spieler einladen
                                </div>
                              )}
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/10">
                              <button
                                onClick={() => leaveTeam && leaveTeam(team.id)}
                                className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-sm font-medium transition-colors cursor-pointer border border-red-500/20"
                              >
                                Team verlassen
                              </button>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}

                  {/* Profil-Overlay */}
                  {profileMember && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setProfileMember(null)}>
                      <div className="bg-[#111] border border-white/10 rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center" onClick={e => e.stopPropagation()}>
                        <div className="w-16 h-16 rounded-full bg-zinc-800 mx-auto flex items-center justify-center text-2xl font-bold text-white mb-4">{profileMember[0].toUpperCase()}</div>
                        <h3 className="text-xl font-bold text-white mb-1">{profileMember}</h3>
                        <p className="text-zinc-400 text-sm mb-6">Spieler</p>
                        <div className="grid grid-cols-3 gap-3 mb-6 text-center">
                          <div className="bg-white/5 rounded-xl p-3"><div className="font-bold text-white">—</div><div className="text-xs text-zinc-500 mt-1">Rang</div></div>
                          <div className="bg-white/5 rounded-xl p-3"><div className="font-bold text-white">—</div><div className="text-xs text-zinc-500 mt-1">Turniere</div></div>
                          <div className="bg-white/5 rounded-xl p-3"><div className="font-bold text-white">—</div><div className="text-xs text-zinc-500 mt-1">Siege</div></div>
                        </div>
                        <button onClick={() => setProfileMember(null)} className="w-full py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors cursor-pointer">Schließen</button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* ── Benachrichtigungen ── */}
              {activeTab === 'benachrichtigungen' && (
                <motion.div variants={containerVariants} initial="hidden" animate="show">
                  <motion.h1 variants={itemVariants} className="text-3xl font-display font-bold mb-8">Benachrichtigungen</motion.h1>
                  <div className="space-y-4">
                    {registeredTournaments.length > 0 ? registeredTournaments.map(t => (
                      <motion.div key={t.id} variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                          <Trophy className="w-5 h-5 text-violet-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white">Turnieranmeldung bestätigt</h4>
                          <p className="text-zinc-400 text-sm mt-1">Du bist für „{t.title}" angemeldet.</p>
                        </div>
                      </motion.div>
                    )) : (
                      <motion.div variants={itemVariants} className="text-center py-24 text-zinc-500">
                        <Bell className="w-12 h-12 mx-auto mb-4 opacity-30" />
                        <p>Keine Benachrichtigungen.</p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}


              {/* ── Organisation ── */}
              {activeTab === 'organisation' && (
                <motion.div variants={containerVariants} initial="hidden" animate="show">
                  <motion.h1 variants={itemVariants} className="text-3xl font-display font-bold mb-8">Organisation</motion.h1>
                  <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-3xl p-8 max-w-2xl">
                    <div className="flex items-center gap-6 mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                        <Building className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-display font-bold text-white">{user.organisation}</h2>
                        <p className="text-zinc-400 text-sm mt-1">Deine Schule / Organisation</p>
                      </div>
                    </div>
                    <div className="space-y-4 text-zinc-300">
                      <div className="flex items-center justify-between py-3 border-b border-white/10">
                        <span className="text-zinc-400">Mitglied seit</span>
                        <span className="font-medium">2026</span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-white/10">
                        <span className="text-zinc-400">Teams der Schule</span>
                        <span className="font-medium">{teams.filter(t => t.members.some(m => m.displayName === user.displayName)).length}</span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-white/10">
                        <span className="text-zinc-400">Teilgenommene Turniere</span>
                        <span className="font-medium">{user.registeredTournamentIds.length}</span>
                      </div>
                    </div>
                    <p className="mt-6 text-sm text-zinc-500">Die Organisation wird von der Plattform verwaltet und kann nicht selbst geändert werden.</p>
                  </motion.div>
                </motion.div>
              )}

              {/* ── Einstellungen ── */}
              {activeTab === 'einstellungen' && (
                <motion.div variants={containerVariants} initial="hidden" animate="show">
                  <motion.h1 variants={itemVariants} className="text-3xl font-display font-bold mb-8">Einstellungen</motion.h1>
                  <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-3xl p-8 max-w-2xl">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">Anzeigename</label>
                        <div className="flex gap-2">
                          <input type="text" value={nameInput} onChange={e => setNameInput(e.target.value)}
                            className="flex-grow bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-violet-500 transition-colors" />
                          <button onClick={() => updateDisplayName(nameInput)}
                            className="px-4 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white transition-colors cursor-pointer">
                            Speichern
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">E-Mail Adresse</label>
                        <input type="email" value="demo@muster-schule.de" disabled className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-zinc-500 cursor-not-allowed" />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
