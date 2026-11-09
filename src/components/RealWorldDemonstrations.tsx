import React, { useState, useEffect, useRef } from 'react';
import { MathView } from './MathView';
import { 
  Rocket, 
  Droplets, 
  Anchor, 
  Activity, 
  Play, 
  RotateCcw, 
  Pause, 
  Sparkles, 
  CheckCircle2, 
  Sliders, 
  Info,
  Flame,
  Gauge
} from 'lucide-react';
import { sound } from '../utils/sound';

interface RealWorldDemonstrationsProps {
  setXp: (val: number | ((prev: number) => number)) => void;
}

export const RealWorldDemonstrations: React.FC<RealWorldDemonstrationsProps> = ({ setXp }) => {
  const [selectedCase, setSelectedCase] = useState<'rocket' | 'tank' | 'bridge' | 'pharma'>('rocket');

  // ==========================================
  // CASO 1: COHETE ESPACIAL (CINEMÁTICA REAL)
  // ==========================================
  const [rocketThrust, setRocketThrust] = useState<number>(35); // kN
  const [rocketFuel, setRocketFuel] = useState<number>(100); // %
  const [rocketPlanet, setRocketPlanet] = useState<'earth' | 'moon' | 'mars'>('earth');
  const [rocketRunning, setRocketRunning] = useState<boolean>(false);
  const [rocketTime, setRocketTime] = useState<number>(0);
  const [rocketAlt, setRocketAlt] = useState<number>(0);
  const [rocketVel, setRocketVel] = useState<number>(0);
  const rocketCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const rocketAnimFrameRef = useRef<number | null>(null);

  const gravities = { earth: 9.81, moon: 1.62, mars: 3.71 };
  const currentG = gravities[rocketPlanet];

  // ==========================================
  // CASO 2: DRENADO DE TANQUE (TORRICELLI)
  // ==========================================
  const [tankShape, setTankShape] = useState<'cylinder' | 'cone'>('cylinder');
  const [tankHeight, setTankHeight] = useState<number>(4); // metros
  const [tankRadius, setTankRadius] = useState<number>(2); // metros
  const [holeRadius, setHoleRadius] = useState<number>(0.08); // metros (8 cm)
  const [tankWaterLevel, setTankWaterLevel] = useState<number>(4); // m
  const [tankDraining, setTankDraining] = useState<boolean>(false);
  const tankCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const tankAnimFrameRef = useRef<number | null>(null);

  // ==========================================
  // CASO 3: PUENTE COLGANTE Y CATENARIA
  // ==========================================
  const [spanLength, setSpanLength] = useState<number>(120); // metros entre torres
  const [tensionParamA, setTensionParamA] = useState<number>(60); // parámetro de catenaria a = T0 / w
  const bridgeCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ==========================================
  // CASO 4: FARMACOCINÉTICA (ÁREA BAJO LA CURVA - AUC)
  // ==========================================
  const [doseMg, setDoseMg] = useState<number>(500); // mg
  const [eliminationRate, setEliminationRate] = useState<number>(0.15); // h^-1
  const [absorptionRate, setAbsorptionRate] = useState<number>(0.8); // h^-1
  const pharmaCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ------------------------------------------
  // ROCKET ANIMATION LOOP
  // ------------------------------------------
  useEffect(() => {
    if (selectedCase !== 'rocket') return;
    const canvas = rocketCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localAlt = rocketAlt;
    let localVel = rocketVel;
    let localFuel = rocketFuel;
    let localTime = rocketTime;
    let lastTimestamp = performance.now();

    const renderRocket = (now: number) => {
      const dt = Math.min((now - lastTimestamp) / 1000, 0.05);
      lastTimestamp = now;

      if (rocketRunning) {
        if (localFuel > 0) {
          const burnRate = 8; // % per sec
          localFuel = Math.max(0, localFuel - burnRate * dt);
          setRocketFuel(localFuel);

          // a(t) = F_thrust / m - g
          const mass = 1500 + (localFuel / 100) * 1500; // kg
          const thrustN = rocketThrust * 1000;
          const accel = (thrustN / mass) - currentG;

          localVel += accel * dt;
          localAlt = Math.max(0, localAlt + localVel * dt);

          if (localAlt === 0 && localVel < 0) {
            localVel = 0;
          }
          localTime += dt;
          setRocketTime(localTime);
          setRocketAlt(localAlt);
          setRocketVel(localVel);
        } else {
          // Fuel exhausted: gravity decelerates
          localVel -= currentG * dt;
          localAlt = Math.max(0, localAlt + localVel * dt);
          if (localAlt <= 0) {
            localAlt = 0;
            localVel = 0;
            setRocketRunning(false);
          }
          localTime += dt;
          setRocketTime(localTime);
          setRocketAlt(localAlt);
          setRocketVel(localVel);
        }
      }

      // DRAW CANVAS
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Deep sky gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      const skyAlpha = Math.max(0, 1 - localAlt / 800);
      skyGrad.addColorStop(0, `rgba(15, 23, 42, ${1})`);
      skyGrad.addColorStop(0.7, `rgba(30, 41, 59, ${0.8 + 0.2 * skyAlpha})`);
      skyGrad.addColorStop(1, `rgba(51, 65, 85, ${0.9 * skyAlpha})`);
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Distant Stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      for (let i = 0; i < 40; i++) {
        const starX = (i * 37) % w;
        const starY = ((i * 53) + (localAlt * 0.1)) % (h - 60);
        ctx.fillRect(starX, starY, (i % 3 === 0 ? 2 : 1), (i % 3 === 0 ? 2 : 1));
      }

      // Ground plane
      const groundY = h - 40 + Math.min(localAlt * 0.5, 40);
      ctx.fillStyle = rocketPlanet === 'earth' ? '#15803d' : (rocketPlanet === 'mars' ? '#b45309' : '#64748b');
      ctx.fillRect(0, groundY, w, h - groundY);

      // Launchpad
      ctx.fillStyle = '#475569';
      ctx.fillRect(w / 2 - 30, groundY - 8, 60, 8);

      // Rocket position on canvas
      const rocketScreenY = Math.max(60, groundY - 20 - localAlt * 0.6);
      const rx = w / 2;

      // Rocket Fire Plume (if running & fuel > 0)
      if (rocketRunning && localFuel > 0) {
        ctx.save();
        const flicker = Math.random() * 8;
        const plumeGrad = ctx.createLinearGradient(rx, rocketScreenY + 28, rx, rocketScreenY + 65 + flicker);
        plumeGrad.addColorStop(0, '#fef08a');
        plumeGrad.addColorStop(0.3, '#f97316');
        plumeGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
        ctx.fillStyle = plumeGrad;

        ctx.beginPath();
        ctx.moveTo(rx - 8, rocketScreenY + 28);
        ctx.lineTo(rx + 8, rocketScreenY + 28);
        ctx.lineTo(rx, rocketScreenY + 65 + flicker);
        ctx.closePath();
        ctx.fill();

        // Particle sparks
        for (let p = 0; p < 6; p++) {
          ctx.fillStyle = Math.random() > 0.5 ? '#fbbf24' : '#ef4444';
          ctx.beginPath();
          ctx.arc(rx + (Math.random() - 0.5) * 16, rocketScreenY + 35 + Math.random() * 30, 2 + Math.random() * 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // Draw Rocket Body
      ctx.save();
      // Nosecone
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(rx, rocketScreenY - 25);
      ctx.lineTo(rx - 10, rocketScreenY);
      ctx.lineTo(rx + 10, rocketScreenY);
      ctx.closePath();
      ctx.fill();

      // Fuselage
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(rx - 10, rocketScreenY, 20, 28);

      // Window
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.arc(rx, rocketScreenY + 10, 4, 0, Math.PI * 2);
      ctx.fill();

      // Fins
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(rx - 10, rocketScreenY + 15);
      ctx.lineTo(rx - 18, rocketScreenY + 28);
      ctx.lineTo(rx - 10, rocketScreenY + 28);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(rx + 10, rocketScreenY + 15);
      ctx.lineTo(rx + 18, rocketScreenY + 28);
      ctx.lineTo(rx + 10, rocketScreenY + 28);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Live Telemetry HUD on Canvas
      ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
      ctx.fillRect(15, 15, 190, 85);
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
      ctx.lineWidth = 1;
      ctx.strokeRect(15, 15, 190, 85);

      ctx.font = '11px monospace';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(`TIEMPO (t) : ${localTime.toFixed(1)} s`, 25, 33);
      ctx.fillStyle = '#4ade80';
      ctx.fillText(`VELOCIDAD  : ${localVel.toFixed(1)} m/s`, 25, 51);
      ctx.fillStyle = '#f43f5e';
      ctx.fillText(`ALTITUD y(t): ${localAlt.toFixed(1)} m`, 25, 69);
      ctx.fillStyle = '#fbbf24';
      ctx.fillText(`COMBUSTIBLE: ${localFuel.toFixed(0)} %`, 25, 87);

      rocketAnimFrameRef.current = requestAnimationFrame(renderRocket);
    };

    rocketAnimFrameRef.current = requestAnimationFrame(renderRocket);

    return () => {
      if (rocketAnimFrameRef.current) {
        cancelAnimationFrame(rocketAnimFrameRef.current);
      }
    };
  }, [selectedCase, rocketRunning, rocketThrust, currentG, rocketPlanet]);

  // ------------------------------------------
  // TANK TORRICELLI ANIMATION LOOP
  // ------------------------------------------
  useEffect(() => {
    if (selectedCase !== 'tank') return;
    const canvas = tankCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localLevel = tankWaterLevel;
    let lastTime = performance.now();

    const renderTank = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (tankDraining && localLevel > 0.02) {
        // Torricelli equation: dh/dt = - (a_hole / A_tank(y)) * sqrt(2 g y)
        const g = 9.81;
        const aHole = Math.PI * (holeRadius * holeRadius);
        let aTank = Math.PI * (tankRadius * tankRadius);
        if (tankShape === 'cone') {
          // radius at current height: r(y) = (R / H) * y
          const rY = Math.max(0.1, (tankRadius / tankHeight) * localLevel);
          aTank = Math.PI * (rY * rY);
        }
        const vOut = Math.sqrt(2 * g * Math.max(0, localLevel));
        const dh = (aHole / aTank) * vOut * dt;

        localLevel = Math.max(0, localLevel - dh);
        setTankWaterLevel(localLevel);

        if (localLevel <= 0.02) {
          setTankDraining(false);
          sound.playVictory();
        }
      }

      // Draw tank
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Background grid
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 30) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += 30) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      const tankTopY = 50;
      const tankBottomY = h - 60;
      const tankPixelH = tankBottomY - tankTopY;
      const cx = w / 2 - 30;
      const halfW = 100;

      // Tank Geometry
      ctx.save();
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 4;
      ctx.fillStyle = 'rgba(241, 245, 249, 0.05)';

      if (tankShape === 'cylinder') {
        // Outline
        ctx.strokeRect(cx - halfW, tankTopY, halfW * 2, tankPixelH);

        // Water fill
        const waterPixelH = (localLevel / tankHeight) * tankPixelH;
        const waterTopY = tankBottomY - waterPixelH;

        const waterGrad = ctx.createLinearGradient(0, waterTopY, 0, tankBottomY);
        waterGrad.addColorStop(0, 'rgba(56, 189, 248, 0.7)');
        waterGrad.addColorStop(1, 'rgba(2, 132, 199, 0.9)');
        ctx.fillStyle = waterGrad;
        ctx.fillRect(cx - halfW + 2, waterTopY, halfW * 2 - 4, waterPixelH);

        // Water surface meniscus
        ctx.strokeStyle = '#bae6fd';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx - halfW + 2, waterTopY);
        ctx.lineTo(cx + halfW - 2, waterTopY);
        ctx.stroke();

      } else {
        // Inverted Cone Outline
        ctx.beginPath();
        ctx.moveTo(cx - halfW, tankTopY);
        ctx.lineTo(cx + halfW, tankTopY);
        ctx.lineTo(cx + 12, tankBottomY);
        ctx.lineTo(cx - 12, tankBottomY);
        ctx.closePath();
        ctx.stroke();

        // Water in Cone
        const frac = localLevel / tankHeight;
        const waterTopY = tankBottomY - frac * tankPixelH;
        const currentHalfW = 12 + frac * (halfW - 12);

        const waterGrad = ctx.createLinearGradient(0, waterTopY, 0, tankBottomY);
        waterGrad.addColorStop(0, 'rgba(56, 189, 248, 0.75)');
        waterGrad.addColorStop(1, 'rgba(2, 132, 199, 0.95)');
        ctx.fillStyle = waterGrad;

        ctx.beginPath();
        ctx.moveTo(cx - currentHalfW, waterTopY);
        ctx.lineTo(cx + currentHalfW, waterTopY);
        ctx.lineTo(cx + 10, tankBottomY);
        ctx.lineTo(cx - 10, tankBottomY);
        ctx.closePath();
        ctx.fill();
      }

      // Drainage hole at bottom right
      ctx.fillStyle = '#475569';
      ctx.fillRect(cx - 10, tankBottomY, 20, 10);

      // Jet stream coming out if draining
      if (tankDraining && localLevel > 0.05) {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.85)';
        ctx.beginPath();
        ctx.moveTo(cx + 10, tankBottomY + 5);
        // Parabolic stream: x(t) = v*t, y(t) = 0.5*g*t^2
        const streamV = Math.sqrt(2 * 9.81 * localLevel) * 20;
        ctx.bezierCurveTo(
          cx + 10 + streamV * 0.4, tankBottomY + 10,
          cx + 10 + streamV * 0.8, tankBottomY + 35,
          cx + 10 + streamV * 1.1, h - 10
        );
        ctx.lineTo(cx + 6 + streamV * 1.05, h - 10);
        ctx.closePath();
        ctx.fill();

        // Splash particles
        for (let s = 0; s < 4; s++) {
          ctx.fillStyle = '#e0f2fe';
          ctx.beginPath();
          ctx.arc(cx + streamV + (Math.random() - 0.5) * 15, h - 10 - Math.random() * 12, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // Measurement lines
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(cx + halfW + 15, tankTopY);
      ctx.lineTo(cx + halfW + 15, tankBottomY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#f59e0b';
      ctx.font = '11px sans-serif';
      ctx.fillText(`H = ${tankHeight} m`, cx + halfW + 25, (tankTopY + tankBottomY) / 2);

      tankAnimFrameRef.current = requestAnimationFrame(renderTank);
    };

    tankAnimFrameRef.current = requestAnimationFrame(renderTank);
    return () => {
      if (tankAnimFrameRef.current) {
        cancelAnimationFrame(tankAnimFrameRef.current);
      }
    };
  }, [selectedCase, tankDraining, tankShape, tankHeight, tankRadius, holeRadius, tankWaterLevel]);

  // ------------------------------------------
  // BRIDGE CATENARY CANVAS
  // ------------------------------------------
  useEffect(() => {
    if (selectedCase !== 'bridge') return;
    const canvas = bridgeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Sky & water
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(0.7, '#1e293b');
    grad.addColorStop(0.71, '#0284c7');
    grad.addColorStop(1, '#0369a1');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Bridge Deck (roadway)
    const deckY = h * 0.68;
    ctx.fillStyle = '#475569';
    ctx.fillRect(20, deckY, w - 40, 12);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(20, deckY + 5, w - 40, 2); // road line

    // Towers
    const towerW = 18;
    const towerH = 170;
    const t1X = w * 0.22;
    const t2X = w * 0.78;
    const towerTopY = deckY - towerH + 20;

    ctx.fillStyle = '#ef4444'; // Red suspension towers (Golden Gate style)
    ctx.fillRect(t1X - towerW / 2, towerTopY, towerW, towerH);
    ctx.fillRect(t2X - towerW / 2, towerTopY, towerW, towerH);

    // Catenary Curve: y(x) = a * cosh(x / a) - a
    // Center is between towers
    const centerX = (t1X + t2X) / 2;
    const halfDistM = spanLength / 2;
    const a = tensionParamA;

    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 3.5;
    ctx.beginPath();

    const pixelsPerMeter = (t2X - t1X) / spanLength;

    for (let px = t1X; px <= t2X; px += 2) {
      const xMeters = (px - centerX) / pixelsPerMeter;
      // y = a * cosh(x/a) - a
      const yMeters = a * Math.cosh(xMeters / a) - a;
      const py = towerTopY + (yMeters * pixelsPerMeter * 0.6);

      if (px === t1X) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Vertical suspender cables
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 1;
    for (let px = t1X + 15; px < t2X; px += 18) {
      const xMeters = (px - centerX) / pixelsPerMeter;
      const yMeters = a * Math.cosh(xMeters / a) - a;
      const py = towerTopY + (yMeters * pixelsPerMeter * 0.6);
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px, deckY);
      ctx.stroke();
    }

    // Little animated cars passing
    const carOffset = (Date.now() / 40) % (w - 80);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(30 + carOffset, deckY - 6, 14, 6);
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(w - 50 - carOffset * 0.8, deckY - 6, 14, 6);

  }, [selectedCase, spanLength, tensionParamA]);

  // ------------------------------------------
  // PHARMACOKINETICS CANVAS (AUC)
  // ------------------------------------------
  useEffect(() => {
    if (selectedCase !== 'pharma') return;
    const canvas = pharmaCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const padL = 50;
    const padB = 40;
    const graphW = w - padL - 30;
    const graphH = h - padB - 40;

    // Pharmacokinetic concentration formula:
    // C(t) = (D * ka) / (Vd * (ka - ke)) * (e^(-ke * t) - e^(-ka * t))
    const Vd = 10; // Volume of distribution
    const ka = absorptionRate;
    const ke = eliminationRate;
    const D = doseMg;
    const factor = (D * ka) / (Vd * Math.max(0.01, (ka - ke)));

    const conc = (t: number) => {
      if (t <= 0) return 0;
      return Math.max(0, factor * (Math.exp(-ke * t) - Math.exp(-ka * t)));
    };

    // Calculate max concentration
    let cMax = 0;
    let tMax = 24; // 24 hours
    for (let t = 0; t <= tMax; t += 0.2) {
      cMax = Math.max(cMax, conc(t));
    }
    cMax = Math.max(cMax * 1.3, 10);

    const toX = (t: number) => padL + (t / tMax) * graphW;
    const toY = (c: number) => h - padB - (c / cMax) * graphH;

    // Therapeutic zones
    const toxicLevel = cMax * 0.75;
    const minEffectiveLevel = cMax * 0.25;

    // Red toxic zone
    ctx.fillStyle = 'rgba(239, 68, 68, 0.12)';
    ctx.fillRect(padL, toY(cMax), graphW, toY(toxicLevel) - toY(cMax));
    // Green effective window
    ctx.fillStyle = 'rgba(34, 197, 94, 0.14)';
    ctx.fillRect(padL, toY(toxicLevel), graphW, toY(minEffectiveLevel) - toY(toxicLevel));
    // Yellow sub-therapeutic
    ctx.fillStyle = 'rgba(234, 179, 8, 0.10)';
    ctx.fillRect(padL, toY(minEffectiveLevel), graphW, toY(0) - toY(minEffectiveLevel));

    // Zone boundary lines
    ctx.strokeStyle = '#ef4444';
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(padL, toY(toxicLevel)); ctx.lineTo(padL + graphW, toY(toxicLevel)); ctx.stroke();
    ctx.strokeStyle = '#22c55e';
    ctx.beginPath(); ctx.moveTo(padL, toY(minEffectiveLevel)); ctx.lineTo(padL + graphW, toY(minEffectiveLevel)); ctx.stroke();
    ctx.setLineDash([]);

    // Zone labels
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#ef4444';
    ctx.fillText('NIVEL TÓXICO (Sobredosis)', padL + 8, toY(toxicLevel) - 6);
    ctx.fillStyle = '#22c55e';
    ctx.fillText('VENTANA TERAPÉUTICA ÓPTIMA', padL + 8, toY((toxicLevel + minEffectiveLevel) / 2));
    ctx.fillStyle = '#eab308';
    ctx.fillText('ZONA INEFICAZ (Sub-terapéutica)', padL + 8, toY(minEffectiveLevel) + 14);

    // Draw AUC shaded area
    ctx.beginPath();
    ctx.moveTo(toX(0), toY(0));
    for (let t = 0; t <= tMax; t += 0.2) {
      ctx.lineTo(toX(t), toY(conc(t)));
    }
    ctx.lineTo(toX(tMax), toY(0));
    ctx.closePath();
    const aucGrad = ctx.createLinearGradient(0, toY(cMax), 0, toY(0));
    aucGrad.addColorStop(0, 'rgba(99, 102, 241, 0.6)');
    aucGrad.addColorStop(1, 'rgba(168, 85, 247, 0.2)');
    ctx.fillStyle = aucGrad;
    ctx.fill();

    // Draw Curve Outline
    ctx.strokeStyle = '#818cf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(toX(0), toY(0));
    for (let t = 0; t <= tMax; t += 0.2) {
      ctx.lineTo(toX(t), toY(conc(t)));
    }
    ctx.stroke();

    // Grid & Axis
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(padL, toY(cMax));
    ctx.lineTo(padL, h - padB);
    ctx.lineTo(padL + graphW, h - padB);
    ctx.stroke();

    // Axis labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px monospace';
    ctx.fillText('Tiempo (horas)', w / 2 - 20, h - 10);
    ctx.save();
    ctx.translate(16, h / 2 + 30);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Conc. C(t) [mg/L]', 0, 0);
    ctx.restore();

  }, [selectedCase, doseMg, eliminationRate, absorptionRate]);

  // Calculations for readouts
  // Rocket exact burnout velocity: v = v0 + (T/m_dot)*ln(m0/mf) - g*t
  const rocketBurnoutV = (rocketThrust * 1000 / 120) * Math.log(3000 / 1500) - currentG * 12.5;

  // Tank total work to pump out water: W = rho * g * integral_0^H A(y) * (H_spill - y) dy
  const rho = 1000;
  const gConst = 9.81;
  let tankTotalWorkKJ = 0;
  if (tankShape === 'cylinder') {
    // W = rho * g * pi * R^2 * [H * y - y^2/2] from 0 to H = rho * g * pi * R^2 * H^2 / 2
    tankTotalWorkKJ = (rho * gConst * Math.PI * tankRadius * tankRadius * (tankHeight * tankHeight / 2)) / 1000;
  } else {
    // Cone: r(y) = (R/H)*y => A(y) = pi * (R/H)^2 * y^2
    // W = rho * g * pi * (R/H)^2 * integral_0^H y^2 * (H - y) dy = rho * g * pi * (R/H)^2 * [H^4 / 12]
    tankTotalWorkKJ = (rho * gConst * Math.PI * (tankRadius * tankRadius / (tankHeight * tankHeight)) * (Math.pow(tankHeight, 4) / 12)) / 1000;
  }

  // Catenary length: L = 2 * a * sinh(d / a)
  const dHalf = spanLength / 2;
  const exactCableLength = 2 * tensionParamA * Math.sinh(dHalf / tensionParamA);
  const sagHeight = tensionParamA * (Math.cosh(dHalf / tensionParamA) - 1);

  // AUC integral: AUC = Integral_0^inf C(t) dt = Dose / (Vd * ke)
  const totalAucVal = doseMg / (10 * eliminationRate);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-200/60 dark:bg-slate-900/80 max-w-3xl mx-auto border border-slate-300/50 dark:border-slate-800">
        <button
          onClick={() => { sound.playClick(); setSelectedCase('rocket'); setXp(x => x + 5); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            selectedCase === 'rocket'
              ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg shadow-orange-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Rocket className="w-4 h-4" />
          <span>1. Cohete Aeroespacial</span>
        </button>

        <button
          onClick={() => { sound.playClick(); setSelectedCase('tank'); setXp(x => x + 5); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            selectedCase === 'tank'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-500 text-white shadow-lg shadow-cyan-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Droplets className="w-4 h-4" />
          <span>2. Vaciado de Tanque</span>
        </button>

        <button
          onClick={() => { sound.playClick(); setSelectedCase('bridge'); setXp(x => x + 5); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            selectedCase === 'bridge'
              ? 'bg-gradient-to-r from-amber-600 to-yellow-500 text-white shadow-lg shadow-amber-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Anchor className="w-4 h-4" />
          <span>3. Puente y Catenaria</span>
        </button>

        <button
          onClick={() => { sound.playClick(); setSelectedCase('pharma'); setXp(x => x + 5); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            selectedCase === 'pharma'
              ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>4. Farmacocinética (AUC)</span>
        </button>
      </div>

      {/* ========================================================
          CASE 1: ROCKET TRAJECTORY
         ======================================================== */}
      {selectedCase === 'rocket' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-500 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-500" />
                Lanzamiento Orbital y Cinemática Continua
              </span>
              <span className="text-xs font-mono font-bold text-slate-500">
                g = {currentG.toFixed(2)} m/s²
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden bg-slate-950 p-2 shadow-inner flex items-center justify-center">
              <canvas
                ref={rocketCanvasRef}
                width={620}
                height={380}
                className="w-full max-w-full h-auto rounded-xl"
              />
            </div>

            {/* Launch controls */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playRocket();
                  setRocketRunning(!rocketRunning);
                }}
                className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 text-white shadow-md transition-all ${
                  rocketRunning
                    ? 'bg-amber-600 hover:bg-amber-500'
                    : 'bg-orange-600 hover:bg-orange-500'
                }`}
              >
                {rocketRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{rocketRunning ? 'Pausar Motores' : '¡Lanzar Misión!'}</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setRocketRunning(false);
                  setRocketTime(0);
                  setRocketAlt(0);
                  setRocketVel(0);
                  setRocketFuel(100);
                }}
                className="px-4 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm transition-all"
                title="Reiniciar Cohete"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Controls & Math Info */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Gauge className="w-5 h-5 text-orange-500" />
              <span>Parámetros de Integración Orbital</span>
            </h3>

            {/* Formula box */}
            <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/30 space-y-2">
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400 block uppercase">
                Doble Integración de Newton:
              </span>
              <div className="text-xs sm:text-sm font-mono overflow-x-auto">
                <MathView math="v(t) = v_0 + \int_0^t \left[\frac{F_{empuje}}{m(u)} - g\right] du" />
                <MathView math="y(t) = y_0 + \int_0^t v(u) \, du" />
              </div>
            </div>

            {/* Thrust Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Fuerza de Empuje de los Motores:</span>
                <span className="font-mono text-orange-500 text-sm">{rocketThrust} kN</span>
              </div>
              <input
                type="range"
                min={20}
                max={60}
                step={1}
                value={rocketThrust}
                onChange={(e) => setRocketThrust(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
            </div>

            {/* Planet selector */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Cuerpo Celeste de Lanzamiento:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'earth', label: 'Tierra', g: '9.81 m/s²' },
                  { id: 'moon', label: 'Luna', g: '1.62 m/s²' },
                  { id: 'mars', label: 'Marte', g: '3.71 m/s²' }
                ].map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      sound.playClick();
                      setRocketPlanet(p.id as 'earth' | 'moon' | 'mars');
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      rocketPlanet === p.id
                        ? 'bg-orange-500/20 border-orange-500 text-orange-600 dark:text-orange-400 font-bold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="text-xs font-bold">{p.label}</div>
                    <div className="text-[10px] opacity-75">{p.g}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Readout calculations */}
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Velocidad de Agotamiento Teórica:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                  {rocketBurnoutV.toFixed(1)} m/s
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Ecuación Fundamental:</span>
                <span className="font-mono font-bold text-orange-500">Tsiolkovsky Integral</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          CASE 2: TANK DRAINING (TORRICELLI & HYDROSTATIC WORK)
         ======================================================== */}
      {selectedCase === 'tank' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-500 flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-cyan-500" />
                Vaciado Hidrostático & Ley de Torricelli
              </span>
              <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                Nivel Actual: {tankWaterLevel.toFixed(2)} m
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden bg-slate-950 p-2 shadow-inner flex items-center justify-center">
              <canvas
                ref={tankCanvasRef}
                width={620}
                height={380}
                className="w-full max-w-full h-auto rounded-xl"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playSplash();
                  setTankDraining(!tankDraining);
                }}
                className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 text-white shadow-md transition-all ${
                  tankDraining
                    ? 'bg-amber-600 hover:bg-amber-500'
                    : 'bg-cyan-600 hover:bg-cyan-500'
                }`}
              >
                {tankDraining ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{tankDraining ? 'Pausar Drenado' : 'Abrir Válvula de Vaciado'}</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setTankDraining(false);
                  setTankWaterLevel(tankHeight);
                }}
                className="px-4 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm transition-all"
                title="Rellenar Tanque"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tank Controls */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-cyan-500" />
              <span>Geometría y Trabajo Hidrostático</span>
            </h3>

            {/* Formula */}
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 space-y-2">
              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 block uppercase">
                Integral de Trabajo de Bombeo:
              </span>
              <div className="text-xs sm:text-sm font-mono overflow-x-auto">
                <MathView math="W = \int_0^H \rho \cdot g \cdot A(y) \cdot (H - y) \, dy" />
                <MathView math="t_{vaciado} = \int_0^H \frac{A(y)}{a_0 \sqrt{2gy}} \, dy" />
              </div>
            </div>

            {/* Shape selection */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Forma del Depósito de Agua:
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    sound.playClick();
                    setTankShape('cylinder');
                  }}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    tankShape === 'cylinder'
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-600 dark:text-cyan-400 font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Tanque Cilíndrico
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setTankShape('cone');
                  }}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    tankShape === 'cone'
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-600 dark:text-cyan-400 font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Tanque Cónico Invertido
                </button>
              </div>
            </div>

            {/* Height Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Altura del Tanque (H):</span>
                <span className="font-mono text-cyan-500 text-sm">{tankHeight} m</span>
              </div>
              <input
                type="range"
                min={2}
                max={6}
                step={0.5}
                value={tankHeight}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setTankHeight(val);
                  setTankWaterLevel(val);
                }}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Work Readout */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 text-center">
                <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase block">
                  Trabajo Total W
                </span>
                <span className="text-base font-black text-cyan-700 dark:text-cyan-300 font-mono">
                  {tankTotalWorkKJ.toFixed(1)} kJ
                </span>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-center">
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase block">
                  Caudal Instantáneo
                </span>
                <span className="text-base font-black text-blue-700 dark:text-blue-300 font-mono">
                  {(Math.PI * holeRadius * holeRadius * Math.sqrt(2 * 9.81 * tankWaterLevel) * 1000).toFixed(1)} L/s
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          CASE 3: SUSPENSION BRIDGE & CATENARY
         ======================================================== */}
      {selectedCase === 'bridge' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                <Anchor className="w-4 h-4 text-amber-500" />
                Infraestructura Civil: Cable de Puente Colgante
              </span>
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                Longitud: {exactCableLength.toFixed(2)} m
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden bg-slate-950 p-2 shadow-inner flex items-center justify-center">
              <canvas
                ref={bridgeCanvasRef}
                width={620}
                height={380}
                className="w-full max-w-full h-auto rounded-xl"
              />
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 text-center italic">
              El cable de acero adopta de forma natural la curva catenaria hiperbólica para equilibrar la tensión gravitatoria.
            </p>
          </div>

          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-500" />
              <span>Ecuación de la Catenaria</span>
            </h3>

            {/* Formula */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block uppercase">
                Longitud de Arco de la Catenaria:
              </span>
              <div className="text-xs sm:text-sm font-mono overflow-x-auto">
                <MathView math="y(x) = a \cosh\left(\frac{x}{a}\right) - a" />
                <MathView math="L = \int_{-d}^d \sqrt{1 + [y'(x)]^2} \, dx = 2a \sinh\left(\frac{d}{a}\right)" />
              </div>
            </div>

            {/* Tension Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Parámetro de Tensión (a = T₀ / w):</span>
                <span className="font-mono text-amber-500 text-sm">{tensionParamA} m</span>
              </div>
              <input
                type="range"
                min={30}
                max={100}
                step={2}
                value={tensionParamA}
                onChange={(e) => setTensionParamA(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Span Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Vano del Puente (Distancia entre Torres):</span>
                <span className="font-mono text-amber-500 text-sm">{spanLength} m</span>
              </div>
              <input
                type="range"
                min={60}
                max={200}
                step={10}
                value={spanLength}
                onChange={(e) => setSpanLength(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Results */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-center">
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase block">
                  Cable Necesario (L)
                </span>
                <span className="text-base font-black text-amber-700 dark:text-amber-300 font-mono">
                  {exactCableLength.toFixed(2)} m
                </span>
              </div>

              <div className="p-3 rounded-xl bg-yellow-50 dark:bg-yellow-950/40 border border-yellow-200 dark:border-yellow-800 text-center">
                <span className="text-[10px] font-bold text-yellow-600 dark:text-yellow-400 uppercase block">
                  Flecha de Comba
                </span>
                <span className="text-base font-black text-yellow-700 dark:text-yellow-300 font-mono">
                  {sagHeight.toFixed(2)} m
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          CASE 4: PHARMACOKINETICS (AUC - AREA UNDER THE CURVE)
         ======================================================== */}
      {selectedCase === 'pharma' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-500 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-purple-500" />
                Medicina y Fisiología: Área Bajo la Curva (AUC)
              </span>
              <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">
                AUC: {totalAucVal.toFixed(1)} mg·h/L
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden bg-slate-950 p-2 shadow-inner flex items-center justify-center">
              <canvas
                ref={pharmaCanvasRef}
                width={620}
                height={380}
                className="w-full max-w-full h-auto rounded-xl"
              />
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 text-center italic">
              El área bajo la curva integral representa la biodisponibilidad y exposición total del organismo al antibiótico.
            </p>
          </div>

          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-500" />
              <span>Modelo Bicopartimental Oral</span>
            </h3>

            {/* Formula */}
            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-2">
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block uppercase">
                Integral Impropia de Biodisponibilidad:
              </span>
              <div className="text-xs sm:text-sm font-mono overflow-x-auto">
                <MathView math="C(t) = \frac{D \cdot k_a}{V_d(k_a - k_e)} (e^{-k_e t} - e^{-k_a t})" />
                <MathView math="AUC = \int_0^{\infty} C(t) \, dt = \frac{D}{V_d \cdot k_e}" />
              </div>
            </div>

            {/* Dose Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Dosis Administrada (D):</span>
                <span className="font-mono text-purple-500 text-sm">{doseMg} mg</span>
              </div>
              <input
                type="range"
                min={100}
                max={1000}
                step={50}
                value={doseMg}
                onChange={(e) => setDoseMg(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            {/* Elimination Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Constante de Eliminación Renal (k_e):</span>
                <span className="font-mono text-purple-500 text-sm">{eliminationRate.toFixed(2)} h⁻¹</span>
              </div>
              <input
                type="range"
                min={0.05}
                max={0.35}
                step={0.02}
                value={eliminationRate}
                onChange={(e) => setEliminationRate(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            {/* Clinical Alert */}
            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-300 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-200 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Si la curva sobrepasa el límite superior entra en <strong>Zona Tóxica</strong>. Si queda por debajo entra en <strong>Zona Ineficaz</strong>. El cálculo integral define la posología médica exacta.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
