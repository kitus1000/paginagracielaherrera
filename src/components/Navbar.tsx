import React from 'react';
import { NavTab } from '../types';
import { 
  BookOpen, 
  Gamepad2, 
  Download, 
  Sparkles, 
  Home, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Award,
  Menu,
  X
} from 'lucide-react';
import { sound } from '../utils/sound';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  xp: number;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  xp,
  soundEnabled,
  setSoundEnabled,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Inicio', icon: <Home className="w-4 h-4" /> },
    { id: 'units', label: 'Temario TecNM (4 Unidades)', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'demo', label: 'Simulador & Demostraciones', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'games', label: '4 Juegos de Integrales', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'downloads', label: 'Descargas & Apuntes', icon: <Download className="w-4 h-4" /> },
  ];

  const handleTabClick = (tab: NavTab) => {
    sound.playClick();
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const handleToggleSound = () => {
    const nextState = sound.toggleSound();
    setSoundEnabled(nextState);
    if (nextState) sound.playClick();
  };

  const handleToggleDark = () => {
    sound.playClick();
    setDarkMode(prev => !prev);
  };

  // Level calculation based on XP
  const level = Math.floor(xp / 100) + 1;
  const currentLevelXp = xp % 100;

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Teacher Branding */}
          <div 
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-indigo-500/80 shadow-md group-hover:scale-105 transition-transform bg-indigo-900 flex items-center justify-center">
                <img 
                  src="/miss-graciela.png" 
                  alt="Miss Graciela Herrera" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to text initials if image fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span className="text-white font-bold text-sm tracking-wider">GH</span>
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 dark:from-indigo-400 dark:via-cyan-300 dark:to-emerald-400 bg-clip-text text-transparent">
                  Cálculo Integral
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  TecNM
                </span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Ing. Graciela Herrera Vázquez
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 dark:bg-indigo-500'
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls: XP, Sound, Theme & Mobile menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Gamification Level & XP pill */}
            <div 
              title={`Nivel ${level} — ${xp} XP acumulados (${currentLevelXp}/100 para el siguiente nivel)`}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-bold shadow-sm"
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span>Nivel {level}</span>
              <div className="w-12 h-1.5 bg-amber-200 dark:bg-amber-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full transition-all duration-300"
                  style={{ width: `${currentLevelXp}%` }}
                />
              </div>
              <span className="text-[10px] text-amber-600/80 dark:text-amber-400/80">{xp} XP</span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={handleToggleSound}
              title={soundEnabled ? 'Silenciar Efectos de Audio' : 'Activar Efectos de Audio'}
              className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5 text-indigo-500" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={handleToggleDark}
              title={darkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
              className="p-2 rounded-lg text-slate-500 hover:text-amber-500 dark:text-slate-400 dark:hover:text-amber-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Open Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-4 space-y-1 bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 shadow-xl animate-in slide-in-from-top-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
          
          <div className="pt-2 flex items-center justify-between px-3 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 mt-2">
            <span>Experiencia: {xp} XP</span>
            <span className="font-bold text-amber-500">Nivel {level} de Cálculo</span>
          </div>
        </div>
      )}
    </header>
  );
};
