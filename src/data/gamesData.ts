import { DragMatchItem, SpeedSorterQuestion, StepPuzzleItem, BossLevel, SpaceDefenderQuestion } from '../types';

// ==========================================
// JUEGO 1: CAZA-PRIMITIVAS DRAG & MATCH
// ==========================================
export const DRAG_MATCH_ITEMS: DragMatchItem[] = [
  // Nivel Fácil
  {
    id: 'dm-1',
    integralLatex: '\\int 3x^2 \\, dx',
    solutionLatex: 'x^3 + C',
    method: 'Potencia Inmediata',
    difficulty: 'facil'
  },
  {
    id: 'dm-2',
    integralLatex: '\\int e^{4x} \\, dx',
    solutionLatex: '\\frac{1}{4}e^{4x} + C',
    method: 'Exponencial Directa',
    difficulty: 'facil'
  },
  {
    id: 'dm-3',
    integralLatex: '\\int \\frac{1}{x} \\, dx',
    solutionLatex: '\\ln|x| + C',
    method: 'Logaritmo Natural',
    difficulty: 'facil'
  },
  {
    id: 'dm-4',
    integralLatex: '\\int \\cos(5x) \\, dx',
    solutionLatex: '\\frac{1}{5}\\sin(5x) + C',
    method: 'Trigonométrica Directa',
    difficulty: 'facil'
  },

  // Nivel Medio
  {
    id: 'dm-5',
    integralLatex: '\\int 2x \\cos(x^2) \\, dx',
    solutionLatex: '\\sin(x^2) + C',
    method: 'Cambio de Variable u = x²',
    difficulty: 'medio'
  },
  {
    id: 'dm-6',
    integralLatex: '\\int \\frac{2x}{x^2 + 9} \\, dx',
    solutionLatex: '\\ln(x^2 + 9) + C',
    method: 'Logarítmica compuesta',
    difficulty: 'medio'
  },
  {
    id: 'dm-7',
    integralLatex: '\\int x e^x \\, dx',
    solutionLatex: 'e^x(x - 1) + C',
    method: 'Por Partes (ILATE)',
    difficulty: 'medio'
  },
  {
    id: 'dm-8',
    integralLatex: '\\int \\sec^2(3x) \\, dx',
    solutionLatex: '\\frac{1}{3}\\tan(3x) + C',
    method: 'Trigonométrica Directa',
    difficulty: 'medio'
  },

  // Nivel Avanzado
  {
    id: 'dm-9',
    integralLatex: '\\int \\frac{dx}{x^2 + 16}',
    solutionLatex: '\\frac{1}{4}\\arctan\\left(\\frac{x}{4}\\right) + C',
    method: 'Forma Arco Tangente',
    difficulty: 'avanzado'
  },
  {
    id: 'dm-10',
    integralLatex: '\\int \\frac{dx}{\\sqrt{25 - x^2}}',
    solutionLatex: '\\arcsin\\left(\\frac{x}{5}\\right) + C',
    method: 'Forma Arco Seno',
    difficulty: 'avanzado'
  },
  {
    id: 'dm-11',
    integralLatex: '\\int \\ln(x) \\, dx',
    solutionLatex: 'x\\ln(x) - x + C',
    method: 'Por Partes (u = ln x)',
    difficulty: 'avanzado'
  },
  {
    id: 'dm-12',
    integralLatex: '\\int \\frac{2x + 1}{x^2 + x - 6} \\, dx',
    solutionLatex: '\\ln|x^2 + x - 6| + C',
    method: 'Diferencial Exacto en Numerador',
    difficulty: 'avanzado'
  }
];

// ==========================================
// JUEGO 2: REACTOR DE MÉTODOS (SPEED SORTER)
// ==========================================
export const SPEED_SORTER_QUESTIONS: SpeedSorterQuestion[] = [
  {
    id: 'ss-1',
    integralLatex: '\\int x^2 e^{x^3} \\, dx',
    correctMethod: 'Sustitución Simple',
    options: ['Sustitución Simple', 'Por Partes', 'Fracciones Parciales', 'Sustitución Trigonométrica'],
    explanation: 'El exponente x³ tiene como derivada 3x², que coincide con el factor x² dx salvo la constante.',
    hint: 'Busca una función y su derivada exacta flotando junto a ella: d(x³) = 3x² dx.'
  },
  {
    id: 'ss-2',
    integralLatex: '\\int x^3 \\ln(x) \\, dx',
    correctMethod: 'Integración por Partes',
    options: ['Sustitución Simple', 'Integración por Partes', 'Fracciones Parciales', 'Sustitución de Weierstrass'],
    explanation: 'Es un producto de un monomio algebraico (x³) y una función logarítmica (ln x). Aplica ILATE.',
    hint: 'Regla ILATE: La función Logarítmica tiene prioridad para ser u, y la Algebraica para dv.'
  },
  {
    id: 'ss-3',
    integralLatex: '\\int \\frac{dx}{x^2 - 7x + 12}',
    correctMethod: 'Fracciones Parciales',
    options: ['Fracciones Parciales', 'Sustitución Trigonométrica', 'Por Partes', 'Inmediata'],
    explanation: 'El denominador es un polinomio cuadrático factorizable en (x - 3)(x - 4).',
    hint: '¿El denominador se puede factorizar como producto de factores lineales distintos?'
  },
  {
    id: 'ss-4',
    integralLatex: '\\int \\frac{\\sqrt{9 - x^2}}{x^2} \\, dx',
    correctMethod: 'Sustitución Trigonométrica',
    options: ['Sustitución Trigonométrica', 'Sustitución Simple', 'Fracciones Parciales', 'Weierstrass'],
    explanation: 'La raíz cuadrada tiene la forma clásica √(a² - x²), lo que sugiere la sustitución x = 3 sin θ.',
    hint: 'Forma √(a² - u²): Imagina un triángulo rectángulo donde la hipotenusa mide a = 3.'
  },
  {
    id: 'ss-5',
    integralLatex: '\\int \\frac{dx}{2 + \\cos(x)}',
    correctMethod: 'Sustitución de Weierstrass',
    options: ['Sustitución de Weierstrass', 'Por Partes', 'Directa', 'Fracciones Parciales'],
    explanation: 'Es una función racional pura de funciones trigonométricas en el denominador. t = tan(x/2) la racionaliza.',
    hint: 'Cuando un seno o coseno está sumando en el denominador sin diferencial arriba, la sustitución universal t = tan(x/2) es la clave.'
  },
  {
    id: 'ss-6',
    integralLatex: '\\int x^4 \\sin(2x) \\, dx',
    correctMethod: 'Integración por Partes',
    options: ['Integración por Partes', 'Sustitución Simple', 'Fracciones Parciales', 'Sustitución Trigonométrica'],
    explanation: 'Un polinomio de grado 4 multiplicado por una función trigonométrica se resuelve de manera óptima con el método tabular de partes.',
    hint: 'El método tabular permite derivar x⁴ hasta 0 e integrar sin(2x) sucesivamente.'
  },
  {
    id: 'ss-7',
    integralLatex: '\\int \\frac{dx}{\\sqrt{x^2 + 16}}',
    correctMethod: 'Sustitución Trigonométrica',
    options: ['Sustitución Trigonométrica', 'Por Partes', 'Fracciones Parciales', 'Weierstrass'],
    explanation: 'La forma √(x² + a²) con a = 4 sugiere x = 4 tan θ.',
    hint: 'Forma √(u² + a²): Catetos u y a, hipotenusa la raíz. Usa tangente.'
  },
  {
    id: 'ss-8',
    integralLatex: '\\int \\frac{5x - 2}{(x - 1)(x^2 + 4)} \\, dx',
    correctMethod: 'Fracciones Parciales',
    options: ['Fracciones Parciales', 'Por Partes', 'Sustitución Simple', 'Directa'],
    explanation: 'Función racional propia con un factor lineal y un factor cuadrático irreducible.',
    hint: 'Descomposición del tipo A/(x - 1) + (Bx + C)/(x² + 4).'
  }
];

// ==========================================
// JUEGO 3: ROMPECABEZAS DE PASOS MATEMÁTICOS
// ==========================================
export const STEP_PUZZLES: StepPuzzleItem[] = [
  {
    id: 'puz-1',
    title: 'Integración por Partes: ∫ x cos(x) dx',
    integralLatex: '\\int x \\cos(x) \\, dx',
    shuffledSteps: [
      {
        id: 's-1-3',
        correctIndex: 2,
        text: 'Aplicar la fórmula general de integración por partes: ∫ u dv = u v - ∫ v du.',
        math: 'x \\sin(x) - \\int \\sin(x) \\, dx'
      },
      {
        id: 's-1-1',
        correctIndex: 0,
        text: 'Seleccionar u y dv según la regla mnemotécnica ILATE (Algebraica antes de Trigonométrica).',
        math: 'u = x, \\quad dv = \\cos(x) dx'
      },
      {
        id: 's-1-4',
        correctIndex: 3,
        text: 'Integrar la expresión remanente y añadir la constante arbitraria de integración + C.',
        math: 'x \\sin(x) - (-\\cos(x)) + C = x \\sin(x) + \\cos(x) + C'
      },
      {
        id: 's-1-2',
        correctIndex: 1,
        text: 'Diferenciar u para hallar du e integrar dv para hallar v.',
        math: 'du = dx, \\quad v = \\sin(x)'
      }
    ],
    finalNote: '¡Excelente! Has dominado la estructura lógica de la integración por partes.'
  },
  {
    id: 'puz-2',
    title: 'Sustitución Trigonométrica: ∫ dx / √(4 - x²)',
    integralLatex: '\\int \\frac{dx}{\\sqrt{4 - x^2}}',
    shuffledSteps: [
      {
        id: 's-2-4',
        correctIndex: 3,
        text: 'Despejar el ángulo θ = arcsin(x/2) y sumar la constante de integración C.',
        math: '\\theta + C = \\arcsin\\left(\\frac{x}{2}\\right) + C'
      },
      {
        id: 's-2-2',
        correctIndex: 1,
        text: 'Sustituir dx y el radical en términos de θ, simplificando con √(4 - 4sin²θ) = 2cos θ.',
        math: '\\int \\frac{2\\cos(\\theta) d\\theta}{2\\cos(\\theta)} = \\int 1 \\, d\\theta'
      },
      {
        id: 's-2-1',
        correctIndex: 0,
        text: 'Identificar el Caso 1 √(a² - x²) con a = 2 y proponer la sustitución x = 2 sin θ.',
        math: 'x = 2\\sin(\\theta) \\implies dx = 2\\cos(\\theta) d\\theta'
      },
      {
        id: 's-2-3',
        correctIndex: 2,
        text: 'Evaluar la integral directa resultante en la variable angular θ.',
        math: '\\int d\\theta = \\theta'
      }
    ],
    finalNote: '¡Perfecto! El regreso a la variable original completa la demostración.'
  },
  {
    id: 'puz-3',
    title: 'Fracciones Parciales: ∫ [ 1 / (x² - 1) ] dx',
    integralLatex: '\\int \\frac{dx}{x^2 - 1}',
    shuffledSteps: [
      {
        id: 's-3-3',
        correctIndex: 2,
        text: 'Integrar cada fracción simple directamente obteniendo logaritmos naturales.',
        math: '\\frac{1}{2} \\int \\frac{dx}{x - 1} - \\frac{1}{2} \\int \\frac{dx}{x + 1} = \\frac{1}{2}\\ln|x - 1| - \\frac{1}{2}\\ln|x + 1| + C'
      },
      {
        id: 's-3-1',
        correctIndex: 0,
        text: 'Factorizar la diferencia de cuadrados en el denominador como (x - 1)(x + 1).',
        math: '\\frac{1}{x^2 - 1} = \\frac{A}{x - 1} + \\frac{B}{x + 1}'
      },
      {
        id: 's-3-4',
        correctIndex: 3,
        text: 'Condensar mediante leyes de los logaritmos ln(A) - ln(B) = ln(A/B).',
        math: '\\frac{1}{2} \\ln\\left| \\frac{x - 1}{x + 1} \\right| + C'
      },
      {
        id: 's-3-2',
        correctIndex: 1,
        text: 'Calcular los coeficientes A y B por el método de cobertura de Heaviside.',
        math: 'A = \\frac{1}{1 + 1} = \\frac{1}{2}, \\quad B = \\frac{1}{-1 - 1} = -\\frac{1}{2}'
      }
    ],
    finalNote: '¡Impecable! Las leyes logarítmicas dan la forma canónica final.'
  }
];

// ==========================================
// JUEGO 4: BATALLA DE RIEMANN & AVENTURA
// ==========================================
export const BOSS_LEVELS: BossLevel[] = [
  {
    id: 1,
    name: 'El Titán Arquímedes',
    title: 'Guardián de la Exhaución y el TFC',
    unit: 'Unidad 1: Teorema Fundamental del Cálculo',
    maxHp: 100,
    avatar: '🏛️',
    dialogue: '¡Saludos, estudiante del TecNM! Antes de cruzar las puertas del cálculo, debes demostrar que comprendes el límite de mis polígonos inscritos.',
    questions: [
      {
        id: 'b1-q1',
        question: 'Si f(x) es continua en [a, b] y g(x) = ∫_a^x f(t) dt, ¿cuál es la derivada g\'(x)?',
        math: 'g\'(x) = \\frac{d}{dx} \\left[ \\int_{a}^{x} f(t) dt \\right]',
        options: ['f(x)', 'f\'(x)', 'f(b) - f(a)', '0'],
        correctIndex: 0,
        hint: 'Es la afirmación directa del Teorema Fundamental del Cálculo Parte 1: la derivación cancela la acumulación.',
        xp: 50
      },
      {
        id: 'b1-q2',
        question: '¿Qué fórmula cerrada representa la suma de los primeros n cuadrados Σ i²?',
        math: '\\sum_{i=1}^{n} i^2',
        options: [
          'n(n+1)(2n+1) / 6',
          'n(n+1) / 2',
          '[n(n+1)/2]²',
          'n³ / 3'
        ],
        correctIndex: 0,
        hint: 'La fórmula de Faulhaber para cuadrados perfectos tiene un denominador 6 y factor (2n + 1).',
        xp: 60
      },
      {
        id: 'b1-q3',
        question: '¿Cuál es el valor exacto de la integral simétrica de una función impar en [-3, 3]?',
        math: '\\int_{-3}^{3} x^5 \\cos(x) \\, dx',
        options: ['0', '18', 'π / 2', 'Indefinido'],
        correctIndex: 0,
        hint: 'El producto de una función impar (x⁵) por una par (cos x) es impar. Toda función impar en un intervalo simétrico [-a, a] se anula.',
        xp: 70
      }
    ]
  },
  {
    id: 2,
    name: 'El Guardián de las Primitivas',
    title: 'Maestro de los Métodos Analíticos',
    unit: 'Unidad 2: Métodos de Integración',
    maxHp: 120,
    avatar: '⚔️',
    dialogue: '¡Bienvenido a mi forja algebraica! Solo quien domina el arte de elegir la sustitución perfecta puede superar este desafío.',
    questions: [
      {
        id: 'b2-q1',
        question: 'En la regla de integración por partes ∫ u dv = u v - ∫ v du, ¿qué prioridad fija la regla ILATE?',
        options: [
          'Inversas > Logarítmicas > Algebraicas > Trigonométricas > Exponenciales',
          'Integrales > Límites > Áreas > Tangentes > Exponentes',
          'Exponenciales > Trigonométricas > Algebraicas > Logarítmicas',
          'Cualquier orden es idéntico'
        ],
        correctIndex: 0,
        hint: 'La letra I es de Inversas trigonométricas y L de Logaritmos, las cuales casi siempre deben elegirse como u.',
        xp: 60
      },
      {
        id: 'b2-q2',
        question: '¿Qué sustitución universal propuso Weierstrass para transformar expresiones racionales de senos y cosenos?',
        math: 't = \\tan\\left(\\frac{x}{2}\\right)',
        options: [
          't = tan(x/2)',
          't = sin(x) + cos(x)',
          't = sec(x)',
          't = e^x'
        ],
        correctIndex: 0,
        hint: 'La tangente del semiángulo transforma sin(x) en 2t/(1+t²) y cos(x) en (1-t²)/(1+t²).',
        xp: 75
      },
      {
        id: 'b2-q3',
        question: '¿Cuál es la integral directa de sec(x)?',
        math: '\\int \\sec(x) \\, dx',
        options: [
          'ln|sec(x) + tan(x)| + C',
          'tan(x) + C',
          'sec(x) tan(x) + C',
          'ln|cos(x)| + C'
        ],
        correctIndex: 0,
        hint: 'Multiplica y divide por (sec x + tan x) en el numerador y denominador.',
        xp: 80
      }
    ]
  },
  {
    id: 3,
    name: 'El Señor de los Sólidos',
    title: 'Soberano de los Volúmenes y la Trompeta de Gabriel',
    unit: 'Unidad 3: Aplicaciones de la Integral',
    maxHp: 140,
    avatar: '🏺',
    dialogue: 'Observa mi trompeta infinita... ¿Puedes calcular cuánta pintura cabe en su interior antes de quedar atrapado en su superficie?',
    questions: [
      {
        id: 'b3-q1',
        question: '¿Cuál es el volumen del sólido infinito de la Trompeta de Gabriel al rotar y = 1/x en [1, ∞) sobre el eje x?',
        math: 'V = \\pi \\int_{1}^{\\infty} \\left(\\frac{1}{x}\\right)^2 dx',
        options: ['π unidades cúbicas', 'Infinito (∞)', '1 / π', '2π'],
        correctIndex: 0,
        hint: 'La antiderivada de 1/x² es -1/x. Evaluando entre 1 y ∞ da: π[-0 - (-1)] = π.',
        xp: 80
      },
      {
        id: 'b3-q2',
        question: '¿Qué fórmula define el volumen por Cascarones Cilíndricos concéntricos al rotar en torno al eje y?',
        math: 'V = 2\\pi \\int_{a}^{b} p(x) h(x) \\, dx',
        options: [
          '2π ∫ (radio p(x)) · (altura h(x)) dx',
          'π ∫ [R(x)]² dx',
          'π ∫ ([R(x)]² - [r(x)]²) dx',
          '∫ [f(x) - g(x)] dx'
        ],
        correctIndex: 0,
        hint: 'El perímetro del cascarón es 2π·radio, su altura es h(x) y su espesor es dx.',
        xp: 85
      },
      {
        id: 'b3-q3',
        question: '¿Qué valor exacto tiene la Función Gamma de Euler para el argumento semientero α = 1/2?',
        math: '\\Gamma(1/2) = \\int_{0}^{\\infty} t^{-1/2} e^{-t} \\, dt',
        options: ['√π', 'π', '1', '1 / 2'],
        correctIndex: 0,
        hint: 'Euler demostró que se relaciona íntimamente con la integral gaussiana: √π ≈ 1.77245.',
        xp: 90
      }
    ]
  },
  {
    id: 4,
    name: 'El Oráculo de Euler',
    title: 'Guardián del Infinito y las Series de Taylor',
    unit: 'Unidad 4: Series y Convergencia',
    maxHp: 160,
    avatar: '🌌',
    dialogue: 'Has alcanzado la cúspide matemática. Solo desentrañando el misterio de las sumas infinitas podrás graduarte con honores.',
    questions: [
      {
        id: 'b4-q1',
        question: '¿A qué valor exacto converge la célebre serie del Problema de Basilea Σ (1/n²)?',
        math: '\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = 1 + \\frac{1}{4} + \\frac{1}{9} + \\frac{1}{16} + \\dots',
        options: ['π² / 6', 'π / 4', '2', 'ln(2)'],
        correctIndex: 0,
        hint: 'Resuelto por Leonhard Euler en 1734; el resultado involucra a Pi al cuadrado dividido entre 6.',
        xp: 95
      },
      {
        id: 'b4-q2',
        question: '¿Para qué valores de p CONVERGE una p-serie Σ (1 / nᵖ)?',
        math: '\\sum_{n=1}^{\\infty} \\frac{1}{n^p}',
        options: ['p > 1 estrictamente', 'p ≥ 1', 'p < 1', 'p = 1 únicamente'],
        correctIndex: 0,
        hint: 'Recuerda que para p = 1 (serie armónica 1 + 1/2 + 1/3 + ...) diverge. Por tanto, debe ser estrictamente mayor que 1.',
        xp: 100
      },
      {
        id: 'b4-q3',
        question: '¿Cuál es la representación canónica en serie de Maclaurin de la función exponencial eˣ?',
        math: 'e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!}',
        options: [
          '1 + x + x²/2! + x³/3! + ...',
          'x - x³/3! + x⁵/5! - ...',
          '1 - x²/2! + x⁴/4! - ...',
          'x - x²/2 + x³/3 - ...'
        ],
        correctIndex: 0,
        hint: 'Todas sus derivadas sucesivas en el origen valen 1: f^(n)(0) = 1.',
        xp: 110
      }
    ]
  }
];

// ==========================================
// JUEGO 5: INVASORES DEL CÁLCULO (SPACE ARCADE)
// ==========================================
export const SPACE_DEFENDER_QUESTIONS: SpaceDefenderQuestion[] = [
  // --- OLEADA 1: CERO GRAVEDAD (POLINOMIALES E INMEDIATAS) ---
  {
    id: 'sd-1',
    wave: 1,
    waveTitle: 'Oleada 1: Cero Gravedad (Inmediatas)',
    integralLatex: '\\int 6x^5 \\, dx',
    options: ['x^6 + C', '30x^4 + C', '\\frac{6}{5}x^6 + C', '6x^6 + C'],
    correctIndex: 0,
    explanation: 'Regla de la potencia: 6 * (x^6 / 6) = x^6 + C.',
    points: 100
  },
  {
    id: 'sd-2',
    wave: 1,
    waveTitle: 'Oleada 1: Cero Gravedad (Inmediatas)',
    integralLatex: '\\int 4x^3 \\, dx',
    options: ['x^4 + C', '12x^2 + C', '4x^4 + C', '\\frac{4}{3}x^4 + C'],
    correctIndex: 0,
    explanation: 'Regla de la potencia: 4 * (x^4 / 4) = x^4 + C.',
    points: 100
  },
  {
    id: 'sd-3',
    wave: 1,
    waveTitle: 'Oleada 1: Cero Gravedad (Inmediatas)',
    integralLatex: '\\int (3x^2 - 2x + 5) \\, dx',
    options: ['x^3 - x^2 + 5x + C', '6x - 2 + C', '3x^3 - 2x^2 + 5x + C', 'x^3 - 2x^2 + C'],
    correctIndex: 0,
    explanation: 'Integración término a término: x³ - x² + 5x + C.',
    points: 120
  },
  {
    id: 'sd-4',
    wave: 1,
    waveTitle: 'Oleada 1: Cero Gravedad (Inmediatas)',
    integralLatex: '\\int \\frac{3}{\\sqrt{x}} \\, dx',
    options: ['6\\sqrt{x} + C', '3\\sqrt{x} + C', '\\frac{3}{2\\sqrt{x}} + C', '\\frac{2}{3}x^{3/2} + C'],
    correctIndex: 0,
    explanation: 'x^(-1/2) se integra a 2x^(1/2). Multiplicado por 3 da 6√x + C.',
    points: 130
  },
  {
    id: 'sd-5',
    wave: 1,
    waveTitle: 'Oleada 1: Cero Gravedad (Inmediatas)',
    integralLatex: '\\int 7 \\, dx',
    options: ['7x + C', '0 + C', '7x^2 + C', '\\frac{7}{2}x + C'],
    correctIndex: 0,
    explanation: 'La integral de una constante k es kx + C.',
    points: 100
  },

  // --- OLEADA 2: NEBULOSA TRIGONOMÉTRICA ---
  {
    id: 'sd-6',
    wave: 2,
    waveTitle: 'Oleada 2: Nebulosa Trigonométrica',
    integralLatex: '\\int \\cos(4x) \\, dx',
    options: ['\\frac{1}{4}\\sin(4x) + C', '-\\frac{1}{4}\\sin(4x) + C', '4\\sin(4x) + C', '-\\sin(4x) + C'],
    correctIndex: 0,
    explanation: 'Sustitución lineal u = 4x, du = 4 dx => (1/4) sin(4x) + C.',
    points: 150
  },
  {
    id: 'sd-7',
    wave: 2,
    waveTitle: 'Oleada 2: Nebulosa Trigonométrica',
    integralLatex: '\\int \\sin(3x) \\, dx',
    options: ['-\\frac{1}{3}\\cos(3x) + C', '\\frac{1}{3}\\cos(3x) + C', '-3\\cos(3x) + C', '\\cos(3x) + C'],
    correctIndex: 0,
    explanation: 'La antiderivada de sin(kx) es -(1/k) cos(kx) + C.',
    points: 150
  },
  {
    id: 'sd-8',
    wave: 2,
    waveTitle: 'Oleada 2: Nebulosa Trigonométrica',
    integralLatex: '\\int \\sec^2(2x) \\, dx',
    options: ['\\frac{1}{2}\\tan(2x) + C', '2\\tan(2x) + C', '-\\frac{1}{2}\\tan(2x) + C', '\\tan(2x) + C'],
    correctIndex: 0,
    explanation: 'La derivada de la tangente es sec² => (1/2) tan(2x) + C.',
    points: 160
  },
  {
    id: 'sd-9',
    wave: 2,
    waveTitle: 'Oleada 2: Nebulosa Trigonométrica',
    integralLatex: '\\int \\sec(x)\\tan(x) \\, dx',
    options: ['\\sec(x) + C', '\\tan(x) + C', '-\\sec(x) + C', '\\cos(x) + C'],
    correctIndex: 0,
    explanation: 'Fórmula fundamental: d/dx[sec(x)] = sec(x) tan(x).',
    points: 160
  },
  {
    id: 'sd-10',
    wave: 2,
    waveTitle: 'Oleada 2: Nebulosa Trigonométrica',
    integralLatex: '\\int 2x \\cos(x^2) \\, dx',
    options: ['\\sin(x^2) + C', '-\\sin(x^2) + C', 'x^2\\sin(x^2) + C', '2\\sin(x^2) + C'],
    correctIndex: 0,
    explanation: 'Cambio de variable: u = x², du = 2x dx => ∫ cos(u) du = sin(x²) + C.',
    points: 180
  },

  // --- OLEADA 3: AGUJERO NEGRO EXPONENCIAL & RACIONAL ---
  {
    id: 'sd-11',
    wave: 3,
    waveTitle: 'Oleada 3: Agujero Negro Exponencial',
    integralLatex: '\\int e^{5x} \\, dx',
    options: ['\\frac{1}{5}e^{5x} + C', '5e^{5x} + C', 'e^{5x} + C', '\\frac{1}{5}e^x + C'],
    correctIndex: 0,
    explanation: 'Antiderivada exponencial inmediata: (1/k) e^(kx) + C.',
    points: 200
  },
  {
    id: 'sd-12',
    wave: 3,
    waveTitle: 'Oleada 3: Agujero Negro Exponencial',
    integralLatex: '\\int \\frac{1}{x + 4} \\, dx',
    options: ['\\ln|x + 4| + C', '\\frac{1}{(x + 4)^2} + C', '-\\frac{1}{x + 4} + C', '\\ln(4x) + C'],
    correctIndex: 0,
    explanation: 'Forma logarítmica canónica ∫ du / u = ln|u| + C.',
    points: 200
  },
  {
    id: 'sd-13',
    wave: 3,
    waveTitle: 'Oleada 3: Agujero Negro Exponencial',
    integralLatex: '\\int \\frac{2x}{x^2 + 1} \\, dx',
    options: ['\\ln(x^2 + 1) + C', '2\\arctan(x) + C', '\\frac{1}{x^2 + 1} + C', '\\ln|2x| + C'],
    correctIndex: 0,
    explanation: 'u = x² + 1, du = 2x dx => ∫ du / u = ln(x² + 1) + C.',
    points: 220
  },
  {
    id: 'sd-14',
    wave: 3,
    waveTitle: 'Oleada 3: Agujero Negro Exponencial',
    integralLatex: '\\int \\frac{1}{1 + x^2} \\, dx',
    options: ['\\arctan(x) + C', '\\arcsin(x) + C', '\\ln(1 + x^2) + C', '\\tan(x) + C'],
    correctIndex: 0,
    explanation: 'Derivada directa de la función arco tangente.',
    points: 220
  },
  {
    id: 'sd-15',
    wave: 3,
    waveTitle: 'Oleada 3: Agujero Negro Exponencial',
    integralLatex: '\\int \\frac{1}{\\sqrt{1 - x^2}} \\, dx',
    options: ['\\arcsin(x) + C', '\\arccos(x) + C', '\\arctan(x) + C', '\\ln|1 - x^2| + C'],
    correctIndex: 0,
    explanation: 'Derivada inmediata de la función arco seno.',
    points: 220
  },

  // --- OLEADA 4: NÚCLEO CUÁNTICO (POR PARTES & AVANZADAS) ---
  {
    id: 'sd-16',
    wave: 4,
    waveTitle: 'Oleada 4: Núcleo Cuántico (Por Partes)',
    integralLatex: '\\int x e^x \\, dx',
    options: ['e^x(x - 1) + C', 'e^x(x + 1) + C', 'x^2 e^x + C', '\\frac{1}{2}x^2 e^x + C'],
    correctIndex: 0,
    explanation: 'Por partes: u = x, dv = e^x dx => x e^x - ∫ e^x dx = e^x(x - 1) + C.',
    points: 260
  },
  {
    id: 'sd-17',
    wave: 4,
    waveTitle: 'Oleada 4: Núcleo Cuántico (Por Partes)',
    integralLatex: '\\int \\ln(x) \\, dx',
    options: ['x\\ln(x) - x + C', '\\frac{1}{x} + C', 'x\\ln(x) + C', '\\frac{(\\ln x)^2}{2} + C'],
    correctIndex: 0,
    explanation: 'Por partes: u = ln(x), dv = dx => x ln(x) - ∫ x(1/x) dx = x ln(x) - x + C.',
    points: 260
  },
  {
    id: 'sd-18',
    wave: 4,
    waveTitle: 'Oleada 4: Núcleo Cuántico (Por Partes)',
    integralLatex: '\\int x \\cos(x) \\, dx',
    options: ['x\\sin(x) + \\cos(x) + C', 'x\\sin(x) - \\cos(x) + C', '-x\\sin(x) + C', '\\frac{1}{2}x^2\\sin(x) + C'],
    correctIndex: 0,
    explanation: 'Por partes: u = x, dv = cos(x) dx => x sin(x) - ∫ sin(x) dx = x sin(x) + cos(x) + C.',
    points: 280
  },
  {
    id: 'sd-19',
    wave: 4,
    waveTitle: 'Oleada 4: Núcleo Cuántico (Por Partes)',
    integralLatex: '\\int \\frac{1}{x^2 + 9} \\, dx',
    options: ['\\frac{1}{3}\\arctan\\left(\\frac{x}{3}\\right) + C', '\\arctan\\left(\\frac{x}{3}\\right) + C', '\\frac{1}{9}\\arctan(x) + C', '\\ln|x^2 + 9| + C'],
    correctIndex: 0,
    explanation: 'Forma canónica ∫ dx / (x² + a²) con a = 3 => (1/3) arctan(x/3) + C.',
    points: 280
  },
  {
    id: 'sd-20',
    wave: 4,
    waveTitle: 'Oleada 4: Núcleo Cuántico (Por Partes)',
    integralLatex: '\\int x \\sqrt{x^2 + 1} \\, dx',
    options: ['\\frac{1}{3}(x^2 + 1)^{3/2} + C', '\\frac{2}{3}(x^2 + 1)^{3/2} + C', '(x^2 + 1)^{3/2} + C', '\\frac{1}{2}(x^2 + 1)^2 + C'],
    correctIndex: 0,
    explanation: 'u = x² + 1, du = 2x dx => (1/2) * (2/3) u^(3/2) = (1/3)(x² + 1)^(3/2) + C.',
    points: 300
  }
];
