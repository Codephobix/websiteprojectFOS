import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Trophy, Gamepad2, Users, Newspaper, LayoutDashboard, LogOut, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';
import { useModals } from '../ui/ModalContext';
import logo from '../../logo.svg';

const navItems = [
  { name: 'Startseite', path: '/', icon: Gamepad2 },
  { name: 'Turniere', path: '/turniere', icon: Trophy },
  { name: 'Spiele', path: '/spiele', icon: Gamepad2 },
  { name: 'Teams', path: '/teams', icon: Users },
  { name: 'Nachrichten', path: '/nachrichten', icon: Newspaper },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { openModal, isLoggedIn, logout, user } = useModals();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        isScrolled
          ? 'bg-black/80 backdrop-blur-xl border-white/10 py-3'
          : 'bg-transparent border-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="ESports School League" className="h-25 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                <span className={cn("relative z-10", isActive ? "text-white" : "text-zinc-400 hover:text-white")}>
                  {item.name}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 cursor-pointer hover:bg-white/5 px-3 py-2 rounded-xl transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-sm font-bold text-white">
                  {user?.displayName?.[0]?.toUpperCase() ?? 'D'}
                </div>
                <span className="text-sm font-medium text-white">{user?.displayName ?? 'Demo Spieler'}</span>
                <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
                  >
                    <button
                      onClick={() => { setDropdownOpen(false); navigate('/dashboard'); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </button>
                    <div className="h-px bg-white/10 mx-3" />
                    <button
                      onClick={() => { setDropdownOpen(false); logout(); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" /> Abmelden
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button 
              onClick={() => openModal('login')}
              className="h-10 px-6 rounded-full bg-white text-black font-medium text-sm hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              Anmelden
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-zinc-400 hover:text-white cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4"
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-colors",
                  isActive ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
          <div className="h-px bg-white/10 my-2" />
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl text-sm font-medium text-zinc-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          {isLoggedIn ? (
            <div 
              onClick={() => {
                setMobileMenuOpen(false);
                openModal('viewProfile');
              }}
              className="flex items-center gap-3 p-3 rounded-xl text-sm font-medium text-white hover:bg-white/5 transition-colors cursor-pointer mt-2"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-sm font-bold">
                P
              </div>
              ProPlayer123
            </div>
          ) : (
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                openModal('login');
              }}
              className="w-full mt-2 py-3 rounded-xl bg-white text-black font-medium text-sm hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              Anmelden
            </button>
          )}
        </motion.div>
      )}
    </header>
  );
}
