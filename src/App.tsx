import React, { useState, useEffect } from 'react';
import { NavTab } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MissGracielaAssistant } from './components/MissGracielaAssistant';
import { HomeView } from './views/HomeView';
import { UnitsView } from './views/UnitsView';
import { DemonstrationsView } from './views/DemonstrationsView';
import { GamesView } from './views/GamesView';
import { DownloadsView } from './views/DownloadsView';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');

  // Dark mode initial state: read from localStorage or system preference
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('tecnm_dark_mode');
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Sound enabled state
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Student XP state
  const [xp, setXp] = useState<number>(() => {
    const savedXp = localStorage.getItem('tecnm_student_xp');
    return savedXp ? Number(savedXp) : 120;
  });

  // Student lives
  const [lives, setLives] = useState<number>(3);

  // Sync dark mode class on HTML documentElement
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('tecnm_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('tecnm_dark_mode', 'false');
    }
  }, [darkMode]);

  // Sync XP to localStorage
  useEffect(() => {
    localStorage.setItem('tecnm_student_xp', xp.toString());
  }, [xp]);

  // Listen to system theme changes dynamically if user hasn't hardcoded it
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem('tecnm_dark_mode');
      if (saved === null) {
        setDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      
      {/* Institutional Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        xp={xp}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div key={activeTab} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          {activeTab === 'home' && (
            <HomeView setActiveTab={setActiveTab} setXp={setXp} />
          )}
          {activeTab === 'units' && (
            <UnitsView setXp={setXp} />
          )}
          {activeTab === 'demo' && (
            <DemonstrationsView setXp={setXp} />
          )}
          {activeTab === 'games' && (
            <GamesView xp={xp} setXp={setXp} lives={lives} setLives={setLives} />
          )}
          {activeTab === 'downloads' && (
            <DownloadsView />
          )}
        </div>
      </main>

      {/* Floating Interactive Virtual Assistant (Miss Graciela) */}
      <MissGracielaAssistant
        activeTab={activeTab}
        xp={xp}
        setXp={setXp}
        lives={lives}
      />

      {/* Institutional Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
