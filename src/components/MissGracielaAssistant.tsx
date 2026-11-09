import React, { useState } from 'react';
import { NavTab } from '../types';
import { 
  Sparkles, 
  HelpCircle, 
  X, 
  ChevronRight, 
  Heart, 
  Lightbulb,
  GraduationCap
} from 'lucide-react';
import { sound } from '../utils/sound';

interface AssistantProps {
  activeTab: NavTab;
  xp: number;
  setXp: (val: number | ((prev: number) => number)) => void;
  lives?: number;
}

export const MissGracielaAssistant: React.FC<AssistantProps> = ({
  activeTab,
  setXp,
  lives = 3,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  const tipsByTab: Record<NavTab, string[]> = {
    home: [
      '¡Hola! Soy la Ing. Graciela Herrera Vázquez. Te doy la bienvenida a nuestra plataforma de Cálculo Integral del TecNM. Explora las 4 unidades o ponte a prueba en los 4 juegos.',
      'Consejo clave: Toda integral representa una suma continua acumulada. Antes de memorizar fórmulas, visualiza el área que estás acumulando.',
      'En esta plataforma puedes descargar el manual completo de apuntes con más de 65 páginas y 88 ejercicios desarrollados.'
    ],
    units: [
      'Para la Unidad 1: En el Teorema del Valor Medio para Integrales, la altura media f(c) iguala el área exacta bajo la curva.',
      'Para la Unidad 2: Al aplicar sustitución trigonométrica, dibuja siempre el triángulo rectángulo para no equivocarte al regresar a la variable x.',
      'Para la Unidad 3: En sólidos de revolución, si el eje de giro es vertical y la franja es vertical, usa el método de Cascarones Cilíndricos.',
      'Para la Unidad 4: Si una serie alternante tiene términos que decrecen estrictamente hacia cero, el Criterio de Leibniz garantiza su convergencia.'
    ],
    demo: [
      'En el simulador de Riemann: Mueve el deslizador a n = 50 o más rectángulos. Observa cómo el error porcentual se reduce casi a cero.',
      'Compara la Regla de los Trapecios contra la Regla de Simpson: Simpson ajusta parábolas y converge mucho más rápido.',
      'En el visualizador de la Trompeta de Gabriel: Comprueba cómo el volumen es exactamente π ≈ 3.1416 u³, mientras que el área superficial es infinita.'
    ],
    games: [
      '¡En el juego Caza-Primitivas: Arrastra cada solución a su respectiva integral! Si aciertas en racha obtendrás multiplicadores de XP.',
      'En el Reactor de Métodos: Tienes tiempo limitado para identificar la técnica óptima. Si ves grado 1 arriba y grado 2 abajo, ¡casi siempre es sustitución simple!',
      'En el Rompecabezas: Ordena los pasos algebraicos cronológicamente de arriba hacia abajo.',
      'En la Batalla de Riemann: Usa tu comodín de Pista Dorada si dudas en la respuesta ante los jefes.'
    ],
    downloads: [
      'El archivo Word de apuntes incluye 124 cajas pedagógicas, 26 figuras en 300 DPI y más de 200 fórmulas matemáticas.',
      'Al abrir el documento en Word, puedes presionar F9 en el índice para recalcular automáticamente la numeración de páginas.'
    ]
  };

  const currentTips = tipsByTab[activeTab] || tipsByTab.home;
  const currentTip = currentTips[tipIndex % currentTips.length];

  const handleNextTip = () => {
    sound.playHint();
    setTipIndex((prev) => prev + 1);
    // Reward curiosity with 5 XP
    setXp((prev) => prev + 5);
  };

  const toggleAssistant = () => {
    sound.playClick();
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      
      {/* Speech / Clue Balloon */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl glass-panel shadow-2xl p-4 border border-indigo-200 dark:border-indigo-800 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden ring-1 ring-indigo-500 bg-indigo-900 flex items-center justify-center">
                <img 
                  src="/miss-graciela.png" 
                  alt="Miss Graciela" 
                  className="w-full h-full object-cover" 
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
                <span className="text-white text-xs font-bold">GH</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                  <span>Tutor Virtual: Miss Graciela</span>
                  <Sparkles className="w-3 h-3 text-amber-500" />
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Docente TecNM • Cálculo Integral
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Vidas en juego */}
              <div className="flex items-center gap-0.5 text-rose-500" title={`${lives} vidas disponibles`}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <Heart 
                    key={i} 
                    className={`w-3.5 h-3.5 ${i < lives ? 'fill-rose-500' : 'text-slate-300 dark:text-slate-700'}`} 
                  />
                ))}
              </div>
              <button 
                onClick={toggleAssistant}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tip / Message Body */}
          <div className="py-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 animate-bounce" />
            <p className="italic">
              "{currentTip}"
            </p>
          </div>

          {/* Action Footer */}
          <div className="pt-2.5 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Pista { (tipIndex % currentTips.length) + 1 } de { currentTips.length }</span>
            </span>

            <button
              onClick={handleNextTip}
              className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all active:scale-95"
            >
              <span>Otra Pista (+5 XP)</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Avatar Trigger Button */}
      <button
        onClick={toggleAssistant}
        className="group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 text-white shadow-xl hover:shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all duration-200 ring-2 ring-white/80 dark:ring-slate-900"
        title="¿Necesitas ayuda? Haz clic para pedir una pista a Miss Graciela"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden border border-white/50 bg-indigo-900 flex items-center justify-center">
          <img 
            src="/miss-graciela.png" 
            alt="Miss Graciela Avatar" 
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
          />
          <span className="text-white text-xs font-bold">GH</span>
        </div>
        
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold tracking-tight leading-tight flex items-center gap-1">
            <span>Pedir Ayuda</span>
            <HelpCircle className="w-3.5 h-3.5 text-cyan-200" />
          </span>
          <span className="text-[9px] text-indigo-100 font-medium">Miss Graciela</span>
        </div>

        {/* Pulse badge */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
        </span>
      </button>
    </div>
  );
};
