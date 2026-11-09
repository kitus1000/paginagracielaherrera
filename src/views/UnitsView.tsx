import React, { useState } from 'react';
import { SYLLABUS_UNITS } from '../data/syllabusData';
import { MathView } from '../components/MathView';
import { 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  HelpCircle, 
  BookOpen, 
  Lightbulb, 
  Eye, 
  EyeOff,
  Image as ImageIcon,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { sound } from '../utils/sound';

interface UnitsViewProps {
  setXp: (val: number | ((prev: number) => number)) => void;
}

export const UnitsView: React.FC<UnitsViewProps> = ({ setXp }) => {
  const [selectedUnitId, setSelectedUnitId] = useState(1);
  const [expandedSubtopic, setExpandedSubtopic] = useState<string | null>('u1-1');
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [revealedProblemSteps, setRevealedProblemSteps] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const currentUnit = SYLLABUS_UNITS.find(u => u.id === selectedUnitId) || SYLLABUS_UNITS[0];

  const handleUnitChange = (id: number) => {
    sound.playClick();
    setSelectedUnitId(id);
    const newUnit = SYLLABUS_UNITS.find(u => u.id === id);
    if (newUnit && newUnit.subtopics.length > 0) {
      setExpandedSubtopic(newUnit.subtopics[0].id);
    }
  };

  const toggleSubtopic = (id: string) => {
    sound.playClick();
    setExpandedSubtopic(prev => prev === id ? null : id);
  };

  const toggleSolution = (exId: string) => {
    sound.playHint();
    setRevealedSolutions(prev => {
      const next = !prev[exId];
      if (next) {
        setXp(x => x + 15);
      }
      return { ...prev, [exId]: next };
    });
  };

  const toggleProblemSteps = (pId: string) => {
    sound.playClick();
    setRevealedProblemSteps(prev => ({ ...prev, [pId]: !prev[pId] }));
  };

  // Filter subtopics if query exists
  const filteredSubtopics = currentUnit.subtopics.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.code.includes(searchQuery)
  );

  return (
    <div className="space-y-10 pb-16">
      
      {/* ========================================================
          HEADER & UNIT SELECTOR TABS
         ======================================================== */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <BookOpen className="w-4 h-4" />
              <span>Programa Oficial TecNM (ACF-0902)</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Temario Completo & Problemario por Unidades
            </h1>
          </div>

          {/* Quick search input */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Buscar tema, propiedad o fórmula..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
          </div>
        </div>

        {/* 4 Units Switcher Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {SYLLABUS_UNITS.map((unit) => {
            const isSelected = unit.id === selectedUnitId;
            return (
              <button
                key={unit.id}
                onClick={() => handleUnitChange(unit.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 border-indigo-500 shadow-xl ring-2 ring-indigo-500/20'
                    : 'bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className={`h-1.5 w-12 rounded-full mb-3 bg-gradient-to-r ${unit.gradient}`}></div>
                <span className="text-[11px] font-black uppercase text-slate-400 block tracking-wider">
                  {unit.code}
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                  {unit.title}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">
                  {unit.subtopics.length} temas • {unit.masterProblems.length} resueltos
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          ACTIVE UNIT BANNER
         ======================================================== */}
      <div className={`rounded-3xl p-6 sm:p-8 bg-gradient-to-r ${currentUnit.gradient} text-white shadow-xl relative overflow-hidden`}>
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold backdrop-blur-md">
            {currentUnit.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            {currentUnit.code}: {currentUnit.title}
          </h2>
          <p className="text-sm text-white/90 leading-relaxed">
            {currentUnit.summary}
          </p>
        </div>
      </div>

      {/* ========================================================
          SUBTOPICS ACCORDION EXPLORER
         ======================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>Subtemas Normativos y Demostraciones</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {filteredSubtopics.length} temas
            </span>
          </h3>

          <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
            Haz clic en cualquier tema para desplegar fórmulas e hitos históricos
          </span>
        </div>

        <div className="space-y-3">
          {filteredSubtopics.map((subtopic) => {
            const isExpanded = expandedSubtopic === subtopic.id;

            return (
              <div
                key={subtopic.id}
                className={`rounded-2xl border transition-all duration-200 ${
                  isExpanded
                    ? 'glass-panel border-indigo-400/60 dark:border-indigo-600 shadow-lg'
                    : 'bg-white dark:bg-slate-900/70 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                {/* Header */}
                <button
                  onClick={() => toggleSubtopic(subtopic.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-black flex items-center justify-center shrink-0">
                      {subtopic.code}
                    </span>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        {subtopic.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {subtopic.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {subtopic.figureUrl && (
                      <span className="hidden sm:flex items-center gap-1 text-[11px] text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/50 px-2 py-0.5 rounded-md border border-cyan-200 dark:border-cyan-800">
                        <ImageIcon className="w-3 h-3" />
                        <span>Gráfico 300 DPI</span>
                      </span>
                    )}
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-indigo-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Expanded Body */}
                {isExpanded && (
                  <div className="px-5 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-5 animate-in fade-in duration-200">
                    
                    {/* Key points bullets */}
                    <div>
                      <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider block mb-2">
                        Desarrollo Teórico y Conceptual:
                      </span>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        {subtopic.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2"></span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key formulas */}
                    {subtopic.formulas.length > 0 && (
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                        <span className="text-[11px] uppercase font-bold text-indigo-500 dark:text-indigo-400 block mb-2">
                          Fórmulas & Expresiones Clave (OMML):
                        </span>
                        <div className="space-y-2">
                          {subtopic.formulas.map((f, i) => (
                            <div key={i} className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-center">
                              <MathView math={f} block={true} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Historical / Curious Fact */}
                    {subtopic.historicalNote && (
                      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <span className="text-xs font-bold text-amber-800 dark:text-amber-300 block">
                            Dato Histórico / Curiosidad de Ingeniería:
                          </span>
                          <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed italic">
                            "{subtopic.historicalNote}"
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Diagram Preview */}
                    {subtopic.figureUrl && (
                      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                          <ImageIcon className="w-4 h-4 text-cyan-500" />
                          <span>Representación Gráfica Vectorial (Apuntes TecNM):</span>
                        </div>
                        <div className="rounded-lg overflow-hidden bg-slate-950 flex items-center justify-center p-2">
                          <img 
                            src={subtopic.figureUrl} 
                            alt={subtopic.figureCaption || 'Gráfico'} 
                            className="max-h-72 object-contain rounded"
                          />
                        </div>
                        {subtopic.figureCaption && (
                          <p className="text-center text-[11px] text-slate-500 dark:text-slate-400 italic">
                            {subtopic.figureCaption}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          TALLER DE PROBLEMAS RESUELTOS PASO A PASO
         ======================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>Taller de Problemas Resueltos Paso a Paso</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                Demostraciones
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Desarrollos algebraicos detallados paso por paso de los problemas maestros del temario.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {currentUnit.masterProblems.map((prob) => {
            const isRevealed = revealedProblemSteps[prob.id] ?? true;

            return (
              <div 
                key={prob.id}
                className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-indigo-600 text-white font-black text-xs">
                      Problema {prob.number}
                    </span>
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                      {prob.title}
                    </h4>
                  </div>

                  <button
                    onClick={() => toggleProblemSteps(prob.id)}
                    className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
                  >
                    {isRevealed ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Ocultar Desarrollo</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Desplegar Desarrollo</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Problem Statement */}
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <p className="mb-2">{prob.statement}</p>
                  {prob.statementMath && (
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-center my-2">
                      <MathView math={prob.statementMath} block={true} />
                    </div>
                  )}
                </div>

                {/* Steps */}
                {isRevealed && (
                  <div className="space-y-3 pt-2">
                    <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider block">
                      Secuencia de Pasos Algebraicos:
                    </span>
                    <div className="space-y-2.5">
                      {prob.steps.map((step, idx) => (
                        <div 
                          key={idx}
                          className="p-3.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 space-y-1.5"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <span className="font-bold text-xs text-slate-900 dark:text-slate-200">
                              {step.label}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 pl-7">
                            {step.description}
                          </p>
                          {step.math && (
                            <div className="pl-7 pt-1">
                              <MathView math={step.math} block={true} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Result badge */}
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Resultado Final: {prob.finalResult}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          BANCO DE EJERCICIOS PROPUESTOS CON SOLUCIONARIO
         ======================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>Banco de Ejercicios Propuestos con Solucionario</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pon a prueba tus conocimientos. Resuelve el problema por tu cuenta y pulsa para verificar el solucionario (+15 XP).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentUnit.exercises.map((ex) => {
            const isRevealed = revealedSolutions[ex.id];

            return (
              <div
                key={ex.id}
                className="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400">
                      {ex.code}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {ex.category}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                    {ex.statement}
                  </p>
                </div>

                {/* Solution Reveal button & box */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <button
                    onClick={() => toggleSolution(ex.id)}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 transition-colors"
                  >
                    {isRevealed ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Ocultar Solución</span>
                      </>
                    ) : (
                      <>
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Ver Procedimiento y Respuesta (+15 XP)</span>
                      </>
                    )}
                  </button>

                  {isRevealed && (
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 space-y-1 animate-in fade-in duration-200">
                      <span className="font-bold block text-emerald-700 dark:text-emerald-300">
                        Solución Analítica Oficial:
                      </span>
                      <p className="font-mono leading-relaxed">
                        {ex.solution}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
