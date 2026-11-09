import React from 'react';
import { NavTab } from '../types';
import { BookOpen, Sparkles, Gamepad2, Download, GraduationCap, Heart } from 'lucide-react';
import { sound } from '../utils/sound';

interface FooterProps {
  setActiveTab: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const handleNav = (tab: NavTab) => {
    sound.playClick();
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Institutional & Teacher */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-indigo-500/30">
                ∫
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
                  Cálculo Integral — TecNM
                </h3>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                  Asignatura Oficial: ACF-0902
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              Plataforma digital interactiva y repositorio académico integral diseñado por la{' '}
              <strong className="text-slate-800 dark:text-slate-200">Ing. Graciela Herrera Vázquez</strong>. 
              Diseñada para la comprensión profunda, intuitiva y gamificada del análisis infinitesimal en el Tecnológico Nacional de México.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <GraduationCap className="w-4 h-4 text-emerald-500" />
              <span>Propuesta de Trabajo Docente • TecNM 2026</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Navegación Rápida
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleNav('home')} 
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Inicio y Presentación
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('units')} 
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                  <span>Temario de las 4 Unidades</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('demo')} 
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                  <span>Simuladores Visuales</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('games')} 
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5"
                >
                  <Gamepad2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>4 Juegos de Cálculo</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('downloads')} 
                  className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-amber-500" />
                  <span>Descarga de Apuntes (65+ Págs)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: The 4 Units Summary */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Unidades Normativas
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>Unidad 1: Teorema Fundamental</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                <span>Unidad 2: Métodos de Integración</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Unidad 3: Aplicaciones de la Integral</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Unidad 4: Series & Polinomios</span>
              </li>
            </ul>
            <div className="mt-4 p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-[11px] text-indigo-700 dark:text-indigo-300">
              Listo para despliegue instantáneo en <strong>Vercel</strong> con soporte PWA y modo claro/oscuro automático.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>
            © {new Date().getFullYear()} Tecnológico Nacional de México • Asignatura ACF-0902 • Ing. Graciela Herrera Vázquez.
          </p>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>para la comunidad académica de Ingeniería</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
