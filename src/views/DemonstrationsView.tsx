import React, { useState, useEffect, useRef } from 'react';
import { MathView } from '../components/MathView';
import { 
  Sparkles, 
  Play, 
  RotateCcw, 
  Sliders, 
  Maximize2, 
  CheckCircle2, 
  Layers, 
  Eye,
  Info
} from 'lucide-react';
import { sound } from '../utils/sound';

interface DemonstrationsViewProps {
  setXp: (val: number | ((prev: number) => number)) => void;
}

export const DemonstrationsView: React.FC<DemonstrationsViewProps> = ({ setXp }) => {
  const [activeSimulator, setActiveSimulator] = useState<'riemann' | 'solids' | 'tfc'>('riemann');

  // ==========================================
  // RIEMANN SIMULATOR STATE
  // ==========================================
  const functionsList = [
    { id: 'quad', label: 'f(x) = x²', expr: (x: number) => x * x, latex: 'f(x) = x^2', exactInt: (a: number, b: number) => (b**3 - a**3) / 3 },
    { id: 'sin', label: 'f(x) = sin(x) + 1.2', expr: (x: number) => Math.sin(x) + 1.2, latex: 'f(x) = \\sin(x) + 1.2', exactInt: (a: number, b: number) => (-Math.cos(b) + 1.2*b) - (-Math.cos(a) + 1.2*a) },
    { id: 'poly', label: 'f(x) = 4 - x²', expr: (x: number) => Math.max(0, 4 - x*x), latex: 'f(x) = 4 - x^2', exactInt: (a: number, b: number) => (4*b - b**3/3) - (4*a - a**3/3) },
    { id: 'exp', label: 'f(x) = e^(-0.3x)', expr: (x: number) => Math.exp(-0.3 * x), latex: 'f(x) = e^{-0.3x}', exactInt: (a: number, b: number) => (-Math.exp(-0.3*b)/0.3) - (-Math.exp(-0.3*a)/0.3) },
    { id: 'sqrt', label: 'f(x) = 2√x', expr: (x: number) => 2 * Math.sqrt(Math.max(0, x)), latex: 'f(x) = 2\\sqrt{x}', exactInt: (a: number, b: number) => (4/3 * Math.pow(b, 1.5)) - (4/3 * Math.pow(a, 1.5)) }
  ];

  const [selectedFunc, setSelectedFunc] = useState(functionsList[0]);
  const [nIntervals, setNIntervals] = useState<number>(12);
  const [riemannMethod, setRiemannMethod] = useState<'left' | 'right' | 'mid' | 'trap' | 'simpson'>('mid');
  const [intervalA] = useState<number>(0);
  const [intervalB] = useState<number>(3);
  const [isAnimating, setIsAnimating] = useState(false);

  const riemannCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ==========================================
  // SOLIDS OF REVOLUTION STATE
  // ==========================================
  const [solidMethod, setSolidMethod] = useState<'discos' | 'arandelas' | 'cascarones'>('discos');
  const [solidAxis, setSolidAxis] = useState<'x' | 'y'>('x');
  const [rotationAngle, setRotationAngle] = useState(0);
  const [wireframe, setWireframe] = useState(false);
  const solidsCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ==========================================
  // TFC ACCUMULATION SIMULATOR STATE
  // ==========================================
  const [tfcX, setTfcX] = useState<number>(2.0);
  const tfcCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ------------------------------------------
  // RIEMANN CANVAS RENDERING
  // ------------------------------------------
  useEffect(() => {
    if (activeSimulator !== 'riemann') return;
    const canvas = riemannCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Padding & Viewport
    const padX = 50;
    const padY = 40;
    const graphW = width - padX * 2;
    const graphH = height - padY * 2;

    const a = intervalA;
    const b = intervalB;
    const f = selectedFunc.expr;

    // Find yMax
    let yMax = 0;
    for (let x = a; x <= b; x += 0.05) {
      yMax = Math.max(yMax, f(x));
    }
    yMax = Math.max(yMax * 1.25, 4);

    const toCanvasX = (xVal: number) => padX + ((xVal - a) / (b - a)) * graphW;
    const toCanvasY = (yVal: number) => height - padY - (yVal / yMax) * graphH;

    // Draw background grid lines
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const yVal = (yMax / 5) * i;
      const py = toCanvasY(yVal);
      ctx.beginPath();
      ctx.moveTo(padX, py);
      ctx.lineTo(width - padX, py);
      ctx.stroke();

      // Label y
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px Inter, monospace';
      ctx.fillText(yVal.toFixed(1), padX - 25, py + 3);
    }

    // Draw axis lines
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(padX, height - padY);
    ctx.lineTo(width - padX, height - padY);
    ctx.moveTo(padX, padY);
    ctx.lineTo(padX, height - padY);
    ctx.stroke();

    // Draw Riemann Rectangles or Trapezoids
    const dx = (b - a) / nIntervals;

    for (let i = 0; i < nIntervals; i++) {
      const x0 = a + i * dx;
      const x1 = x0 + dx;

      let rectHeight = 0;
      if (riemannMethod === 'left') rectHeight = f(x0);
      else if (riemannMethod === 'right') rectHeight = f(x1);
      else if (riemannMethod === 'mid') rectHeight = f((x0 + x1) / 2);
      else if (riemannMethod === 'trap' || riemannMethod === 'simpson') {
        // Trapezoid rendering
        const y0 = f(x0);
        const y1 = f(x1);
        ctx.fillStyle = i % 2 === 0 ? 'rgba(99, 102, 241, 0.35)' : 'rgba(59, 130, 246, 0.25)';
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(toCanvasX(x0), toCanvasY(0));
        ctx.lineTo(toCanvasX(x0), toCanvasY(y0));
        ctx.lineTo(toCanvasX(x1), toCanvasY(y1));
        ctx.lineTo(toCanvasX(x1), toCanvasY(0));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        continue;
      }

      const px0 = toCanvasX(x0);
      const px1 = toCanvasX(x1);
      const pyTop = toCanvasY(rectHeight);
      const pyBottom = toCanvasY(0);

      // Gradient / Shading for rectangle
      ctx.fillStyle = i % 2 === 0 ? 'rgba(99, 102, 241, 0.4)' : 'rgba(14, 165, 233, 0.35)';
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.85)';
      ctx.lineWidth = 1;

      ctx.fillRect(px0, pyTop, px1 - px0, pyBottom - pyTop);
      ctx.strokeRect(px0, pyTop, px1 - px0, pyBottom - pyTop);

      // Sample point dot
      let sampleX = x0;
      if (riemannMethod === 'right') sampleX = x1;
      else if (riemannMethod === 'mid') sampleX = (x0 + x1) / 2;

      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.arc(toCanvasX(sampleX), toCanvasY(rectHeight), 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw Continuous Function Line on Top
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.shadowColor = 'rgba(16, 185, 129, 0.5)';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    let started = false;
    for (let x = a; x <= b; x += 0.02) {
      const cx = toCanvasX(x);
      const cy = toCanvasY(f(x));
      if (!started) {
        ctx.moveTo(cx, cy);
        started = true;
      } else {
        ctx.lineTo(cx, cy);
      }
    }
    ctx.stroke();
    ctx.shadowBlur = 0; // reset glow

    // Axis labels
    ctx.fillStyle = '#64748b';
    ctx.font = '11px Inter, sans-serif';
    ctx.fillText(`a = ${a}`, toCanvasX(a) - 10, height - padY + 18);
    ctx.fillText(`b = ${b}`, toCanvasX(b) - 10, height - padY + 18);
  }, [selectedFunc, nIntervals, riemannMethod, intervalA, intervalB, activeSimulator]);

  // Compute Riemann approximation value & exact integral
  const calcApprox = () => {
    const a = intervalA;
    const b = intervalB;
    const dx = (b - a) / nIntervals;
    const f = selectedFunc.expr;
    let sum = 0;

    if (riemannMethod === 'left') {
      for (let i = 0; i < nIntervals; i++) sum += f(a + i * dx);
      return sum * dx;
    } else if (riemannMethod === 'right') {
      for (let i = 1; i <= nIntervals; i++) sum += f(a + i * dx);
      return sum * dx;
    } else if (riemannMethod === 'mid') {
      for (let i = 0; i < nIntervals; i++) sum += f(a + (i + 0.5) * dx);
      return sum * dx;
    } else if (riemannMethod === 'trap') {
      sum = (f(a) + f(b)) / 2;
      for (let i = 1; i < nIntervals; i++) sum += f(a + i * dx);
      return sum * dx;
    } else if (riemannMethod === 'simpson') {
      // Simpson 1/3 rule (requires even n, auto-adjusted)
      const nEven = nIntervals % 2 === 0 ? nIntervals : nIntervals + 1;
      const h = (b - a) / nEven;
      sum = f(a) + f(b);
      for (let i = 1; i < nEven; i++) {
        sum += (i % 2 === 1 ? 4 : 2) * f(a + i * h);
      }
      return (h / 3) * sum;
    }
    return 0;
  };

  const exactValue = selectedFunc.exactInt(intervalA, intervalB);
  const approxValue = calcApprox();
  const absError = Math.abs(approxValue - exactValue);
  const percentError = exactValue !== 0 ? (absError / Math.abs(exactValue)) * 100 : 0;

  // Convergence animator loop
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isAnimating) {
      timer = setInterval(() => {
        setNIntervals(prev => {
          if (prev >= 60) {
            setIsAnimating(false);
            sound.playVictory();
            setXp(x => x + 25);
            return 60;
          }
          return prev + 2;
        });
      }, 150);
    }
    return () => clearInterval(timer);
  }, [isAnimating, setXp]);

  // ------------------------------------------
  // 3D SOLIDS ROTATIONAL CANVAS RENDERING
  // ------------------------------------------
  useEffect(() => {
    if (activeSimulator !== 'solids') return;
    const canvas = solidsCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      // Draw center rotation axis
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      if (solidAxis === 'x') {
        ctx.beginPath();
        ctx.moveTo(30, cy);
        ctx.lineTo(w - 30, cy);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(cx, 30);
        ctx.lineTo(cx, h - 30);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Draw rotating 3D slices
      const slices = 16;
      const radiusMax = 70;
      const length = 220;

      for (let i = 0; i < slices; i++) {
        const u = i / (slices - 1);
        const xPos = cx - length / 2 + u * length;
        // Curve profile: y = sqrt(u) * radiusMax
        const r = Math.sqrt(u + 0.1) * radiusMax;
        const innerR = solidMethod === 'arandelas' ? r * 0.45 : 0;

        // Ellipse projection on angle
        const angle = rotationAngle + i * 0.15;
        const scaleY = Math.cos(angle);

        ctx.strokeStyle = `hsl(${(i * 18 + rotationAngle * 20) % 360}, 75%, 60%)`;
        ctx.lineWidth = wireframe ? 1 : 2;

        if (!wireframe) {
          ctx.fillStyle = `hsla(${(i * 18 + rotationAngle * 20) % 360}, 70%, 50%, 0.15)`;
        }

        ctx.beginPath();
        ctx.ellipse(xPos, cy, r * 0.35, Math.abs(r * scaleY), 0, 0, Math.PI * 2);
        if (!wireframe) ctx.fill();
        ctx.stroke();

        // Inner hole for washers
        if (solidMethod === 'arandelas') {
          ctx.beginPath();
          ctx.ellipse(xPos, cy, innerR * 0.35, Math.abs(innerR * scaleY), 0, 0, Math.PI * 2);
          ctx.strokeStyle = '#ef4444';
          ctx.stroke();
        }
      }

      setRotationAngle(prev => prev + 0.025);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [activeSimulator, solidMethod, solidAxis, wireframe]);

  // ------------------------------------------
  // TFC ACCUMULATION RENDERING
  // ------------------------------------------
  useEffect(() => {
    if (activeSimulator !== 'tfc') return;
    const canvas = tfcCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const pad = 40;
    const gw = w - pad * 2;
    const gh = h - pad * 2;

    const f = (t: number) => 0.5 * t * t + 0.5;
    const maxT = 4;
    const maxY = 9;

    const toX = (t: number) => pad + (t / maxT) * gw;
    const toY = (y: number) => h - pad - (y / maxY) * gh;

    // Draw shaded area from 0 to tfcX
    ctx.fillStyle = 'rgba(99, 102, 241, 0.35)';
    ctx.beginPath();
    ctx.moveTo(toX(0), toY(0));
    for (let t = 0; t <= tfcX; t += 0.05) {
      ctx.lineTo(toX(t), toY(f(t)));
    }
    ctx.lineTo(toX(tfcX), toY(0));
    ctx.closePath();
    ctx.fill();

    // Draw curve
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let t = 0; t <= maxT; t += 0.05) {
      const cx = toX(t);
      const cy = toY(f(t));
      if (t === 0) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    }
    ctx.stroke();

    // Draw vertical moving bar at tfcX
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(toX(tfcX), toY(0));
    ctx.lineTo(toX(tfcX), toY(f(tfcX)));
    ctx.stroke();

    // Dot at current height f(x)
    ctx.fillStyle = '#ec4899';
    ctx.beginPath();
    ctx.arc(toX(tfcX), toY(f(tfcX)), 5, 0, Math.PI * 2);
    ctx.fill();

    // Axes
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(pad, h - pad);
    ctx.lineTo(w - pad, h - pad);
    ctx.moveTo(pad, pad);
    ctx.lineTo(pad, h - pad);
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#64748b';
    ctx.font = '11px Inter';
    ctx.fillText(`x = ${tfcX.toFixed(2)}`, toX(tfcX) - 15, h - pad + 18);
    ctx.fillText(`f(x) = ${f(tfcX).toFixed(2)}`, toX(tfcX) + 8, toY(f(tfcX)) - 5);
  }, [activeSimulator, tfcX]);

  return (
    <div className="space-y-10 pb-16">
      
      {/* ========================================================
          SIMULATOR TABS HEADER
         ======================================================== */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-4 h-4" />
              <span>Laboratorio de Animación Matemática</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Simuladores Visuales e Interactivos
            </h1>
          </div>

          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
            Renderizado HTML5 Canvas en Tiempo Real
          </span>
        </div>

        {/* Simulator Selector Switcher */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-max">
          <button
            onClick={() => { sound.playClick(); setActiveSimulator('riemann'); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSimulator === 'riemann'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            1. Sumas de Riemann & Simpson
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveSimulator('solids'); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSimulator === 'solids'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            2. Sólidos de Revolución 3D
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveSimulator('tfc'); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSimulator === 'tfc'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            3. Acumulación TFC: g'(x) = f(x)
          </button>
        </div>
      </div>

      {/* ========================================================
          SIMULATOR 1: SUMAS DE RIEMANN
         ======================================================== */}
      {activeSimulator === 'riemann' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Canvas Box (7 cols) */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
                Lienzo de Partición Continua [a, b]
              </span>
              <span className="text-xs font-mono font-bold text-slate-500">
                Δx = {((intervalB - intervalA) / nIntervals).toFixed(4)}
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden bg-slate-950 p-2 shadow-inner flex items-center justify-center">
              <canvas
                ref={riemannCanvasRef}
                width={620}
                height={360}
                className="w-full max-w-full h-auto rounded-xl"
              />
            </div>

            {/* Readout calculations bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-2">
              <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800">
                <span className="text-[10px] text-indigo-500 dark:text-indigo-400 font-bold uppercase block">
                  Suma Aprox S_n
                </span>
                <span className="text-sm sm:text-base font-black text-indigo-700 dark:text-indigo-300 font-mono">
                  {approxValue.toFixed(4)}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase block">
                  Exacta (Barrow)
                </span>
                <span className="text-sm sm:text-base font-black text-emerald-700 dark:text-emerald-300 font-mono">
                  {exactValue.toFixed(4)}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800">
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase block">
                  Error Absoluto
                </span>
                <span className="text-sm sm:text-base font-black text-amber-700 dark:text-amber-300 font-mono">
                  {absError.toFixed(5)}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-pink-50 dark:bg-pink-950/60 border border-pink-200 dark:border-pink-800">
                <span className="text-[10px] text-pink-600 dark:text-pink-400 font-bold uppercase block">
                  Error Relativo
                </span>
                <span className="text-sm sm:text-base font-black text-pink-700 dark:text-pink-300 font-mono">
                  {percentError.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Controls (5 cols) */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-indigo-500" />
              <span>Controles del Simulador</span>
            </h3>

            {/* Function picker */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Selecciona la Función f(x):
              </label>
              <div className="grid grid-cols-1 gap-1.5">
                {functionsList.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => { sound.playClick(); setSelectedFunc(f); }}
                    className={`px-3 py-2 rounded-xl text-left text-xs font-semibold border transition-all ${
                      selectedFunc.id === f.id
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <MathView math={f.latex} />
                  </button>
                ))}
              </div>
            </div>

            {/* Method picker */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Método de Aproximación:
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'left', label: 'Izquierdo (Ln)' },
                  { id: 'right', label: 'Derecho (Rn)' },
                  { id: 'mid', label: 'Punto Medio (Mn)' },
                  { id: 'trap', label: 'Trapecios (Tn)' },
                  { id: 'simpson', label: 'Simpson 1/3 (Sn)' }
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => { sound.playClick(); setRiemannMethod(m.id as any); }}
                    className={`px-2.5 py-2 rounded-xl text-xs font-bold border text-center transition-all ${
                      riemannMethod === m.id
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider for n */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Número de Rectángulos (n):</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400 text-sm">
                  {nIntervals}
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={80}
                step={2}
                value={nIntervals}
                onChange={(e) => setNIntervals(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>n = 2 (Burdo)</span>
                <span>n = 40</span>
                <span>n = 80 (Límite Continuo)</span>
              </div>
            </div>

            {/* Auto animation button */}
            <button
              onClick={() => {
                sound.playClick();
                setNIntervals(4);
                setIsAnimating(true);
              }}
              disabled={isAnimating}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>{isAnimating ? 'Animando Partición...' : 'Animar Refinamiento al Límite (+25 XP)'}</span>
            </button>
          </div>

        </div>
      )}

      {/* ========================================================
          SIMULATOR 2: SÓLIDOS DE REVOLUCIÓN 3D
         ======================================================== */}
      {activeSimulator === 'solids' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-500 dark:text-purple-400">
                Generador de Superficie de Revolución 3D
              </span>
              <span className="text-xs font-mono text-slate-500">
                Eje de Giro: {solidAxis.toUpperCase()}
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden bg-slate-950 p-2 shadow-inner flex items-center justify-center">
              <canvas
                ref={solidsCanvasRef}
                width={620}
                height={360}
                className="w-full max-w-full h-auto rounded-xl"
              />
            </div>

            <p className="text-center text-xs text-slate-500 dark:text-slate-400 italic">
              Rotación continua del sólido curvilíneo seccionado en rodajas diferenciales dV.
            </p>
          </div>

          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-500" />
              <span>Parámetros del Sólido</span>
            </h3>

            {/* Method choice */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Método de Generación:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'discos', label: 'Discos' },
                  { id: 'arandelas', label: 'Arandelas' },
                  { id: 'cascarones', label: 'Cascarones' }
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => { sound.playClick(); setSolidMethod(m.id as any); }}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      solidMethod === m.id
                        ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Wireframe toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Vista de Malla (Wireframe)
              </span>
              <button
                onClick={() => { sound.playClick(); setWireframe(!wireframe); }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  wireframe ? 'bg-purple-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {wireframe ? 'Activado' : 'Desactivado'}
              </button>
            </div>

            {/* Method theoretical formula card */}
            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs space-y-2">
              <div className="font-bold text-purple-800 dark:text-purple-300 flex items-center gap-1.5">
                <Info className="w-4 h-4" />
                <span>Ecuación Diferencial del Método:</span>
              </div>
              <div className="p-2 rounded bg-white dark:bg-slate-900 text-center">
                {solidMethod === 'discos' && <MathView math="V = \pi \int_{a}^{b} [R(x)]^2 \, dx" block={true} />}
                {solidMethod === 'arandelas' && <MathView math="V = \pi \int_{a}^{b} ([R(x)]^2 - [r(x)]^2) \, dx" block={true} />}
                {solidMethod === 'cascarones' && <MathView math="V = 2\pi \int_{a}^{b} p(x) h(x) \, dx" block={true} />}
              </div>
              <p className="text-purple-900/80 dark:text-purple-200/80 leading-relaxed text-[11px]">
                {solidMethod === 'discos' && 'Sección circular maciza perpendicular al eje de giro.'}
                {solidMethod === 'arandelas' && 'Sección anular hueca con radio exterior R(x) e interior r(x).'}
                {solidMethod === 'cascarones' && 'Cilindros concéntricos paralelos al eje de rotación con radio medio p(x).'}
              </p>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================
          SIMULATOR 3: ACUMULACIÓN TFC
         ======================================================== */}
      {activeSimulator === 'tfc' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-500 dark:text-pink-400">
                Visualizador del TFC 1: g(x) = ∫₀ˣ f(t) dt
              </span>
              <span className="text-xs font-mono font-bold text-slate-500">
                x = {tfcX.toFixed(2)}
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden bg-slate-950 p-2 shadow-inner flex items-center justify-center">
              <canvas
                ref={tfcCanvasRef}
                width={620}
                height={360}
                className="w-full max-w-full h-auto rounded-xl"
              />
            </div>

            <p className="text-center text-xs text-slate-500 dark:text-slate-400 italic">
              La tasa de crecimiento del área sombreada g'(x) coincide con la altura de la función f(x).
            </p>
          </div>

          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-pink-500" />
              <span>Demostración en Tiempo Real</span>
            </h3>

            {/* Slider for x */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Límite Superior Variable (x):</span>
                <span className="font-mono text-pink-500 text-sm">{tfcX.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={0.2}
                max={3.8}
                step={0.05}
                value={tfcX}
                onChange={(e) => setTfcX(Number(e.target.value))}
                className="w-full accent-pink-500 cursor-pointer"
              />
            </div>

            {/* Quantitative readout */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-800">
                <span className="text-[11px] font-bold text-pink-700 dark:text-pink-300 block">
                  1. Altura Instantánea f(x):
                </span>
                <div className="text-base font-black text-pink-600 dark:text-pink-400 font-mono">
                  {(0.5 * tfcX * tfcX + 0.5).toFixed(4)}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300 block">
                  2. Derivada de la Acumulación g'(x):
                </span>
                <div className="text-base font-black text-indigo-600 dark:text-indigo-400 font-mono">
                  {(0.5 * tfcX * tfcX + 0.5).toFixed(4)}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                ¡Observa que ambos valores son exactamente idénticos para todo x! Esto demuestra formalmente el{' '}
                <strong>Teorema Fundamental del Cálculo</strong>: derivar la acumulación restaura la función original.
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
