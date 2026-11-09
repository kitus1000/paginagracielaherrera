import React, { useState, useEffect } from 'react';
import { DRAG_MATCH_ITEMS, SPEED_SORTER_QUESTIONS, STEP_PUZZLES, BOSS_LEVELS } from '../data/gamesData';
import { MathView } from '../components/MathView';
import { 
  Gamepad2, 
  Trophy, 
  Heart, 
  RotateCcw, 
  Flame, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Timer, 
  ArrowUp, 
  ArrowDown, 
  HelpCircle,
  Award,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { SpaceDefendersGame } from '../components/SpaceDefendersGame';

interface GamesViewProps {
  xp: number;
  setXp: (val: number | ((prev: number) => number)) => void;
  lives: number;
  setLives: (val: number | ((prev: number) => number)) => void;
}

export const GamesView: React.FC<GamesViewProps> = ({ setXp, lives, setLives }) => {
  const [selectedGame, setSelectedGame] = useState<1 | 2 | 3 | 4 | 5>(1);

  // ==========================================
  // JUEGO 1: DRAG & MATCH STATE
  // ==========================================
  const [dragDifficulty, setDragDifficulty] = useState<'facil' | 'medio' | 'avanzado'>('facil');
  const [draggedChipId, setDraggedChipId] = useState<string | null>(null);
  const [selectedChipId, setSelectedChipId] = useState<string | null>(null); // For click-to-place fallback
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({}); // { integralId: solutionId }
  const [dragCombo, setDragCombo] = useState(0);
  const [dragScore, setDragScore] = useState(0);

  const currentDragItems = DRAG_MATCH_ITEMS.filter(item => item.difficulty === dragDifficulty);

  // Shuffled chips for the right-hand column
  const [shuffledChips, setShuffledChips] = useState<typeof currentDragItems>([]);

  useEffect(() => {
    const shuffled = [...currentDragItems].sort(() => Math.random() - 0.5);
    setShuffledChips(shuffled);
    setMatchedPairs({});
    setDragCombo(0);
  }, [dragDifficulty]);

  const handleDragStart = (chipId: string) => {
    sound.playClick();
    setDraggedChipId(chipId);
  };

  const handleDropOnIntegral = (integralId: string) => {
    const chipToPlace = draggedChipId || selectedChipId;
    if (!chipToPlace) return;

    if (chipToPlace === integralId) {
      // Correct match!
      sound.playCorrect();
      setMatchedPairs(prev => ({ ...prev, [integralId]: chipToPlace }));
      const newCombo = dragCombo + 1;
      setDragCombo(newCombo);
      const points = 50 * newCombo;
      setDragScore(s => s + points);
      setXp(x => x + points);

      // Check if all matched
      if (Object.keys(matchedPairs).length + 1 >= currentDragItems.length) {
        sound.playVictory();
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
    } else {
      // Wrong match!
      sound.playWrong();
      setDragCombo(0);
    }

    setDraggedChipId(null);
    setSelectedChipId(null);
  };

  // ==========================================
  // JUEGO 2: REACTOR DE MÉTODOS STATE
  // ==========================================
  const [speedIndex, setSpeedIndex] = useState(0);
  const [speedScore, setSpeedScore] = useState(0);
  const [speedStreak, setSpeedStreak] = useState(0);
  const [speedTimer, setSpeedTimer] = useState(15);
  const [speedActive, setSpeedActive] = useState(false);
  const [speedExplanation, setSpeedExplanation] = useState<string | null>(null);

  const currentSpeedQ = SPEED_SORTER_QUESTIONS[speedIndex % SPEED_SORTER_QUESTIONS.length];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (speedActive && speedTimer > 0) {
      interval = setInterval(() => {
        setSpeedTimer(t => t - 1);
      }, 1000);
    } else if (speedActive && speedTimer === 0) {
      // Time up!
      sound.playWrong();
      setSpeedStreak(0);
      setSpeedExplanation(`¡Tiempo agotado! La respuesta correcta era: ${currentSpeedQ.correctMethod}.`);
      setSpeedActive(false);
    }
    return () => clearInterval(interval);
  }, [speedActive, speedTimer, currentSpeedQ]);

  const handleSpeedAnswer = (selectedMethod: string) => {
    if (!speedActive) return;

    if (selectedMethod === currentSpeedQ.correctMethod) {
      sound.playCorrect();
      const points = 40 + speedTimer * 5;
      setSpeedScore(s => s + points);
      setSpeedStreak(st => st + 1);
      setXp(x => x + points);
      setSpeedExplanation(`¡Correcto! ${currentSpeedQ.explanation}`);

      if ((speedIndex + 1) % 4 === 0) {
        confetti({ particleCount: 50, spread: 60 });
      }

      setTimeout(() => {
        setSpeedIndex(prev => prev + 1);
        setSpeedTimer(15);
        setSpeedExplanation(null);
      }, 1500);
    } else {
      sound.playWrong();
      setSpeedStreak(0);
      setSpeedExplanation(`Incorrecto. La respuesta era: ${currentSpeedQ.correctMethod}. ${currentSpeedQ.explanation}`);
    }
  };

  const startSpeedGame = () => {
    sound.playClick();
    setSpeedIndex(0);
    setSpeedScore(0);
    setSpeedStreak(0);
    setSpeedTimer(15);
    setSpeedExplanation(null);
    setSpeedActive(true);
  };

  // ==========================================
  // JUEGO 3: ROMPECABEZAS DE PASOS STATE
  // ==========================================
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const currentPuzzle = STEP_PUZZLES[puzzleIndex % STEP_PUZZLES.length];
  const [puzzleSteps, setPuzzleSteps] = useState(currentPuzzle.shuffledSteps);
  const [puzzleSolved, setPuzzleSolved] = useState(false);

  useEffect(() => {
    setPuzzleSteps([...currentPuzzle.shuffledSteps]);
    setPuzzleSolved(false);
  }, [puzzleIndex, currentPuzzle]);

  const moveStep = (index: number, direction: 'up' | 'down') => {
    sound.playClick();
    const newSteps = [...puzzleSteps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSteps.length) return;

    const temp = newSteps[index];
    newSteps[index] = newSteps[targetIndex];
    newSteps[targetIndex] = temp;
    setPuzzleSteps(newSteps);
  };

  const verifyPuzzleOrder = () => {
    const isCorrect = puzzleSteps.every((step, idx) => step.correctIndex === idx);
    if (isCorrect) {
      sound.playVictory();
      setPuzzleSolved(true);
      setXp(x => x + 100);
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
    } else {
      sound.playWrong();
      alert('Aún hay pasos fuera de orden cronológico. Revisa qué paso debe calcularse antes.');
    }
  };

  // ==========================================
  // JUEGO 4: BATALLA DE RIEMANN (BOSS ROGUELIKE)
  // ==========================================
  const [bossLevelIdx, setBossLevelIdx] = useState(0);
  const [bossHp, setBossHp] = useState(100);
  const [bossQuestionIdx, setBossQuestionIdx] = useState(0);
  const [bossGameOver, setBossGameOver] = useState(false);
  const [bossVictory, setBossVictory] = useState(false);
  const [studentName, setStudentName] = useState('Estudiante TecNM');
  const [used5050, setUsed5050] = useState(false);
  const [active5050Options, setActive5050Options] = useState<number[]>([]);
  const [shieldActive, setShieldActive] = useState(false);

  const currentBoss = BOSS_LEVELS[bossLevelIdx % BOSS_LEVELS.length];
  const currentBossQ = currentBoss.questions[bossQuestionIdx % currentBoss.questions.length];

  const handleBossAnswer = (optIdx: number) => {
    if (optIdx === currentBossQ.correctIndex) {
      // Hit the boss!
      sound.playCorrect();
      const dmg = 40;
      const nextHp = Math.max(0, bossHp - dmg);
      setBossHp(nextHp);
      setXp(x => x + currentBossQ.xp);

      if (nextHp <= 0) {
        // Boss Defeated!
        sound.playVictory();
        confetti({ particleCount: 100, spread: 90 });
        if (bossLevelIdx + 1 >= BOSS_LEVELS.length) {
          setBossVictory(true);
        } else {
          setTimeout(() => {
            setBossLevelIdx(prev => prev + 1);
            setBossHp(100);
            setBossQuestionIdx(0);
            setUsed5050(false);
            setActive5050Options([]);
          }, 1200);
        }
      } else {
        setTimeout(() => {
          setBossQuestionIdx(prev => prev + 1);
          setActive5050Options([]);
        }, 800);
      }
    } else {
      // Player takes damage or shield absorbs
      sound.playWrong();
      if (shieldActive) {
        sound.playHint();
        setShieldActive(false);
        alert('¡El Escudo de Newton absorbió el golpe! No perdiste vidas.');
      } else {
        setLives(prev => {
          const next = prev - 1;
          if (next <= 0) {
            setBossGameOver(true);
          }
          return Math.max(0, next);
        });
      }
    }
  };

  const use5050 = () => {
    if (used5050) return;
    sound.playHint();
    setUsed5050(true);
    const correct = currentBossQ.correctIndex;
    const incorrects = [0, 1, 2, 3].filter(i => i !== correct);
    // Keep 1 incorrect and the correct one
    const toKeep = [correct, incorrects[Math.floor(Math.random() * incorrects.length)]];
    setActive5050Options(toKeep);
  };

  const restartBossBattle = () => {
    sound.playClick();
    setBossLevelIdx(0);
    setBossHp(100);
    setBossQuestionIdx(0);
    setBossGameOver(false);
    setBossVictory(false);
    setLives(3);
    setUsed5050(false);
    setActive5050Options([]);
    setShieldActive(false);
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* ========================================================
          GAMES HUB NAV HEADER
         ======================================================== */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Gamepad2 className="w-4 h-4" />
              <span>Zona de Gamificación Académica</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              5 Juegos Interactivos de Cálculo
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Hearts indicator */}
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-500 font-bold text-xs">
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart 
                  key={i} 
                  className={`w-4 h-4 ${i < lives ? 'fill-rose-500' : 'text-slate-300 dark:text-slate-700'}`} 
                />
              ))}
              <span className="ml-1 text-slate-700 dark:text-slate-300">{lives} Vidas</span>
            </div>

            {/* Total XP */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 font-bold text-xs">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>{dragScore + speedScore} Pts</span>
            </div>
          </div>
        </div>

        {/* 5 Games Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { id: 1, title: '1. Caza-Primitivas', sub: 'Drag & Drop de Respuestas', icon: '🎯' },
            { id: 2, title: '2. Reactor de Métodos', sub: 'Clasificador a Contrarreloj', icon: '⚡' },
            { id: 3, title: '3. Rompecabezas', sub: 'Ordenamiento de Pasos', icon: '🧩' },
            { id: 4, title: '4. Batalla Riemann', sub: 'Aventura contra 4 Jefes', icon: '⚔️' },
            { id: 5, title: '5. Invasores Arcade', sub: 'Defensa con Teclas 1-4', icon: '🛸' }
          ].map((g) => (
            <button
              key={g.id}
              onClick={() => { sound.playClick(); setSelectedGame(g.id as any); }}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedGame === g.id
                  ? 'bg-gradient-to-br from-indigo-600 to-cyan-600 text-white border-transparent shadow-xl scale-[1.02]'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <span className="text-2xl mb-1 block">{g.icon}</span>
              <span className="font-black text-sm block">{g.title}</span>
              <span className={`text-[11px] block ${selectedGame === g.id ? 'text-indigo-100' : 'text-slate-400'}`}>
                {g.sub}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================
          JUEGO 1: CAZA-PRIMITIVAS DRAG & DROP
         ======================================================== */}
      {selectedGame === 1 && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>🎯 Caza-Primitivas (Arrastra o Selecciona la Antiderivada)</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Arrastra la tarjeta de la solución (o haz clic en ella y luego en la casilla) para emparejarla con su integral correspondiente.
              </p>
            </div>

            {/* Difficulty switcher */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              {(['facil', 'medio', 'avanzado'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => { sound.playClick(); setDragDifficulty(diff); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                    dragDifficulty === diff
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 px-2">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500 animate-bounce" />
              <span>Racha de Aciertos: <strong className="text-orange-500 font-mono text-sm">{dragCombo}x</strong></span>
            </div>
            <span>Puntaje: <strong className="text-indigo-600 dark:text-indigo-400 font-mono text-sm">{dragScore}</strong></span>
          </div>

          {/* 2 Columns: Left = Integrals (Drop Zones), Right = Draggable Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Left: Drop zones */}
            <div className="md:col-span-7 space-y-3">
              <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider block">
                Integrales a Resolver (Zonas de Colocación):
              </span>

              {currentDragItems.map((item) => {
                const isMatched = !!matchedPairs[item.id];

                return (
                  <div
                    key={item.id}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDropOnIntegral(item.id)}
                    onClick={() => {
                      if (selectedChipId && !isMatched) {
                        handleDropOnIntegral(item.id);
                      }
                    }}
                    className={`p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4 ${
                      isMatched
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 shadow-sm'
                        : selectedChipId
                        ? 'border-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30 cursor-pointer animate-pulse'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center">
                        ∫
                      </span>
                      <div className="text-base font-bold text-slate-900 dark:text-white">
                        <MathView math={item.integralLatex} />
                      </div>
                    </div>

                    {/* Drop Target or Answer */}
                    <div className="min-w-[130px] text-right">
                      {isMatched ? (
                        <div className="flex items-center justify-end gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                          <CheckCircle2 className="w-4 h-4" />
                          <MathView math={item.solutionLatex} />
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 border border-dashed border-slate-300 dark:border-slate-700 px-3 py-1.5 rounded-lg inline-block">
                          Arrastra aquí
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Draggable Chips */}
            <div className="md:col-span-5 space-y-3">
              <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider block">
                Respuestas Disponibles (Arrastra o Toca):
              </span>

              <div className="grid grid-cols-1 gap-2.5">
                {shuffledChips.map((chip) => {
                  const isAlreadyUsed = Object.values(matchedPairs).includes(chip.id);
                  const isSelected = selectedChipId === chip.id;

                  if (isAlreadyUsed) {
                    return null; // hide already matched
                  }

                  return (
                    <div
                      key={chip.id}
                      draggable={true}
                      onDragStart={() => handleDragStart(chip.id)}
                      onClick={() => {
                        sound.playClick();
                        setSelectedChipId(isSelected ? null : chip.id);
                      }}
                      className={`p-3.5 rounded-xl border text-center font-bold text-sm cursor-grab active:cursor-grabbing transition-all select-none shadow-sm ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 scale-105 ring-2 ring-indigo-400'
                          : 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-300 border-slate-200 dark:border-slate-800 hover:border-indigo-400 hover:scale-102'
                      }`}
                    >
                      <MathView math={chip.solutionLatex} />
                      <span className="block text-[10px] text-slate-400 font-normal mt-0.5">
                        {chip.method}
                      </span>
                    </div>
                  );
                })}
              </div>

              {Object.keys(matchedPairs).length >= currentDragItems.length && (
                <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 text-center font-bold text-sm space-y-2 animate-in zoom-in-95">
                  <span>🎉 ¡Nivel Completado con Éxito!</span>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setMatchedPairs({});
                      setShuffledChips([...currentDragItems].sort(() => Math.random() - 0.5));
                    }}
                    className="block mx-auto text-xs px-4 py-2 bg-emerald-600 text-white rounded-lg shadow"
                  >
                    Jugar de Nuevo
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          JUEGO 2: REACTOR DE MÉTODOS (SPEED SORTER)
         ======================================================== */}
      {selectedGame === 2 && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl max-w-4xl mx-auto">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>⚡ Reactor de Métodos de Integración</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Observa la integral y presiona la técnica matemática óptima antes de que el reactor se sobrecaliente.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-500">
                <Flame className="w-4 h-4" />
                <span>Racha: {speedStreak}</span>
              </div>
              <div className="px-3 py-1 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                {speedScore} Puntos
              </div>
            </div>
          </div>

          {!speedActive ? (
            <div className="text-center py-12 space-y-4">
              <span className="text-6xl block">⏳</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                ¿Listo para el Desafío de Clasificación Rápida?
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Tendrás 15 segundos por integral para elegir el método correcto. Respuestas rápidas otorgan puntos de bonificación.
              </p>
              <button
                onClick={startSpeedGame}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                Comenzar Reactor
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Timer Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-1 text-slate-500">
                    <Timer className="w-3.5 h-3.5" />
                    <span>Tiempo Restante:</span>
                  </span>
                  <span className={`font-mono text-sm ${speedTimer <= 5 ? 'text-rose-500 animate-ping' : 'text-indigo-500'}`}>
                    {speedTimer}s
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 rounded-full ${
                      speedTimer <= 5 ? 'bg-rose-500' : 'bg-gradient-to-r from-emerald-500 to-indigo-600'
                    }`}
                    style={{ width: `${(speedTimer / 15) * 100}%` }}
                  />
                </div>
              </div>

              {/* Big Integral Display on Radar */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white text-center shadow-inner border border-indigo-500/30 space-y-2">
                <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest block">
                  Identifica la Técnica Óptima:
                </span>
                <div className="text-2xl sm:text-4xl font-extrabold py-2">
                  <MathView math={currentSpeedQ.integralLatex} />
                </div>
              </div>

              {/* 4 Method Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentSpeedQ.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSpeedAnswer(opt)}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white font-bold text-sm transition-all duration-150 hover:scale-[1.02] shadow-sm text-slate-800 dark:text-slate-200"
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* Explanation / Hint Box */}
              {speedExplanation && (
                <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-xs sm:text-sm text-indigo-900 dark:text-indigo-200 animate-in fade-in">
                  <strong>Explicación:</strong> {speedExplanation}
                </div>
              )}
            </div>
          )}

        </div>
      )}

      {/* ========================================================
          JUEGO 3: ROMPECABEZAS DE PASOS MATEMÁTICOS
         ======================================================== */}
      {selectedGame === 3 && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl max-w-4xl mx-auto">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>🧩 Rompecabezas de Pasos Matemáticos</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Los pasos de esta demostración están desordenados. Usa los botones de subir/bajar para ordenarlos cronológicamente.
              </p>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setPuzzleIndex(prev => prev + 1);
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-slate-200"
            >
              Siguiente Problema
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-center space-y-1">
            <span className="text-xs font-bold text-indigo-500 dark:text-indigo-400 uppercase">
              Problema a Ordenar:
            </span>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
              {currentPuzzle.title}
            </h3>
          </div>

          {/* Draggable / Movable Steps List */}
          <div className="space-y-3">
            {puzzleSteps.map((step, idx) => (
              <div
                key={step.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-black text-sm flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {step.text}
                    </p>
                    {step.math && (
                      <div className="pt-1">
                        <MathView math={step.math} block={true} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    disabled={idx === 0}
                    onClick={() => moveStep(idx, 'up')}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-200"
                    title="Subir paso"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    disabled={idx === puzzleSteps.length - 1}
                    onClick={() => moveStep(idx, 'down')}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-200"
                    title="Bajar paso"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={verifyPuzzleOrder}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Verificar Orden Lógico (+100 XP)</span>
            </button>

            {puzzleSolved && (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 animate-in fade-in">
                <Sparkles className="w-4 h-4" />
                <span>{currentPuzzle.finalNote}</span>
              </span>
            )}
          </div>

        </div>
      )}

      {/* ========================================================
          JUEGO 4: BATALLA DE RIEMANN (BOSS ROGUELIKE)
         ======================================================== */}
      {selectedGame === 4 && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl max-w-4xl mx-auto">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>⚔️ Batalla de Riemann: Los 4 Guardianes del Cálculo</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Responde correctamente para infligir daño al jefe. Si fallas, perderás vidas. ¡Usa tus comodines sabiamente!
              </p>
            </div>

            <button
              onClick={restartBossBattle}
              className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar Aventura</span>
            </button>
          </div>

          {/* Victory Modal with Diploma */}
          {bossVictory ? (
            <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-amber-500/20 via-indigo-950 to-slate-950 border border-amber-400 text-white space-y-4 animate-in zoom-in-95">
              <span className="text-6xl block animate-bounce">🏆</span>
              <h3 className="text-2xl sm:text-3xl font-black text-amber-300">
                ¡HAS DERROTADO A LOS 4 GUARDIANES DEL CÁLCULO!
              </h3>
              <p className="text-sm text-slate-200 max-w-md mx-auto">
                Has demostrado dominio absoluto sobre el Teorema Fundamental, Métodos Analíticos, Aplicaciones Físicas y Series Infinitas.
              </p>

              <div className="max-w-md mx-auto p-6 rounded-2xl bg-white text-slate-900 shadow-2xl border-4 border-amber-400 space-y-3">
                <span className="text-xs uppercase font-extrabold tracking-widest text-slate-500 block">
                  TECNOLÓGICO NACIONAL DE MÉXICO
                </span>
                <h4 className="text-xl font-black text-indigo-900">
                  DIPLOMA DE EXCELENCIA EN CÁLCULO INTEGRAL
                </h4>
                <p className="text-xs text-slate-600">
                  Otorgado a:
                </p>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full text-center font-bold text-lg border-b-2 border-indigo-500 focus:outline-none pb-1"
                />
                <p className="text-[11px] text-slate-500 italic">
                  Aprobado por: Ing. Graciela Herrera Vázquez (Asignatura ACF-0902)
                </p>
              </div>

              <button
                onClick={restartBossBattle}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-lg"
              >
                Jugar de Nuevo
              </button>
            </div>
          ) : bossGameOver ? (
            <div className="text-center p-8 rounded-3xl bg-rose-950/40 border border-rose-800 text-white space-y-4">
              <span className="text-6xl block">💀</span>
              <h3 className="text-2xl font-black text-rose-400">
                ¡Te has quedado sin vidas!
              </h3>
              <p className="text-sm text-slate-300">
                Repasa el temario de apuntes de Miss Graciela y vuelve a intentarlo.
              </p>
              <button
                onClick={restartBossBattle}
                className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow"
              >
                Reintentar Batalla
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Boss Status Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{currentBoss.avatar}</span>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-indigo-400 block tracking-widest">
                      Jefe {bossLevelIdx + 1} de 4 • {currentBoss.unit}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black">
                      {currentBoss.name}
                    </h3>
                    <p className="text-xs text-slate-300 italic">
                      "{currentBoss.dialogue}"
                    </p>
                  </div>
                </div>

                {/* Boss HP Bar */}
                <div className="w-full sm:w-56 space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-rose-400">Salud del Jefe:</span>
                    <span className="font-mono">{bossHp} / 100 HP</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-rose-500 to-red-600 transition-all duration-300 rounded-full"
                      style={{ width: `${bossHp}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Lifelines Bar */}
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs">
                <span className="font-bold text-slate-600 dark:text-slate-400 hidden sm:inline">
                  Comodines de Miss Graciela:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    disabled={used5050}
                    onClick={use5050}
                    className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold disabled:opacity-40 hover:bg-slate-50"
                  >
                    ✂️ 50 / 50
                  </button>

                  <button
                    onClick={() => {
                      sound.playHint();
                      alert(`Pista de Miss Graciela: ${currentBossQ.hint}`);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 font-bold"
                  >
                    💡 Pista Dorada
                  </button>

                  <button
                    disabled={shieldActive}
                    onClick={() => {
                      sound.playHint();
                      setShieldActive(true);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950 border border-cyan-300 dark:border-cyan-700 text-cyan-700 dark:text-cyan-300 font-bold"
                  >
                    🛡️ Escudo {shieldActive ? '(Activo)' : ''}
                  </button>
                </div>
              </div>

              {/* Question Card */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <h4 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                  {currentBossQ.question}
                </h4>

                {currentBossQ.math && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-center my-2">
                    <MathView math={currentBossQ.math} block={true} />
                  </div>
                )}

                {/* 4 Choices */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {currentBossQ.options.map((opt, idx) => {
                    if (active5050Options.length > 0 && !active5050Options.includes(idx)) {
                      return (
                        <div key={idx} className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 opacity-20 text-center text-xs">
                          Eliminado por 50/50
                        </div>
                      );
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleBossAnswer(idx)}
                        className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white text-left font-semibold text-xs sm:text-sm transition-all shadow-sm hover:scale-[1.02] text-slate-800 dark:text-slate-200"
                      >
                        <span className="font-bold mr-2 text-indigo-500 dark:text-indigo-400">
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* ========================================================
          JUEGO 5: INVASORES DEL CÁLCULO (SPACE ARCADE)
         ======================================================== */}
      {selectedGame === 5 && (
        <SpaceDefendersGame setXp={setXp} />
      )}

    </div>
  );
};
