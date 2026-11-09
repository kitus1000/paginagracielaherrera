import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  Printer, 
  CheckCircle2, 
  FileSpreadsheet, 
  BookMarked, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { sound } from '../utils/sound';

export const DownloadsView: React.FC = () => {
  const [selectedWorksheet, setSelectedWorksheet] = useState<number>(1);

  const worksheets = [
    {
      id: 1,
      unit: 'Unidad 1',
      title: 'Hoja de Trabajo: Teorema Fundamental del Cálculo & Riemann',
      problemsCount: 10,
      description: 'Sumas de Riemann, regla de Simpson, demostraciones de Faulhaber y regla de Leibniz para límites dependientes de x.',
      items: [
        '1. Calcular el límite de Riemann para f(x) = 2x² - 3x + 1 en [1, 4] con n subintervalos regulares.',
        '2. Aplicar la Regla de Simpson con n = 4 para aproximar ∫₁³ (1/x) dx y comparar contra ln(3).',
        '3. Derivar F(x) = ∫_{sin 2x}^{x³} √(1 + t⁴) dt mediante la regla de derivación de Leibniz.',
        '4. Determinar los valores c ∈ (-1, 2) del Teorema del Valor Medio para f(x) = 3x² - 2x + 5.',
        '5. Evaluar analíticamente la integral con valor absoluto: ∫₋₂³ |x² - x - 2| dx.'
      ]
    },
    {
      id: 2,
      unit: 'Unidad 2',
      title: 'Hoja de Trabajo: Métodos de Integración Analítica',
      problemsCount: 12,
      description: 'Sustitución simple, integración por partes tabular, sustitución trigonométrica, Heaviside y Weierstrass.',
      items: [
        '1. Evaluar ∫ dx / (3 + 5 cos x) mediante la sustitución universal de Weierstrass t = tan(x/2).',
        '2. Resolver ∫ (2x³ - 5x) sin(3x) dx empleando el método tabular de integración por partes.',
        '3. Evaluar ∫ dx / (x² + 4x + 13)^(3/2) completando el trinomio y aplicando sustitución trigonométrica.',
        '4. Descomponer e integrar por fracciones parciales: ∫ (3x² + x + 4) / [(x - 1)(x² + 4)] dx.',
        '5. Resolver la integral racionalizante de radical fraccionario: ∫ dx / [x - √(x + 2)].'
      ]
    },
    {
      id: 3,
      unit: 'Unidad 3',
      title: 'Hoja de Trabajo: Aplicaciones Físicas y Geométricas',
      problemsCount: 12,
      description: 'Áreas dx/dy, longitud de catenaria, sólidos por discos, cascarones, Trompeta de Gabriel y trabajo mecánico.',
      items: [
        '1. Calcular el área acotada por x = 8 - y² y x = y + 2 mediante integración horizontal dy.',
        '2. Determinar la longitud de arco del cable catenario y = a cosh(x/a) suspendido entre dos torres.',
        '3. Calcular el volumen al girar la región entre y = √x y y = x² alrededor de la recta horizontal y = -1.',
        '4. Demostrar la paradoja de la Trompeta de Gabriel: volumen finito V = π y superficie exterior infinita S = ∞.',
        '5. Calcular el trabajo para vaciar un tanque semiesférico de agua de radio R = 4 m por su cima.'
      ]
    },
    {
      id: 4,
      unit: 'Unidad 4',
      title: 'Hoja de Trabajo: Series Infinitas y Polinomios de Taylor',
      problemsCount: 12,
      description: 'Convergencia de p-series, criterios de D\'Alembert, Cauchy, Raabe, radio de convergencia e integrales no elementales.',
      items: [
        '1. Determinar el radio y el intervalo cerrado de convergencia de Σ_{n=1}^∞ [ (x - 3)ⁿ / (n² · 4ⁿ) ].',
        '2. Aproximar ∫₀^{0.4} e^(-x²) dx mediante serie de Maclaurin con error menor a 10⁻⁴.',
        '3. Deducir la serie de Maclaurin de arctan(x) e inferir la fórmula de Leibniz para π/4.',
        '4. Aplicar el Criterio de la Integral de Cauchy para demostrar la convergencia de p-series para p > 1.',
        '5. Determinar la convergencia de Σ [ (2n + 1)/(3n - 1) ]ⁿ mediante el Criterio de la Raíz de Cauchy.'
      ]
    }
  ];

  const currentWs = worksheets.find(w => w.id === selectedWorksheet) || worksheets[0];

  const handlePrintWorksheet = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          <Download className="w-4 h-4" />
          <span>Material Didáctico Descargable</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Centro de Descargas & Problemarios Imprimibles
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mt-1">
          Obtén el manual oficial de apuntes de 65+ páginas en formato Word, el temario del TecNM y genera hojas de ejercicios para resolver en clase o estudio autónomo.
        </p>
      </div>

      {/* Main Download Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Word Document 65+ Pages */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-5 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xl shadow-md">
                W
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-300 dark:border-emerald-800">
                Versión 65+ Páginas
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Apuntes de Cálculo Integral (Formato Word .docx)
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              El documento oficial completo elaborado para la propuesta de trabajo docente de la{' '}
              <strong>Ing. Graciela Herrera Vázquez</strong>. Incluye:
            </p>

            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 pt-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>65 a 70+ páginas con márgenes de 2.5 cm y tipografía 11pt</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>124 cajas didácticas con código de color institucional</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>26 figuras en 300 DPI y más de 200 fórmulas matemáticas OMML</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Índice hipervinculado interactivo con campo F9</span>
              </li>
            </ul>
          </div>

          <a
            href="/Apuntes_Calculo_Integral_TecNM_Miss_Graciela.docx"
            download="Apuntes_Calculo_Integral_TecNM_Miss_Graciela.docx"
            onClick={() => sound.playClick()}
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Descargar Manual Word (.docx - 3.8 MB)</span>
          </a>
        </div>

        {/* PDF Syllabus Document */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-5 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-xl shadow-md">
                PDF
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700">
                Oficial TecNM
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Temario Oficial de la Asignatura (Clave ACF-0902)
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Programa de estudio normativo publicado por la Dirección General del Tecnológico Nacional de México para todas las carreras de ingeniería.
            </p>

            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 pt-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Competencia específica y genérica por unidad</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Actividades de aprendizaje y sugerencias didácticas</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Bibliografía básica canónica recomendada</span>
              </li>
            </ul>
          </div>

          <a
            href="/Temario_Oficial_Calculo_Integral_TecNM.pdf"
            download="Temario_Oficial_Calculo_Integral_TecNM.pdf"
            onClick={() => sound.playClick()}
            className="w-full py-3.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Descargar Temario Oficial PDF (169 KB)</span>
          </a>
        </div>

      </div>

      {/* ========================================================
          PRINTABLE WORKSHEETS GENERATOR
         ======================================================== */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Printer className="w-6 h-6 text-indigo-500" />
              <span>Generador de Hojas de Trabajo Imprimibles</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Selecciona una unidad temática para generar una hoja de trabajo lista para imprimir o guardar como PDF.
            </p>
          </div>

          {/* Unit selector buttons */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            {worksheets.map((ws) => (
              <button
                key={ws.id}
                onClick={() => { sound.playClick(); setSelectedWorksheet(ws.id); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedWorksheet === ws.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {ws.unit}
              </button>
            ))}
          </div>
        </div>

        {/* Printable Preview Sheet */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white text-slate-900 shadow-md border border-slate-200 space-y-6 print:border-none print:shadow-none">
          
          {/* Sheet Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-black uppercase text-indigo-600 block tracking-widest">
                TECNOLÓGICO NACIONAL DE MÉXICO • ASIGNATURA ACF-0902
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                {currentWs.title}
              </h3>
              <p className="text-xs text-slate-600">
                Docente: Ing. Graciela Herrera Vázquez • {currentWs.description}
              </p>
            </div>

            <div className="text-xs text-slate-500 font-mono text-left sm:text-right border-l sm:border-l-0 pl-3 sm:pl-0 border-slate-300">
              <div>Alumno: _______________________</div>
              <div className="mt-1">Grupo: ______ • Fecha: __________</div>
            </div>
          </div>

          {/* Exercise items */}
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Instrucciones: Desarrolla analíticamente cada uno de los siguientes problemas justificando cada paso:
            </span>

            <div className="space-y-3">
              {currentWs.items.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium text-slate-800">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400 italic">
            <span>TecNM 2026 • Propuesta Didáctica de Cálculo Integral</span>
            <span>Página 1 de 1</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={handlePrintWorksheet}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Hoja de Trabajo / Guardar como PDF</span>
          </button>
        </div>
      </section>

    </div>
  );
};
