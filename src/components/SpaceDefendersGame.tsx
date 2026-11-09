import React, { useState, useEffect, useRef } from 'react';
import { SPACE_DEFENDER_QUESTIONS } from '../data/gamesData';
import { SpaceDefenderQuestion } from '../types';
import { MathView } from './MathView';
import { 
  Shield, 
  Flame, 
  Trophy, 
  RotateCcw, 
  Zap, 
  Play, 
  Award,
  Sparkles,
  HelpCircle,
  Crosshair
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';

interface SpaceDefendersGameProps {
  setXp: (val: number | ((prev: number) => number)) => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  radius: number;
  alpha: number;
  decay: number;
}

interface Laser {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  alpha: number;
  color: string;
}

export const SpaceDefendersGame: React.FC<SpaceDefendersGameProps> = ({ setXp }) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover' | 'victory'>('menu');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [shields, setShields] = useState<number>(3);
  const [screenShake, setScreenShake] = useState<boolean>(false);
  const [highScore, setHighScore] = useState<number>(() => {
    return Number(localStorage.getItem('tecnm_arcade_highscore') || 0);
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Meteor position in Canvas (0 to 1 range for normalized coords)
  const meteorYRef = useRef<number>(60);
  const particlesRef = useRef<Particle[]>([]);
  const laserRef = useRef<Laser | null>(null);

  const currentQ: SpaceDefenderQuestion = SPACE_DEFENDER_QUESTIONS[currentIndex % SPACE_DEFENDER_QUESTIONS.length];

  // Start / Restart Game
  const startGame = () => {
    sound.playClick();
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setShields(3);
    meteorYRef.current = 60;
    particlesRef.current = [];
    laserRef.current = null;
    setGameState('playing');
  };

  // Keyboard controls listener (Keys 1, 2, 3, 4)
  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4'].includes(e.key)) {
        const optionIndex = parseInt(e.key, 10) - 1;
        handleFireWeapon(optionIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, currentIndex, currentQ, streak, score, shields]);

  // Handle firing laser at target
  const handleFireWeapon = (selectedOptionIndex: number) => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    const w = canvas ? canvas.width : 640;
    const h = canvas ? canvas.height : 360;

    const meteorX = w / 2;
    const meteorY = meteorYRef.current;
    const cannonX = w / 2;
    const cannonY = h - 25;

    if (selectedOptionIndex === currentQ.correctIndex) {
      // CORRECT ANSWER!
      sound.playLaser();
      setTimeout(() => sound.playExplosion(), 80);

      // Create laser
      laserRef.current = {
        startX: cannonX,
        startY: cannonY,
        targetX: meteorX,
        targetY: meteorY,
        alpha: 1.0,
        color: '#38bdf8'
      };

      // Spawn 35 explosion particles
      const colors = ['#f59e0b', '#ef4444', '#38bdf8', '#fbbf24', '#ffffff'];
      for (let i = 0; i < 35; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 5;
        particlesRef.current.push({
          x: meteorX,
          y: meteorY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          radius: 2 + Math.random() * 3.5,
          alpha: 1.0,
          decay: 0.02 + Math.random() * 0.03
        });
      }

      // Combo & scoring
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak >= 2) {
        sound.playCombo();
      }

      const pointsEarned = currentQ.points * (1 + newStreak * 0.5);
      const newScore = score + Math.round(pointsEarned);
      setScore(newScore);
      setXp(x => x + 25);

      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('tecnm_arcade_highscore', newScore.toString());
      }

      // Check for Victory
      if (currentIndex + 1 >= SPACE_DEFENDER_QUESTIONS.length) {
        sound.playVictory();
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
        setGameState('victory');
        return;
      }

      // Advance to next question after small pause
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        meteorYRef.current = 60;
      }, 400);

    } else {
      // WRONG ANSWER!
      sound.playWrong();
      setStreak(0);
      setScreenShake(true);
      setTimeout(() => setScreenShake(false), 350);

      const nextShields = shields - 1;
      setShields(nextShields);

      if (nextShields <= 0) {
        setGameState('gameover');
      }
    }
  };

  // Main Canvas Render & Animation Loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      const w = canvas.width;
      const h = canvas.height;

      // 1. Move meteor down slowly
      // Speed increases slightly with waves
      const speed = 18 + currentQ.wave * 4;
      meteorYRef.current += speed * dt;

      // Meteor breach check: if reaches bottom shield (h - 55)
      if (meteorYRef.current >= h - 55) {
        sound.playWrong();
        setStreak(0);
        setScreenShake(true);
        setTimeout(() => setScreenShake(false), 350);

        setShields(prev => {
          const updated = prev - 1;
          if (updated <= 0) {
            setGameState('gameover');
          }
          return updated;
        });

        // Reset meteor to top with next question
        meteorYRef.current = 60;
        setCurrentIndex(c => (c + 1) % SPACE_DEFENDER_QUESTIONS.length);
      }

      // 2. Clear canvas
      ctx.clearRect(0, 0, w, h);

      // Deep Space background
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, w, h);

      // Starfield parallax
      ctx.fillStyle = '#ffffff';
      for (let s = 0; s < 50; s++) {
        const starX = (s * 41) % w;
        const starY = (s * 59 + (time * 0.03 * (s % 3 + 1))) % h;
        const size = (s % 4 === 0) ? 2 : 1;
        ctx.globalAlpha = 0.4 + 0.4 * Math.sin(time * 0.005 + s);
        ctx.fillRect(starX, starY, size, size);
      }
      ctx.globalAlpha = 1.0;

      // 3. Draw Planetary Defense Shield at bottom
      const shieldY = h - 35;
      const shieldGlow = ctx.createLinearGradient(0, shieldY, 0, h);
      shieldGlow.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
      shieldGlow.addColorStop(0.5, 'rgba(14, 165, 233, 0.15)');
      shieldGlow.addColorStop(1, 'rgba(2, 132, 199, 0)');
      ctx.fillStyle = shieldGlow;
      ctx.fillRect(0, shieldY, w, h - shieldY);

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, shieldY);
      ctx.lineTo(w, shieldY);
      ctx.stroke();

      // 4. Draw Turret / Cannon at bottom center
      const cannonX = w / 2;
      const cannonY = h - 25;

      ctx.save();
      // Cannon Base
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cannonX, cannonY, 22, Math.PI, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Barrel pointing at meteor
      const angle = Math.atan2(meteorYRef.current - cannonY, (w / 2) - cannonX);
      ctx.translate(cannonX, cannonY - 5);
      ctx.rotate(angle + Math.PI / 2);

      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(-4, -18, 8, 18);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(-2, -22, 4, 6);
      ctx.restore();

      // 5. Draw Laser beam if active
      if (laserRef.current) {
        ctx.save();
        ctx.strokeStyle = laserRef.current.color;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 15;
        ctx.lineWidth = 4 * laserRef.current.alpha;
        ctx.beginPath();
        ctx.moveTo(laserRef.current.startX, laserRef.current.startY);
        ctx.lineTo(laserRef.current.targetX, laserRef.current.targetY);
        ctx.stroke();

        laserRef.current.alpha -= dt * 4;
        if (laserRef.current.alpha <= 0) {
          laserRef.current = null;
        }
        ctx.restore();
      }

      // 6. Draw Explosion Particles
      if (particlesRef.current.length > 0) {
        ctx.save();
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            particlesRef.current.splice(i, 1);
            continue;
          }

          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // 7. Draw Falling Alien Meteor / Mothership
      const my = meteorYRef.current;
      const mx = w / 2;

      ctx.save();
      // Meteor aura / fire tail
      const tailGrad = ctx.createLinearGradient(mx, my - 45, mx, my);
      tailGrad.addColorStop(0, 'rgba(239, 68, 68, 0)');
      tailGrad.addColorStop(0.7, 'rgba(249, 115, 22, 0.4)');
      tailGrad.addColorStop(1, 'rgba(234, 179, 8, 0.8)');
      ctx.fillStyle = tailGrad;
      ctx.beginPath();
      ctx.moveTo(mx - 25, my);
      ctx.lineTo(mx, my - 50);
      ctx.lineTo(mx + 25, my);
      ctx.closePath();
      ctx.fill();

      // Meteor Core (Dark Rock with glowing cracks)
      ctx.fillStyle = '#334155';
      ctx.strokeStyle = '#f97316';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#ea580c';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(mx, my, 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Crosshair on meteor
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(mx, my, 36, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [gameState, currentQ, currentIndex]);

  return (
    <div className={`space-y-6 ${screenShake ? 'animate-shake' : ''}`}>
      
      {/* ========================================================
          MENU STATE
         ======================================================== */}
      {gameState === 'menu' && (
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 text-center max-w-2xl mx-auto shadow-2xl space-y-8 animate-in fade-in duration-300">
          <div className="inline-flex p-4 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 text-indigo-500 animate-float-gentle">
            <Zap className="w-12 h-12 text-cyan-400" />
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              🛸 Invasores del Cálculo
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Defiende la estación orbital de la lluvia de meteoritos alienígenas. Apunta con tu cañón y selecciona la antiderivada correcta antes de que impacten el escudo.
            </p>
          </div>

          {/* Quick instructions & keys */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <span className="block text-indigo-500 font-bold">TECLA [1]</span>
              <span className="text-slate-500">Batería Alfa</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <span className="block text-cyan-500 font-bold">TECLA [2]</span>
              <span className="text-slate-500">Batería Beta</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <span className="block text-purple-500 font-bold">TECLA [3]</span>
              <span className="text-slate-500">Batería Gamma</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <span className="block text-pink-500 font-bold">TECLA [4]</span>
              <span className="text-slate-500">Batería Delta</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={startGame}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-black text-base shadow-xl shadow-cyan-500/25 transition-all transform hover:scale-105 flex items-center justify-center gap-3 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>¡Comenzar Batalla Espacial!</span>
            </button>
          </div>

          {highScore > 0 && (
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-500 bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/30">
              <Trophy className="w-4 h-4" />
              <span>Récord Personal: {highScore} Puntos</span>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          PLAYING STATE
         ======================================================== */}
      {gameState === 'playing' && (
        <div className="space-y-4 max-w-4xl mx-auto animate-in fade-in duration-300">
          
          {/* Top HUD: Shields, Score, Streak, Wave */}
          <div className="glass-panel rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 shadow-lg">
            
            {/* Shields (Lives) */}
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-500" />
              <div className="flex gap-1.5">
                {[1, 2, 3].map(heartId => (
                  <span
                    key={heartId}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                      heartId <= shields
                        ? 'bg-cyan-500 text-white shadow-sm shadow-cyan-500/50'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 opacity-40'
                    }`}
                  >
                    🛡️
                  </span>
                ))}
              </div>
            </div>

            {/* Wave Title */}
            <div className="text-center">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                Fase de Alerta
              </span>
              <span className="text-xs sm:text-sm font-black text-indigo-500 dark:text-indigo-400">
                {currentQ.waveTitle} ({currentIndex + 1} / {SPACE_DEFENDER_QUESTIONS.length})
              </span>
            </div>

            {/* Streak & Score */}
            <div className="flex items-center gap-4">
              {streak >= 2 && (
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-orange-500/20 text-orange-500 border border-orange-500/30 text-xs font-black animate-bounce">
                  <Flame className="w-3.5 h-3.5 fill-orange-500" />
                  <span>{streak}x COMBO!</span>
                </div>
              )}

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Puntos</span>
                <span className="text-lg font-black font-mono text-cyan-600 dark:text-cyan-400">
                  {score}
                </span>
              </div>
            </div>

          </div>

          {/* ARCADE CANVAS CONTAINER */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-cyan-500/40 shadow-2xl bg-black">
            
            <canvas
              ref={canvasRef}
              width={720}
              height={380}
              className="w-full h-auto block"
            />

            {/* Floating Integral Target Header right above the canvas center */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-slate-900/90 border border-orange-500/50 rounded-2xl px-6 py-2.5 shadow-2xl backdrop-blur-md flex items-center gap-3">
              <Crosshair className="w-5 h-5 text-orange-400 animate-spin" />
              <div className="text-base sm:text-xl font-bold text-white">
                <MathView math={currentQ.integralLatex} />
              </div>
            </div>

          </div>

          {/* WEAPONS PLATFORM: 4 CANDIDATE ANTIDERIVATIVES */}
          <div className="space-y-2">
            <div className="text-center text-xs font-bold uppercase tracking-wider text-slate-400">
              Selecciona la Batería Láser con la Solución Correcta (Usa números 1 al 4 o Clic)
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleFireWeapon(idx)}
                  className="group relative flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500 dark:hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/15 transition-all text-left transform active:scale-95 cursor-pointer"
                >
                  <span className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-cyan-500 group-hover:text-white font-mono font-black text-sm flex items-center justify-center shrink-0 transition-colors">
                    {idx + 1}
                  </span>

                  <div className="flex-1 font-mono text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 overflow-x-auto">
                    <MathView math={opt} />
                  </div>

                  <Zap className="w-4 h-4 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </button>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================
          VICTORY STATE
         ======================================================== */}
      {gameState === 'victory' && (
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 text-center max-w-xl mx-auto shadow-2xl space-y-6 animate-in zoom-in-95 duration-300">
          <div className="inline-flex p-4 rounded-3xl bg-amber-500/20 text-amber-500 border border-amber-400/30 animate-bounce">
            <Trophy className="w-16 h-16" />
          </div>

          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            ¡Misión Cumplida, Comandante!
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            Has destruido todos los asteroides matemáticos a lo largo de las 4 oleadas del cálculo integral. La estación orbital está a salvo.
          </p>

          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex justify-around text-center">
            <div>
              <span className="text-xs text-slate-400 block font-bold">Puntuación Final</span>
              <span className="text-2xl font-black font-mono text-cyan-500">{score}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-bold">XP Ganada</span>
              <span className="text-2xl font-black font-mono text-emerald-500">+500 XP</span>
            </div>
          </div>

          <button
            onClick={startGame}
            className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Jugar de Nuevo</span>
          </button>
        </div>
      )}

      {/* ========================================================
          GAME OVER STATE
         ======================================================== */}
      {gameState === 'gameover' && (
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-red-500/30 text-center max-w-md mx-auto shadow-2xl space-y-6 animate-in zoom-in-95 duration-300">
          <div className="inline-flex p-4 rounded-3xl bg-red-500/20 text-red-500 border border-red-400/30">
            <Shield className="w-14 h-14" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Escudos Agotados
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
              Un asteroide superó la barrera defensiva. ¡Repasa las reglas de derivación e inténtalo de nuevo!
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-xs text-slate-400 font-bold block">Puntaje Obtenido</span>
            <span className="text-xl font-black font-mono text-orange-500">{score}</span>
          </div>

          <button
            onClick={startGame}
            className="w-full py-3.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reactivar Escudos y Reintentar</span>
          </button>
        </div>
      )}

    </div>
  );
};
