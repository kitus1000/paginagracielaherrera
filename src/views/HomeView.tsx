import React, { useState } from 'react';
import { NavTab } from '../types';
import { MathView } from '../components/MathView';
import { 
  BookOpen, 
  Sparkles, 
  Gamepad2, 
  Download, 
  ArrowRight, 
  Calculator, 
  CheckCircle2, 
  Zap, 
  FileText, 
  Layers, 
  Award,
  Play
} from 'lucide-react';
import { sound } from '../utils/sound';

interface HomeViewProps {
  setActiveTab: (tab: NavTab) => void;
  setXp: (val: number | ((prev: number) => number)) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab, setXp }) => {
  // Mini interactive calculator state
  const quickIntegrals = [
    { label: '∫ 3x² dx', func: '3x^2', antiderivative: 'x^3 + C', explanation: 'Regla de la potencia: 3 · (x³ / 3) + C = x³ + C' },
    { label: '∫ cos(2x) dx', func: '\\cos(2x)', antiderivative: '\\frac{1}{2}\\sin(2x) + C', explanation: 'Sustitución simple u = 2x, du = 2 dx => (1/2) sin(2x) + C' },
    { label: '∫ e^(3x) dx', func: 'e^{3x}', antiderivative: '\\frac{1}{3}e^{3x} + C', explanation: 'Exponencial con factor lineal k = 3 en el exponente' },
    { label: '∫ (1/x) dx', func: '\\frac{1}{x}', antiderivative: '\\ln|x| + C', explanation: 'Forma canónica de logaritmo natural con valor absoluto' },
    { label: '∫ x e^x dx', func: 'x e^x', antiderivative: 'e^x(x - 1) + C', explanation: 'Integración por partes: u = x, dv = e^x dx' },
    { label: '∫ 1/(x² + 4) dx', func: '\\frac{1}{x^2 + 4}', antiderivative: '\\frac{1}{2}\\arctan\\left(\\frac{x}{2}\\right) + C', explanation: 'Forma arco tangente con parámetro a = 2' }
  ];

  const [selectedIntegral, setSelectedIntegral] = useState(quickIntegrals[0]);
  const [showStepByStep, setShowStepByStep] = useState(false);

  const handleSelectQuick = (item: typeof quickIntegrals[0]) => {
    sound.playClick();
    setSelectedIntegral(item);
    setShowStepByStep(false);
  };

  const handleShowStep = () => {
    sound.playCorrect();
    setShowStepByStep(true);
    setXp((prev) => prev + 10);
  };

  return (
    <div className="space-y-16 pb-12">
      
      {/* ========================================================
          HERO BANNER
         ======================================================== */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-950 text-white p-8 sm:p-12 shadow-2xl border border-indigo-500/20">
        
        {/* Glow ambient decorations */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>Tecnológico Nacional de México • Clave Oficial ACF-0902</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Aprende{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-200 bg-clip-text text-transparent">
                Cálculo Integral
              </span>{' '}
              de forma Visual, Interactiva y Gamificada
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Bienvenido al entorno de aprendizaje oficial de la{' '}
              <strong className="text-white font-semibold">Ing. Graciela Herrera Vázquez</strong>. 
              Explora las 4 unidades temáticas, experimenta con simuladores de la vida real (cohetes espaciales, vaciado de tanques y puentes), 
              supera los 5 juegos didácticos y descarga apuntes normativos con más de 65 páginas.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => { sound.playClick(); setActiveTab('units'); }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explorar las 4 Unidades</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => { sound.playClick(); setActiveTab('games'); }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
              >
                <Gamepad2 className="w-4 h-4 text-emerald-400" />
                <span>Jugar los 5 Desafíos</span>
              </button>

              <button
                onClick={() => { sound.playClick(); setActiveTab('demo'); }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 font-bold text-sm border border-orange-500/40 transition-all"
              >
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span>🔬 Laboratorio Vida Real</span>
              </button>
            </div>
          </div>

          {/* Right Profile & Card */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative group">
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden ring-4 ring-indigo-400/40 shadow-2xl bg-indigo-950 flex items-center justify-center">
                <img 
                  src="/miss-graciela.png" 
                  alt="Ing. Graciela Herrera Vázquez" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
                <span className="text-white text-3xl font-black">GHV</span>
              </div>
              <div className="absolute -bottom-3 inset-x-0 mx-auto w-max px-4 py-1 rounded-full bg-slate-900 text-cyan-300 text-xs font-bold border border-cyan-500/40 shadow-lg flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Ing. Graciela Herrera Vázquez</span>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-indigo-200/80 font-medium max-w-xs">
              "El cálculo no es solo una materia: es el lenguaje cuantitativo con el que los ingenieros modelamos el universo."
            </p>
          </div>
        </div>

        {/* Feature Highlights Bar */}
        <div className="mt-12 pt-8 border-t border-indigo-500/20 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="block text-2xl sm:text-3xl font-black text-cyan-300">65+</span>
            <span className="text-xs text-slate-300">Páginas de Apuntes</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="block text-2xl sm:text-3xl font-black text-emerald-300">40</span>
            <span className="text-xs text-slate-300">Problemas Paso a Paso</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="block text-2xl sm:text-3xl font-black text-amber-300">26</span>
            <span className="text-xs text-slate-300">Figuras en 300 DPI</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="block text-2xl sm:text-3xl font-black text-pink-300">4</span>
            <span className="text-xs text-slate-300">Juegos de Integrales</span>
          </div>
        </div>
      </section>

      {/* ========================================================
          CALCULADORA RÁPIDA & DEMOSTRADOR VISUAL INTERACTIVO
         ======================================================== */}
      <section className="glass-panel rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Demostrador Inmediato de Antiderivadas
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Selecciona una integral canónica para visualizar su solución analítica y justificación paso a paso.
              </p>
            </div>
          </div>

          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" />
            <span>Resolución Interactiva</span>
          </span>
        </div>

        {/* Buttons selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
          {quickIntegrals.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectQuick(item)}
              className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                selectedIntegral.func === item.func
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20 scale-[1.02]'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-400'
              }`}
            >
              <MathView math={`\\int ${item.func} \\, dx`} />
            </button>
          ))}
        </div>

        {/* Display card */}
        <div className="rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase tracking-wider font-bold text-indigo-500 dark:text-indigo-400">
              Integral Seleccionada
            </span>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              <MathView math={`\\int ${selectedIntegral.func} \\, dx`} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ArrowRight className="w-6 h-6 text-slate-400 hidden md:block" />
            
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800 shadow-sm text-center">
              <span className="text-[11px] block font-semibold text-emerald-600 dark:text-emerald-400 uppercase">
                Primitiva F(x) + C
              </span>
              <div className="text-lg sm:text-xl font-bold text-indigo-600 dark:text-indigo-300">
                <MathView math={selectedIntegral.antiderivative} />
              </div>
            </div>
          </div>

          <button
            onClick={handleShowStep}
            className="w-full md:w-auto px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{showStepByStep ? 'Paso a Paso Revelado (+10 XP)' : 'Ver Justificación (+10 XP)'}</span>
          </button>
        </div>

        {/* Step-by-step accordion content */}
        {showStepByStep && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 space-y-1 animate-in fade-in duration-200">
            <div className="font-bold flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Procedimiento Didáctico:</span>
            </div>
            <p className="leading-relaxed pl-5 font-mono">
              {selectedIntegral.explanation}
            </p>
          </div>
        )}
      </section>

      {/* ========================================================
          MAPA DE LAS 4 UNIDADES TEMÁTICAS (TECNM)
         ======================================================== */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Estructura Oficial TecNM</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Las 4 Unidades del Programa Normativo
            </h2>
          </div>

          <button
            onClick={() => { sound.playClick(); setActiveTab('units'); }}
            className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>Ver temario detallado con fórmulas</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Unidad 1 */}
          <div 
            onClick={() => { sound.playClick(); setActiveTab('units'); }}
            className="group glass-panel rounded-2xl p-6 glass-card-hover cursor-pointer border-t-4 border-t-blue-500 relative flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  UNIDAD 1
                </span>
                <span className="text-xs text-slate-400">10 Subtemas</span>
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                Teorema Fundamental del Cálculo
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Sumas de Riemann, Darboux, Simpson, propiedades de linealidad y la Regla de Barrow.
              </p>
            </div>
            
            <div className="pt-4 mt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
              <span>10 Resueltos • 10 Propuestos</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Unidad 2 */}
          <div 
            onClick={() => { sound.playClick(); setActiveTab('units'); }}
            className="group glass-panel rounded-2xl p-6 glass-card-hover cursor-pointer border-t-4 border-t-purple-500 relative flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black px-2.5 py-1 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                  UNIDAD 2
                </span>
                <span className="text-xs text-slate-400">6 Métodos</span>
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-purple-500 transition-colors">
                Métodos de Integración
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Cambio de variable, integración por partes tabular, sustitución trigonométrica, Heaviside y Weierstrass.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400">
              <span>10 Resueltos • 12 Propuestos</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Unidad 3 */}
          <div 
            onClick={() => { sound.playClick(); setActiveTab('units'); }}
            className="group glass-panel rounded-2xl p-6 glass-card-hover cursor-pointer border-t-4 border-t-emerald-500 relative flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  UNIDAD 3
                </span>
                <span className="text-xs text-slate-400">5 Aplicaciones</span>
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                Aplicaciones de la Integral
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Áreas dx/dy, Catenaria, sólidos por discos, cascarones, Trompeta de Gabriel e integrales impropias.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <span>10 Resueltos • 12 Propuestos</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Unidad 4 */}
          <div 
            onClick={() => { sound.playClick(); setActiveTab('units'); }}
            className="group glass-panel rounded-2xl p-6 glass-card-hover cursor-pointer border-t-4 border-t-amber-500 relative flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black px-2.5 py-1 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                  UNIDAD 4
                </span>
                <span className="text-xs text-slate-400">8 Subtemas</span>
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                Series & Polinomios de Taylor
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Criterios de convergencia, series de potencias, radio de convergencia, Taylor, Maclaurin y Apolo 11.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400">
              <span>10 Resueltos • 12 Propuestos</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          LOS 5 JUEGOS INTERACTIVOS (GAMIFICACIÓN)
         ======================================================== */}
      <section className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-10 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
              <Award className="w-3.5 h-3.5" />
              <span>5 Minijuegos Didácticos Incorporados</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Aprende Jugando: Zona de Entrenamiento
            </h2>
            <p className="text-sm text-slate-300 max-w-xl">
              Arrastra primitivas, clasifica métodos a contrarreloj, defiende la estación orbital en el arcade espacial y vence a los 4 jefes en la Batalla de Riemann.
            </p>
          </div>

          <button
            onClick={() => { sound.playClick(); setActiveTab('games'); }}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Comenzar los Juegos</span>
          </button>
        </div>

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          <div 
            onClick={() => { sound.playClick(); setActiveTab('games'); }}
            className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-all hover:scale-105 space-y-3"
          >
            <span className="text-3xl">🎯</span>
            <h4 className="font-bold text-sm text-white">1. Caza-Primitivas</h4>
            <p className="text-xs text-slate-300">
              Arrastra la solución correcta sobre cada integral antes de que expire el temporizador.
            </p>
            <span className="text-[11px] font-bold text-cyan-400 flex items-center gap-1">
              <span>Jugar Arrastre</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          <div 
            onClick={() => { sound.playClick(); setActiveTab('games'); }}
            className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-all hover:scale-105 space-y-3"
          >
            <span className="text-3xl">⚡</span>
            <h4 className="font-bold text-sm text-white">2. Reactor de Métodos</h4>
            <p className="text-xs text-slate-300">
              Clasifica la técnica óptima (Partes, Sustitución, Fracciones) en un desafío de velocidad.
            </p>
            <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
              <span>Jugar Velocidad</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          <div 
            onClick={() => { sound.playClick(); setActiveTab('games'); }}
            className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-all hover:scale-105 space-y-3"
          >
            <span className="text-3xl">🧩</span>
            <h4 className="font-bold text-sm text-white">3. Rompecabezas</h4>
            <p className="text-xs text-slate-300">
              Reordena los pasos matemáticos desordenados para completar la demostración exacta.
            </p>
            <span className="text-[11px] font-bold text-purple-400 flex items-center gap-1">
              <span>Jugar Pasos</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          <div 
            onClick={() => { sound.playClick(); setActiveTab('games'); }}
            className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-all hover:scale-105 space-y-3"
          >
            <span className="text-3xl">⚔️</span>
            <h4 className="font-bold text-sm text-white">4. Batalla de Riemann</h4>
            <p className="text-xs text-slate-300">
              Vence a los 4 jefes de cada unidad, administra tus 3 vidas y gana tu diploma de honor.
            </p>
            <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
              <span>Jugar Batalla</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          <div 
            onClick={() => { sound.playClick(); setActiveTab('games'); }}
            className="p-5 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 cursor-pointer transition-all hover:scale-105 space-y-3 ring-1 ring-cyan-500/20"
          >
            <span className="text-3xl">🛸</span>
            <h4 className="font-bold text-sm text-white">5. Invasores Arcade</h4>
            <p className="text-xs text-slate-300">
              Dispara rayos láser con las teclas 1-4 para destruir meteoritos de cálculo en tiempo real.
            </p>
            <span className="text-[11px] font-bold text-cyan-300 flex items-center gap-1">
              <span>¡Jugar Arcade!</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>

        </div>
      </section>

      {/* ========================================================
          DESCARGAS Y RECURSOS DIDÁCTICOS
         ======================================================== */}
      <section className="glass-panel rounded-3xl p-8 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 shrink-0">
            <FileText className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Manual Completo de Apuntes (65+ Páginas)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
              Descarga el documento oficial de asignatura para Microsoft Word con 124 cajas estilizadas, 
              26 figuras vectoriales y 88 problemas resueltos y propuestos para el TecNM.
            </p>
          </div>
        </div>

        <button
          onClick={() => { sound.playClick(); setActiveTab('downloads'); }}
          className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-extrabold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Ir a la Zona de Descargas</span>
        </button>
      </section>

    </div>
  );
};
