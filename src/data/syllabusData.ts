import { UnitData } from '../types';

export const SYLLABUS_UNITS: UnitData[] = [
  {
    id: 1,
    code: 'UNIDAD 1',
    title: 'Teorema Fundamental del Cálculo',
    badge: 'Fundamentos & Límites de Riemann',
    summary: 'Estudio de la acumulación continua, particiones finitas, sumas de Riemann, Darboux y la conexión inversa entre derivación e integración formalizada por Barrow, Newton y Leibniz.',
    gradient: 'from-blue-600 via-indigo-600 to-cyan-500',
    accentColor: '#3b82f6',
    subtopics: [
      {
        id: 'u1-1',
        code: '1.1',
        title: 'Medición aproximada de figuras amorfas',
        summary: 'De la cuadratura clásica de Arquímedes a las sumas rectangulares y parabólicas modernas.',
        details: [
          'El Papiro de Moscú (1850 a.C.) y el método de exhaución de Arquímedes con polígonos de hasta 96 lados.',
          'Principio de Cavalieri (1635) y los indivisibles como precursores del diferencial dx.',
          'Comparativa analítica entre Sumas por la Izquierda (Ln), Derecha (Rn), Punto Medio (Mn) y Trapecios (Tn).',
          'Regla de Simpson (Sn): Interpolación cuadrática con aceleración de error cuártico O(Δx⁴).'
        ],
        formulas: [
          '\\Delta x = \\frac{b - a}{n}',
          'T_n = \\frac{\\Delta x}{2} [f(x_0) + 2f(x_1) + \\dots + 2f(x_{n-1}) + f(x_n)]',
          'S_n = \\frac{\\Delta x}{3} [f(x_0) + 4f(x_1) + 2f(x_2) + 4f(x_3) + \\dots + 4f(x_{n-1}) + f(x_n)]'
        ],
        historicalNote: 'Arquímedes demostró que el área de un segmento parabólico equivale exactamente a 4/3 del triángulo inscrito, utilizando series infinitas de razón 1/4.',
        figureUrl: '/figures/fig_1_1_arquimedes_exhaucion.png',
        figureCaption: 'Método de Exhaución de Arquímedes para acotar áreas curvilíneas.'
      },
      {
        id: 'u1-2',
        code: '1.2',
        title: 'Notación sumatoria y propiedades lineales',
        summary: 'Operador Sigma de Fourier, propiedades de linealidad y fórmulas de potencias de Faulhaber.',
        details: [
          'Definición del operador sigma con variable muda y límites enteros.',
          'Homogeneidad escalar, aditividad distributiva y propiedades telescópicas.',
          'Fórmulas cerradas de Faulhaber para potencias enteras i, i², i³ e i⁴.'
        ],
        formulas: [
          '\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}',
          '\\sum_{i=1}^{n} i^2 = \\frac{n(n+1)(2n+1)}{6}',
          '\\sum_{i=1}^{n} i^3 = \\left[ \\frac{n(n+1)}{2} \\right]^2 = \\frac{n^2(n+1)^2}{4}'
        ],
        historicalNote: 'A los 7 años, Carl Friedrich Gauss dedujo instantáneamente la suma de los primeros 100 enteros sumando extremos opuestos: (1+100) × 50 = 5050.'
      },
      {
        id: 'u1-3',
        code: '1.3',
        title: 'Sumas de Riemann y sumas de Darboux',
        summary: 'Partición general arbitraria, norma de partición, sumas superiores e inferiores.',
        details: [
          'Partición P: conjunto de nodos x_0 < x_1 < ... < x_n con anchos arbitrarios Δx_i.',
          'Norma de la partición ||P|| como el semiancho máximo.',
          'Sumas de Darboux con supremo M_i e ínfimo m_i; criterio de integrabilidad de Cauchy: U(P) - L(P) < ε.'
        ],
        formulas: [
          'S(f, \\mathcal{P}, \\{x_i^*\\}) = \\sum_{i=1}^{n} f(x_i^*) \\Delta x_i',
          'L(f, \\mathcal{P}) \\le \\int_{a}^{b} f(x)dx \\le U(f, \\mathcal{P})'
        ],
        figureUrl: '/figures/fig_1_3_convergencia_integral.png',
        figureCaption: 'Convergencia de sumas de Riemann al refinar la partición.'
      },
      {
        id: 'u1-4',
        code: '1.4',
        title: 'Definición formal de integral definida',
        summary: 'Límite formal en sentido Épsilon-Delta y significado geométrico y dimensional.',
        details: [
          'Límite de sumas de Riemann cuando la norma tiende a cero.',
          'Diferencia cardinal entre área neta con signo y área geométrica absoluta.',
          'Análisis dimensional: el producto f(x)dx hereda las unidades multiplicadas de ambos ejes.'
        ],
        formulas: [
          '\\int_{a}^{b} f(x) \\, dx = \\lim_{\\|\\mathcal{P}\\| \\to 0} \\sum_{i=1}^{n} f(x_i^*) \\Delta x_i',
          'A_{\\text{geométrica}} = \\int_{a}^{b} |f(x)| \\, dx'
        ]
      },
      {
        id: 'u1-5',
        code: '1.5',
        title: 'Teorema de existencia de la integral',
        summary: 'Condiciones de continuidad global, continuidad seccional a trozos y monotonía.',
        details: [
          'Toda función continua en un intervalo cerrado [a, b] es integrable de Riemann.',
          'Funciones con un número finito de discontinuidades de salto finito son integrables.',
          'Criterio de Lebesgue: Una función acotada es integrable sii sus discontinuidades forman un conjunto de medida cero.'
        ],
        formulas: [
          'f \\in C[a, b] \\implies f \\in \\mathcal{R}[a, b]'
        ]
      },
      {
        id: 'u1-6',
        code: '1.6',
        title: 'Propiedades algebraicas y analíticas',
        summary: 'Linealidad completa, aditividad de dominios, desigualdades y simetrías pares/impares.',
        details: [
          'Homogeneidad e inversión de límites: ∫_a^b = -∫_b^a.',
          'Aditividad de intervalos: ∫_a^b = ∫_a^c + ∫_c^b.',
          'Desigualdad triangular y Desigualdad de Cauchy-Schwarz para integrales.',
          'Simetría en dominios [-a, a]: integrales de funciones impares se anulan idénticamente.'
        ],
        formulas: [
          '\\left| \\int_{a}^{b} f(x)dx \\right| \\le \\int_{a}^{b} |f(x)|dx',
          '\\left( \\int_{a}^{b} f(x)g(x)dx \\right)^2 \\le \\left( \\int_{a}^{b} f(x)^2 dx \\right) \\left( \\int_{a}^{b} g(x)^2 dx \\right)',
          '\\int_{-a}^{a} f_{\\text{impar}}(x)dx = 0, \\quad \\int_{-a}^{a} f_{\\text{par}}(x)dx = 2\\int_{0}^{a} f(x)dx'
        ]
      },
      {
        id: 'u1-7',
        code: '1.7',
        title: 'Función primitiva (Antiderivada)',
        summary: 'Familia uniparamétrica de curvas F(x) + C y unicidad bajo condiciones iniciales.',
        details: [
          'F(x) es primitiva de f(x) si F\'(x) = f(x).',
          'La constante C representa un desplazamiento vertical rígido con idéntica pendiente tangencial.',
          'Condición inicial y(x_0) = y_0 fija de manera unívoca la curva solución.'
        ],
        formulas: [
          '\\int f(x) \\, dx = F(x) + C'
        ],
        figureUrl: '/figures/fig_2_1_familia_antiderivadas.png',
        figureCaption: 'Familia de antiderivadas con idéntica pendiente tangencial en cualquier abscisa x.'
      },
      {
        id: 'u1-8',
        code: '1.8',
        title: 'Teorema del valor medio para integrales',
        summary: 'Existencia de la altura media c y su aplicación en cálculo de voltajes eficaces RMS.',
        details: [
          'Toda función continua en [a, b] alcanza su valor promedio en al menos un punto interior c.',
          'Interpretación geométrica: El área bajo la curva equivale al rectángulo de base (b-a) y altura f(c).',
          'En ingeniería eléctrica: El voltaje eficaz de la red monofásica V_rms = V_pico / √2 proviene de esta integral.'
        ],
        formulas: [
          'f(c) = \\frac{1}{b - a} \\int_{a}^{b} f(x) \\, dx',
          'V_{\\text{rms}} = \\sqrt{\\frac{1}{T} \\int_{0}^{T} [V(t)]^2 dt} = \\frac{V_{\\text{máx}}}{\\sqrt{2}}'
        ],
        figureUrl: '/figures/fig_1_4_teorema_valor_medio.png',
        figureCaption: 'Teorema del Valor Medio para integrales continuas.'
      },
      {
        id: 'u1-9',
        code: '1.9',
        title: 'Teorema Fundamental del Cálculo (Partes 1 y 2)',
        summary: 'Demostración de la función de acumulación g(x) y la Regla de Barrow / Newton-Leibniz.',
        details: [
          'TFC Parte 1: Si g(x) = ∫_a^x f(t)dt, entonces g\'(x) = f(x). La acumulación se deriva instantáneamente.',
          'Regla de derivación de Leibniz para límites móviles g(x) = ∫_{u(x)}^{v(x)} f(t)dt.',
          'TFC Parte 2 (Regla de Barrow): ∫_a^b f(x)dx = F(b) - F(a).'
        ],
        formulas: [
          '\\frac{d}{dx} \\left[ \\int_{a}^{x} f(t) \\, dt \\right] = f(x)',
          '\\frac{d}{dx} \\left[ \\int_{u(x)}^{v(x)} f(t) \\, dt \\right] = f(v(x)) v\'(x) - f(u(x)) u\'(x)',
          '\\int_{a}^{b} f(x) \\, dx = F(b) - F(a) = \\left[ F(x) \\right]_{a}^{b}'
        ],
        figureUrl: '/figures/fig_1_5_tfc_acumulacion.png',
        figureCaption: 'Función de acumulación continua g(x) y su derivada f(x).'
      },
      {
        id: 'u1-10',
        code: '1.10',
        title: 'Cálculo de integrales definidas básicas',
        summary: 'Aplicación combinada de Barrow, cambio de variable en límites y simetrías.',
        details: [
          'Evaluación analítica sin límites de sumas rectangulares.',
          'Transformación de límites al sustituir variables: u(a) y u(b).',
          'Integrales elementales de funciones trigonométricas y exponenciales.'
        ],
        formulas: [
          '\\int_{0}^{\\pi/2} \\cos(x) \\, dx = [\\sin(x)]_{0}^{\\pi/2} = 1 - 0 = 1'
        ]
      }
    ],
    masterProblems: [
      {
        id: 'mp-1-1',
        number: '1.1',
        title: 'Límite de Riemann Formal para Función Cuadrática f(x) = 2x² - 3x + 1',
        statement: 'Evaluar analíticamente mediante el límite de Sumas de Riemann en el intervalo [1, 4]:',
        statementMath: '\\int_{1}^{4} (2x^2 - 3x + 1) \\, dx',
        steps: [
          { label: 'Paso 1: Malla regular', description: 'Δx = (4 - 1)/n = 3/n.', math: '\\Delta x = \\frac{3}{n}' },
          { label: 'Paso 2: Nodos de muestreo', description: 'x_i = 1 + iΔx = 1 + 3i/n.', math: 'x_i = 1 + \\frac{3i}{n}' },
          { label: 'Paso 3: Evaluación del integrando', description: 'f(x_i) = 2(1 + 3i/n)² - 3(1 + 3i/n) + 1 = 18i²/n² + 3i/n.', math: 'f(x_i) = \\frac{18i^2}{n^2} + \\frac{3i}{n}' },
          { label: 'Paso 4: Sumatoria y Faulhaber', description: 'S_n = (3/n) [ (18/n²) Σ i² + (3/n) Σ i ] = 54/n³ [n(n+1)(2n+1)/6] + 9/n² [n(n+1)/2].', math: 'S_n = 9\\frac{2n^2+3n+1}{n^2} + \\frac{9}{2}\\frac{n+1}{n} = 22.5 + \\frac{31.5}{n} + \\frac{9}{n^2}' },
          { label: 'Paso 5: Límite al infinito', description: 'Al tender n → ∞, los términos divididos entre n se anulan.', math: '\\lim_{n \\to \\infty} S_n = 22.5 = \\frac{45}{2}' }
        ],
        finalResult: '45/2 = 22.5 unidades cuadradas (comprobado por Barrow: [2x³/3 - 3x²/2 + x]₁⁴ = 45/2).'
      },
      {
        id: 'mp-1-2',
        number: '1.2',
        title: 'Derivación de Leibniz con Límites Trascendentes Dobles',
        statement: 'Calcular la derivada de la función de acumulación con límites dependientes de x:',
        statementMath: 'F(x) = \\int_{\\sin(2x)}^{x^3} \\sqrt{1 + t^4} \\, dt',
        steps: [
          { label: 'Paso 1: Identificación', description: 'u(x) = sin(2x) => u\'(x) = 2cos(2x); v(x) = x³ => v\'(x) = 3x².' },
          { label: 'Paso 2: Fórmula de Leibniz', description: 'F\'(x) = f(v(x))·v\'(x) - f(u(x))·u\'(x).', math: 'F\'(x) = \\sqrt{1 + (x^3)^4}(3x^2) - \\sqrt{1 + (\\sin(2x))^4}(2\\cos(2x))' },
          { label: 'Paso 3: Reducción algebraica', description: 'Multiplicamos factores ordenando monomios.', math: 'F\'(x) = 3x^2\\sqrt{1 + x^{12}} - 2\\cos(2x)\\sqrt{1 + \\sin^4(2x)}' }
        ],
        finalResult: '3x²√(1 + x¹²) - 2cos(2x)√(1 + sin⁴(2x)).'
      }
    ],
    exercises: [
      { id: 'ex-1-1', code: 'E-1.1', statement: 'Calcular la suma de Riemann para f(x) = x² + 1 en [0, 3] con n = 6 extremos derechos.', solution: 'Δx = 0.5. Evaluaciones f(x_i) = {1.25, 2.0, 3.25, 5.0, 7.25, 10.0}. Suma = 14.375 u² (Valor exacto = 12.0 u²).', category: 'Riemann' },
      { id: 'ex-1-2', code: 'E-1.2', statement: 'Aproximar ∫₀¹ e^(-x²) dx mediante la Regla de Simpson con n = 4.', solution: 'S₄ = (0.25/3)[1 + 4(0.9394) + 2(0.7788) + 4(0.5698) + 0.3679] ≈ 0.74686 (Error < 0.00004).', category: 'Simpson' },
      { id: 'ex-1-3', code: 'E-1.3', statement: 'Hallar el valor medio de f(x) = √x en [0, 4] y el punto c del Teorema del Valor Medio.', solution: 'Integral = 16/3. f_prom = (1/4)(16/3) = 4/3. Punto c: √c = 4/3 => c = 16/9 ≈ 1.778 ∈ (0, 4).', category: 'TVM' },
      { id: 'ex-1-4', code: 'E-1.4', statement: 'Evaluar por propiedades de simetría: ∫₋₃³ (x⁷ cos(x³) + 4) dx.', solution: 'x⁷ cos(x³) es impar (integral = 0), 4 es par => ∫₋₃³ 4 dx = 4(3 - (-3)) = 24.', category: 'Simetría' }
    ]
  },
  {
    id: 2,
    code: 'UNIDAD 2',
    title: 'Métodos de Integración e Integral Indefinida',
    badge: 'Técnicas Analíticas Avanzadas',
    summary: 'Desarrollo exhaustivo de técnicas de integración: sustitución simple y racionalizante, integración por partes tabular, fórmulas de reducción, sustitución trigonométrica, fracciones parciales y sustitución de Weierstrass.',
    gradient: 'from-indigo-600 via-purple-600 to-pink-500',
    accentColor: '#8b5cf6',
    subtopics: [
      {
        id: 'u2-1',
        code: '2.1',
        title: 'Integral indefinida y familia de curvas',
        summary: 'Significado de la constante arbitraria +C y problemas de valor inicial.',
        details: [
          'La integración indefinida reconstruye la antiderivada global F(x) a partir de f(x).',
          'La paradoja de las primitivas: sin²(x) y -cos²(x) difieren solo en una constante (sin²x = 1 - cos²x).',
          'Determinación de curvas particulares mediante condiciones iniciales en física y circuitos.'
        ],
        formulas: [
          '\\int f(x)dx = F(x) + C \\iff F\'(x) = f(x)'
        ]
      },
      {
        id: 'u2-2',
        code: '2.2',
        title: 'Propiedades de linealidad de la integral indefinida',
        summary: 'Extracción de escalares y descomposición distributiva de combinaciones lineales.',
        details: [
          'Homogeneidad: ∫ k f(x) dx = k ∫ f(x) dx.',
          'Aditividad: ∫ [f(x) ± g(x)] dx = ∫ f(x) dx ± ∫ g(x) dx.'
        ],
        formulas: [
          '\\int [\\alpha f(x) + \\beta g(x)] dx = \\alpha \\int f(x)dx + \\beta \\int g(x)dx'
        ]
      },
      {
        id: 'u2-3-1',
        code: '2.3.1',
        title: 'Integrales directas e inmediatas (Tabla Maestra Extendida)',
        summary: 'Compendio de formas algebraicas, trigonométricas, hiperbólicas e inversas.',
        details: [
          'Regla de la potencia generalizada: ∫ uⁿ du = uⁿ⁺¹/(n+1) + C (n ≠ -1).',
          'Formas logarítmicas y exponenciales fundamentales.',
          'Formas trigonométricas inversas con parámetros a² ± u².',
          'Formas hiperbólicas: sinh, cosh, sech² y sus primitivas.'
        ],
        formulas: [
          '\\int \\frac{du}{\\sqrt{a^2 - u^2}} = \\arcsin\\left(\\frac{u}{a}\\right) + C',
          '\\int \\frac{du}{a^2 + u^2} = \\frac{1}{a}\\arctan\\left(\\frac{u}{a}\\right) + C',
          '\\int \\sec(u)du = \\ln|\\sec(u) + \\tan(u)| + C'
        ]
      },
      {
        id: 'u2-3-2',
        code: '2.3.2',
        title: 'Método de cambio de variable y sustitución racionalizante',
        summary: 'Regla de la cadena inversa y eliminación de raíces uⁿ = ax + b.',
        details: [
          'Sustitución simple: Identificación del bloque interior g(x) y su diferencial g\'(x)dx.',
          'Sustitución racionalizante: Transformación uⁿ = ax + b que elimina radicales fraccionarios.',
          'Ejemplo clásico: ∫ dx / (x - √(x+2)) se transforma en una función racional simple en u.'
        ],
        formulas: [
          '\\int f(g(x)) g\'(x) dx = \\int f(u) du = F(u) + C',
          'u^n = ax + b \\implies dx = \\frac{n u^{n-1}}{a} du'
        ]
      },
      {
        id: 'u2-3-3',
        code: '2.3.3',
        title: 'Método de integración por partes y fórmulas de reducción',
        summary: 'Regla ILATE, método tabular de derivación sucesiva e integrales de Wallis.',
        details: [
          'Derivación de ∫ u dv = u v - ∫ v du a partir de la regla del producto de Leibniz.',
          'Regla mnemotécnica ILATE (Inversas, Logarítmicas, Algebraicas, Trigonométricas, Exponenciales).',
          'Método tabular para polinomios multiplicados por senos, cosenos o exponenciales.',
          'Integrales cíclicas (e^(ax) cos(bx)) y fórmulas recursivas de Wallis en [0, π/2].'
        ],
        formulas: [
          '\\int u \\, dv = u \\cdot v - \\int v \\, du',
          '\\int_{0}^{\\pi/2} \\sin^n(x)dx = \\frac{n-1}{n} \\frac{n-3}{n-2} \\cdots \\frac{1}{2} \\frac{\\pi}{2} \\quad (n \\text{ par})'
        ]
      },
      {
        id: 'u2-3-4',
        code: '2.3.4',
        title: 'Integrales trigonométricas y Sustitución de Weierstrass',
        summary: 'Potencias de senos y cosenos, prostaféresis y la sustitución universal t = tan(x/2).',
        details: [
          'Criterios de potencias pares (identidades de ángulo doble) e impares (separación de diferencial).',
          'Sustitución universal de Weierstrass: transforma funciones racionales trigonométricas complejas en cocientes algebraicos puros.'
        ],
        formulas: [
          't = \\tan\\left(\\frac{x}{2}\\right) \\implies dx = \\frac{2dt}{1+t^2}, \\quad \\sin(x) = \\frac{2t}{1+t^2}, \\quad \\cos(x) = \\frac{1-t^2}{1+t^2}'
        ]
      },
      {
        id: 'u2-3-5',
        code: '2.3.5',
        title: 'Método de sustitución trigonométrica',
        summary: 'Parametrización de triángulos rectángulos y trinomios cuadráticos generales.',
        details: [
          'Caso 1: √(a² - u²) => u = a sin θ, du = a cos θ dθ.',
          'Caso 2: √(a² + u²) => u = a tan θ, du = a sec² θ dθ.',
          'Caso 3: √(u² - a²) => u = a sec θ, du = a sec θ tan θ dθ.',
          'Completación previa del trinomio cuadrado perfecto ax² + bx + c = (x+h)² ± k².'
        ],
        formulas: [
          '\\sqrt{a^2 - u^2} = a \\cos\\theta, \\quad \\sqrt{a^2 + u^2} = a \\sec\\theta, \\quad \\sqrt{u^2 - a^2} = a \\tan\\theta'
        ],
        figureUrl: '/figures/fig_2_2_triangulos_sust_trig.png',
        figureCaption: 'Triángulos de referencia fundamentales para sustitución trigonométrica.'
      },
      {
        id: 'u2-3-6',
        code: '2.3.6',
        title: 'Integración por fracciones parciales',
        summary: 'Los 4 casos algebraicos y el Método de Cobertura de Heaviside.',
        details: [
          'Caso I: Factores lineales distintos A/(x - r).',
          'Caso II: Factores lineales repetidos A₁/(x - r) + A₂/(x - r)² + ...',
          'Caso III: Factores cuadráticos irreducibles (Ax + B)/(ax² + bx + c).',
          'Caso IV: Factores cuadráticos repetidos.',
          'Método de Heaviside: Cálculo instantáneo de coeficientes evaluando en las raíces reales.'
        ],
        formulas: [
          'A_k = \\lim_{x \\to r_k} \\left[ (x - r_k) \\frac{P(x)}{Q(x)} \\right]'
        ]
      }
    ],
    masterProblems: [
      {
        id: 'mp-2-1',
        number: '2.1',
        title: 'Sustitución Universal de Weierstrass para Función Racional Trigonométrica',
        statement: 'Evaluar analíticamente:',
        statementMath: '\\int \\frac{dx}{3 + 5\\cos(x)}',
        steps: [
          { label: 'Paso 1: Cambio de variable t', description: 't = tan(x/2), dx = 2dt/(1+t²), cos(x) = (1-t²)/(1+t²).' },
          { label: 'Paso 2: Sustitución en integrando', description: '∫ [2dt/(1+t²)] / [3 + 5(1-t²)/(1+t²)] = ∫ 2dt / (3 + 3t² + 5 - 5t²) = ∫ 2dt / (8 - 2t²) = ∫ dt / (4 - t²).', math: '\\int \\frac{dt}{4 - t^2}' },
          { label: 'Paso 3: Forma directa estándar', description: 'Reconocemos ∫ dt / (a² - t²) = (1/2a) ln|(a+t)/(a-t)| + C con a = 2.', math: '\\frac{1}{2(2)} \\ln\\left| \\frac{2 + t}{2 - t} \\right| + C' },
          { label: 'Paso 4: Retorno a variable x', description: 'Sustituimos t = tan(x/2).', math: '\\frac{1}{4} \\ln\\left| \\frac{2 + \\tan(x/2)}{2 - \\tan(x/2)} \\right| + C' }
        ],
        finalResult: '(1/4) ln|(2 + tan(x/2)) / (2 - tan(x/2))| + C.'
      },
      {
        id: 'mp-2-2',
        number: '2.2',
        title: 'Integración por Partes Tabular para Polinomio Cúbico',
        statement: 'Evaluar analíticamente:',
        statementMath: '\\int (2x^3 - 5x) \\sin(3x) \\, dx',
        steps: [
          { label: 'Paso 1: Columna de derivadas u', description: '2x³ - 5x => 6x² - 5 => 12x => 12 => 0.' },
          { label: 'Paso 2: Columna de integrales v', description: 'sin(3x) => -(1/3)cos(3x) => -(1/9)sin(3x) => (1/27)cos(3x) => (1/81)sin(3x).' },
          { label: 'Paso 3: Producto diagonal con signos (+, -, +, -)', description: 'Multiplicamos cruzado y agrupamos coeficientes en cos(3x) y sin(3x).', math: '\\cos(3x)\\left[ \\frac{19x - 6x^3}{9} \\right] + \\sin(3x)\\left[ \\frac{18x^2 - 19}{27} \\right] + C' }
        ],
        finalResult: '[(19x - 6x³)/9] cos(3x) + [(18x² - 19)/27] sin(3x) + C.'
      }
    ],
    exercises: [
      { id: 'ex-2-1', code: 'E-2.1', statement: 'Evaluar: ∫ x⁴ e^(-3x) dx mediante el método tabular.', solution: '-e^(-3x) [x⁴/3 + 4x³/9 + 4x²/9 + 8x/27 + 8/81] + C.', category: 'Partes' },
      { id: 'ex-2-2', code: 'E-2.2', statement: 'Evaluar: ∫ dx / [x² √(x² + 16)] mediante sustitución trigonométrica.', solution: '-√(x² + 16) / (16x) + C.', category: 'Sust. Trig' },
      { id: 'ex-2-3', code: 'E-2.3', statement: 'Evaluar: ∫ (2x + 1) / [(x - 1)² (x + 2)] dx por fracciones parciales.', solution: '(1/3) ln|x - 1| - 1/(x - 1) - (1/3) ln|x + 2| + C.', category: 'Frac. Parciales' },
      { id: 'ex-2-4', code: 'E-2.4', statement: 'Evaluar: ∫ sec³(x) dx.', solution: '(1/2) sec(x) tan(x) + (1/2) ln|sec(x) + tan(x)| + C.', category: 'Trigonométrica' }
    ]
  },
  {
    id: 3,
    code: 'UNIDAD 3',
    title: 'Aplicaciones de la Integral',
    badge: 'Modelado Físico y Geométrico',
    summary: 'Cálculo de áreas planas (dx y dy), longitud de arco, Catenaria, sólidos de revolución (Discos, Arandelas, Cascarones), Paradoja de la Trompeta de Gabriel, integrales impropias, función Gamma, trabajo mecánico y física avanzada.',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-500',
    accentColor: '#10b981',
    subtopics: [
      {
        id: 'u3-1',
        code: '3.1',
        title: 'Áreas de regiones planas',
        summary: 'Área neta con signo, área absoluta y franjas diferenciales dx y dy.',
        details: [
          'Área bajo una curva: A = ∫_a^b |f(x)| dx.',
          'Área entre dos funciones: Franja vertical dx: A = ∫ [y_sup(x) - y_inf(x)] dx.',
          'Franja horizontal dy: A = ∫ [x_der(y) - x_izq(y)] dy cuando las funciones son multivaluadas en x.',
          'El Planímetro Polar de Amsler (1854): Medición mecánica de áreas por el Teorema de Green.'
        ],
        formulas: [
          'A = \\int_{a}^{b} [f(x) - g(x)] \\, dx = \\int_{c}^{d} [x_D(y) - x_I(y)] \\, dy'
        ],
        figureUrl: '/figures/fig_3_1_area_bajo_curva_signos.png',
        figureCaption: 'Diferencia fundamental entre área neta con signo y área geométrica absoluta.'
      },
      {
        id: 'u3-2',
        code: '3.2',
        title: 'Longitud de curvas planas y la Catenaria',
        summary: 'Elemento diferencial de arco ds y modelado de cables de transmisión eléctrica.',
        details: [
          'Diferencial de arco derivado de Pitágoras: ds = √(dx² + dy²).',
          'Deducción de la curva Catenaria y = a cosh(x/a) en cables suspendidos.',
          'Cálculo de la longitud exacta de conductores eléctricos entre torres de transmisión.'
        ],
        formulas: [
          'L = \\int_{a}^{b} \\sqrt{1 + [f\'(x)]^2} \\, dx = 2a \\sinh\\left(\\frac{x_0}{a}\\right)'
        ],
        figureUrl: '/figures/fig_3_12_catenaria_cable.png',
        figureCaption: 'Curva de la catenaria en cables de transmisión eléctrica.'
      },
      {
        id: 'u3-3',
        code: '3.3',
        title: 'Cálculo de volúmenes de sólidos de revolución',
        summary: 'Discos, Arandelas, Cascarones Cilíndricos y la Paradoja de la Trompeta de Gabriel.',
        details: [
          'Tratado de Johannes Kepler (1615) y los barriles de vino de Linz.',
          'Método de Discos (secciones circulares macizas perpendiculares al eje de giro).',
          'Método de Arandelas (regiones huecas con radio exterior R(x) e interior r(x)).',
          'Método de Cascarones Cilíndricos (capas concéntricas paralelas al eje de giro).',
          'Paradoja de la Trompeta de Gabriel (Torricelli, 1641): Volumen finito V = π y superficie exterior infinita S = ∞.'
        ],
        formulas: [
          'V_{\\text{Discos}} = \\pi \\int_{a}^{b} [R(x)]^2 dx',
          'V_{\\text{Arandelas}} = \\pi \\int_{a}^{b} ([R(x)]^2 - [r(x)]^2) dx',
          'V_{\\text{Cascarones}} = 2\\pi \\int_{a}^{b} p(x) h(x) dx'
        ],
        figureUrl: '/figures/fig_3_11_trompeta_gabriel.png',
        figureCaption: 'La Trompeta de Gabriel: Sólido con volumen finito V = π y área superficial infinita.'
      },
      {
        id: 'u3-4',
        code: '3.4',
        title: 'Integrales impropias y la Función Gamma de Euler',
        summary: 'Límites infinitos (Tipo I), asíntotas no acotadas (Tipo II) y generalización del factorial.',
        details: [
          'Integrales Tipo I en [a, ∞): lim_{t→∞} ∫_a^t f(x)dx.',
          'Integrales Tipo II con discontinuidades interiores infinitas.',
          'Función Gamma de Euler Γ(α) = ∫₀^∞ t^(α-1) e^(-t) dt.',
          'Relación fundamental: Γ(n + 1) = n! y el valor singular Γ(1/2) = √π.'
        ],
        formulas: [
          '\\Gamma(\\alpha) = \\int_{0}^{\\infty} t^{\\alpha - 1} e^{-t} dt, \\quad \\Gamma(n+1) = n!, \\quad \\Gamma(1/2) = \\sqrt{\\pi}'
        ],
        figureUrl: '/figures/fig_3_8_integral_impropia_tipo1.png',
        figureCaption: 'Integral impropia convergente Tipo I: ∫₁^∞ (1/x²) dx = 1.'
      },
      {
        id: 'u3-5',
        code: '3.5',
        title: 'Aplicaciones en ingeniería y física avanzada',
        summary: 'Ecuación del cohete de Tsiolkovsky, ley de Hooke, bombeo de tanques y momentos de inercia.',
        details: [
          'Propulsión aeroespacial: Deducción de Δv = v_e ln(m_0 / m_f).',
          'Resistencia de materiales: Momento de inercia de área I_x = ∫ y² dA.',
          'Termodinámica: Trabajo de expansión isotérmica W = nRT ln(V₂ / V₁).',
          'Fuerza hidrostática sobre compuertas verticales: F = ∫ w y L(y) dy.'
        ],
        formulas: [
          '\\Delta v = v_e \\ln\\left( \\frac{m_0}{m_f} \\right)',
          'W = \\int_{a}^{b} F(x)dx = \\frac{1}{2} k x^2 \\quad (\\text{Hooke})',
          'F_{\\text{hidro}} = \\int_{0}^{h} w \\cdot y \\cdot L(y) \\, dy'
        ],
        figureUrl: '/figures/fig_3_10_trabajo_resorte_tanque.png',
        figureCaption: 'Trabajo elástico y fuerza de restitución en resortes mecánicos.'
      }
    ],
    masterProblems: [
      {
        id: 'mp-3-1',
        number: '3.1',
        title: 'Área entre Parábola y Recta con Integración Horizontal dy',
        statement: 'Calcular el área encerrada entre x = 8 - y² y la recta x = y + 2:',
        steps: [
          { label: 'Paso 1: Puntos de intersección', description: '8 - y² = y + 2 => y² + y - 6 = 0 => y = -3 y y = 2.' },
          { label: 'Paso 2: Función derecha e izquierda', description: 'En [-3, 2], x_D = 8 - y² y x_I = y + 2.' },
          { label: 'Paso 3: Integral en dy', description: 'A = ∫₋₃² [(8 - y²) - (y + 2)] dy = ∫₋₃² (6 - y - y²) dy.', math: 'A = \\left[ 6y - \\frac{y^2}{2} - \\frac{y^3}{3} \\right]_{-3}^{2}' },
          { label: 'Paso 4: Evaluación numérica', description: '(12 - 2 - 8/3) - (-18 - 9/2 + 9) = 22/3 - (-27/2) = 125/6.', math: 'A = \\frac{125}{6} \\approx 20.833 \\text{ u}^2' }
        ],
        finalResult: '125/6 ≈ 20.833 unidades cuadradas.'
      },
      {
        id: 'mp-3-2',
        number: '3.2',
        title: 'Trabajo de Bombeo para Vaciar Tanque Semiesférico',
        statement: 'Un tanque semiesférico de radio R = 4 m lleno de agua (w = 9800 N/m³). Calcular el trabajo para bombear toda el agua por la cima:',
        steps: [
          { label: 'Paso 1: Rodaja diferencial', description: 'r(y) = √(16 - y²), dV = π(16 - y²) dy, dF = 9800π(16 - y²) dy.' },
          { label: 'Paso 2: Distancia de elevación', description: 'Elevación vertical d = -y (desde y ∈ [-4, 0]).' },
          { label: 'Paso 3: Integral de trabajo', description: 'W = ∫₋₄⁰ 9800π(16 - y²)(-y) dy = 9800π [y⁴/4 - 8y²]₋₄⁰ = 9800π(64).', math: 'W = 627,200\\pi \\approx 1,970,407 \\text{ J} \\approx 1.97 \\text{ MJ}' }
        ],
        finalResult: '627,200π Joules ≈ 1.97 MegaJoules.'
      }
    ],
    exercises: [
      { id: 'ex-3-1', code: 'E-3.1', statement: 'Calcular el volumen al rotar y = sin(x) en [0, π] alrededor del eje x.', solution: 'V = π ∫₀^π sin²(x) dx = π(π/2) = π²/2 ≈ 4.935 u³.', category: 'Volumen' },
      { id: 'ex-3-2', code: 'E-3.2', statement: 'Calcular la longitud de curva de y = ln(sec x) en [0, π/4].', solution: 'y\' = tan x => ds = sec x dx. L = [ln|sec x + tan x|]₀^(π/4) = ln(√2 + 1) ≈ 0.8814 u.', category: 'Longitud' },
      { id: 'ex-3-3', code: 'E-3.3', statement: 'Evaluar la integral impropia: ∫₀^∞ x e^(-x) dx.', solution: 'Integrando por partes => [-x e^(-x) - e^(-x)]₀^∞ = 1. Converge a 1.', category: 'Impropia' },
      { id: 'ex-3-4', code: 'E-3.4', statement: 'Un cohete con v_e = 3000 m/s y m_0/m_f = 10. ¿Cuál es su incremento Δv?', solution: 'Δv = 3000 ln(10) ≈ 3000(2.3026) = 6907.8 m/s ≈ 6.91 km/s.', category: 'Física' }
    ]
  },
  {
    id: 4,
    code: 'UNIDAD 4',
    title: 'Series',
    badge: 'Convergencia y Polinomios de Taylor',
    summary: 'Sucesiones numéricas, límite al infinito, series infinitas, sumas telescópicas, criterios de convergencia (Integral, Razón, Raíz, Raabe, Leibniz, Basilea), series de potencias, radio e intervalo de convergencia, series de Taylor/Maclaurin y evaluación de integrales no elementales.',
    gradient: 'from-amber-600 via-orange-600 to-red-500',
    accentColor: '#f59e0b',
    subtopics: [
      {
        id: 'u4-1',
        code: '4.1',
        title: 'Definición de sucesión numérica y límites al infinito',
        summary: 'Funciones de dominio natural f: ℕ → ℝ, monotonía, acotamiento y razón áurea en Fibonacci.',
        details: [
          'Definición de sucesión {a_n} como lista ordenada infinita.',
          'Convergencia y límite asintótico L = lim_{n→∞} a_n.',
          'La sucesión de Fibonacci y la convergencia de su razón F_{n+1}/F_n al Número de Oro φ ≈ 1.618033.'
        ],
        formulas: [
          '\\lim_{n \\to \\infty} \\frac{F_{n+1}}{F_n} = \\phi = \\frac{1 + \\sqrt{5}}{2} \\approx 1.618033'
        ],
        figureUrl: '/figures/fig_4_1_convergencia_sucesion.png',
        figureCaption: 'Convergencia asintótica de sucesiones numéricas.'
      },
      {
        id: 'u4-2',
        code: '4.2',
        title: 'Definición de serie finita e infinita',
        summary: 'Sumas parciales S_k, convergencia como límite de sumas y series telescópicas.',
        details: [
          'Una serie infinita es el límite lim_{k→∞} S_k de sus sumas parciales.',
          'Criterio del término n-ésimo: Si lim a_n ≠ 0, la serie diverge.',
          'Series telescópicas: Descomposición en fracciones parciales y cancelación en cascada.'
        ],
        formulas: [
          'S_k = \\sum_{n=1}^{k} a_n, \\quad \\sum_{n=1}^{\\infty} \\frac{1}{n(n+1)} = \\lim_{k \\to \\infty} \\left(1 - \\frac{1}{k+1}\\right) = 1'
        ],
        figureUrl: '/figures/fig_4_2_sumas_parciales_serie.png',
        figureCaption: 'Convergencia de la serie geométrica hacia su suma límite.'
      },
      {
        id: 'u4-3',
        code: '4.3',
        title: 'Serie numérica y criterios de convergencia',
        summary: 'Compendio maestro: Serie geométrica, p-series, Criterio de la Integral, D\'Alembert, Cauchy, Raabe y Leibniz.',
        details: [
          'El célebre Problema de Basilea: Leonhard Euler (1734) demostró que Σ 1/n² = π²/6.',
          'Serie geométrica: Suma S = a / (1 - r) para |r| < 1.',
          'p-series: Convergen si p > 1, divergen si p ≤ 1 (la serie armónica diverge).',
          'Criterio de la Razón de D\'Alembert y Criterio de Raabe para casos límite L = 1.',
          'Criterio de Leibniz para series alternantes: Decrecimiento y límite cero garantizan convergencia.'
        ],
        formulas: [
          '\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6} \\approx 1.644934',
          'L = \\lim_{n \\to \\infty} \\left| \\frac{a_{n+1}}{a_n} \\right| \\implies L < 1 \\text{ (Conv)}, \\quad L > 1 \\text{ (Div)}',
          'R = \\lim_{n \\to \\infty} n \\left( 1 - \\left| \\frac{a_{n+1}}{a_n} \\right| \\right) > 1 \\implies \\text{Converge}'
        ],
        figureUrl: '/figures/fig_4_6_problema_basilea.png',
        figureCaption: 'El Problema de Basilea resuelto por Euler: convergencia a π²/6.'
      },
      {
        id: 'u4-4-5',
        code: '4.4 - 4.5',
        title: 'Series de potencias, radio e intervalo de convergencia',
        summary: 'Polinomios infinitos, teorema de Cauchy-Hadamard y análisis riguroso en extremos.',
        details: [
          'Representación Σ c_n (x - a)ⁿ centrada en x = a.',
          'Radio de convergencia R = 1 / lim |c_{n+1}/c_n|.',
          'Prueba individual en los extremos x = a - R y x = a + R.'
        ],
        formulas: [
          'R = \\lim_{n \\to \\infty} \\left| \\frac{c_n}{c_{n+1}} \\right|, \\quad x \\in (a - R, a + R)'
        ],
        figureUrl: '/figures/fig_4_4_radio_convergencia.png',
        figureCaption: 'Radio e intervalo de convergencia en la recta real.'
      },
      {
        id: 'u4-6-7',
        code: '4.6 - 4.7',
        title: 'Serie de Taylor, Maclaurin y el Binomio de Newton',
        summary: 'Computadora AGC del Apolo 11, deducción de e^(iπ) + 1 = 0 y tabla canónica.',
        details: [
          'Misiones Apolo 11 (1969): La computadora AGC (MIT) calculaba trayectorias lunares evaluando polinomios de Taylor en tiempo real con 4KB de RAM.',
          'Deducción de la Identidad de Euler e^(iπ) + 1 = 0 conectando los 5 números capitales de la matemática.',
          'Tabla de Maclaurin canónica: e^x, sin x, cos x, ln(1+x), arctan x.'
        ],
        formulas: [
          'f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!} (x - a)^n',
          'e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\dots, \\quad \\sin(x) = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\dots',
          'e^{i\\pi} + 1 = 0'
        ],
        figureUrl: '/figures/fig_4_5_polinomios_taylor.png',
        figureCaption: 'Aproximación sucesiva mediante polinomios de Taylor P₁, P₃, P₅, P₇.'
      },
      {
        id: 'u4-8',
        code: '4.8',
        title: 'Cálculo de integrales no elementales mediante series',
        summary: 'Integración término a término: Función de Error Gaussiana erf(x) y Seno Integral Si(x).',
        details: [
          'Funciones que carecen de primitiva en términos de funciones elementales.',
          'Integración término a término dentro del radio de convergencia R.',
          'Cota de error en series alternantes para calcular valores con tolerancia preestablecida (ej. < 10⁻⁴).'
        ],
        formulas: [
          '\\operatorname{erf}(x) = \\frac{2}{\\sqrt{\\pi}} \\int_{0}^{x} e^{-t^2} dt = \\frac{2}{\\sqrt{\\pi}} \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n+1}}{n!(2n+1)}',
          '\\operatorname{Si}(x) = \\int_{0}^{x} \\frac{\\sin t}{t} dt = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n+1}}{(2n+1)!(2n+1)}'
        ]
      }
    ],
    masterProblems: [
      {
        id: 'mp-4-1',
        number: '4.1',
        title: 'Radio e Intervalo de Convergencia con Análisis de Extremos',
        statement: 'Determinar el radio y el intervalo completo de convergencia de:',
        statementMath: '\\sum_{n=1}^{\\infty} \\frac{(x - 3)^n}{n^2 \\cdot 4^n}',
        steps: [
          { label: 'Paso 1: Criterio de la Razón', description: 'L = lim |a_{n+1}/a_n| = lim [|x - 3| / 4] · [n / (n+1)]² = |x - 3| / 4.' },
          { label: 'Paso 2: Condición de convergencia absoluta', description: '|x - 3| / 4 < 1 => |x - 3| < 4 => Radio R = 4. Intervalo abierto (-1, 7).' },
          { label: 'Paso 3: Extremo izquierdo x = -1', description: 'Σ (-4)ⁿ / (n² 4ⁿ) = Σ (-1)ⁿ / n² (p-serie con p = 2 > 1 => Converge absolutamente).' },
          { label: 'Paso 4: Extremo derecho x = 7', description: 'Σ 4ⁿ / (n² 4ⁿ) = Σ 1/n² (p-serie con p = 2 > 1 => Converge).' }
        ],
        finalResult: 'Radio R = 4. Intervalo de convergencia cerrado [-1, 7].'
      },
      {
        id: 'mp-4-2',
        number: '4.2',
        title: 'Evaluación de Integral No Elemental Gaussiana con Cota de Error',
        statement: 'Aproximar el valor numérico de ∫₀^{0.4} e^(-x²) dx con error menor a 10⁻⁴:',
        steps: [
          { label: 'Paso 1: Serie de Maclaurin', description: 'e^(-x²) = 1 - x² + x⁴/2 - x⁶/6 + x⁸/24 - ...' },
          { label: 'Paso 2: Integración término a término', description: '∫₀^{0.4} e^(-x²) dx = [x - x³/3 + x⁵/10 - x⁷/42 + ...]₀^{0.4}.' },
          { label: 'Paso 3: Evaluación en x = 0.4', description: '0.4 - (0.4)³/3 + (0.4)⁵/10 - (0.4)⁷/42 = 0.4 - 0.021333 + 0.001024 - 0.000039.' },
          { label: 'Paso 4: Estimación del error', description: 'El 4to término es 0.000039 < 0.0001 (10⁻⁴), por lo que basta sumar los 3 primeros.' }
        ],
        finalResult: '0.4 - 0.021333 + 0.001024 ≈ 0.3797 (error < 10⁻⁴).'
      }
    ],
    exercises: [
      { id: 'ex-4-1', code: 'E-4.1', statement: 'Calcular la suma exacta de la serie geométrica Σ_{n=1}^∞ 3 / 4ⁿ.', solution: 'a = 3/4, r = 1/4 => S = (3/4) / (1 - 1/4) = 1.', category: 'Geométrica' },
      { id: 'ex-4-2', code: 'E-4.2', statement: 'Determinar la convergencia de Σ_{n=1}^∞ n² / 2ⁿ.', solution: 'Por Criterio de la Razón L = 1/2 < 1 => CONVERGE absolutamente.', category: 'Razón' },
      { id: 'ex-4-3', code: 'E-4.3', statement: 'Hallar el radio de convergencia de Σ_{n=0}^∞ n! xⁿ.', solution: 'L = lim (n+1)|x| = ∞ para x ≠ 0 => Radio R = 0 (Converge solo en x = 0).', category: 'Radio' },
      { id: 'ex-4-4', code: 'E-4.4', statement: 'Deducir la serie de Leibniz para π/4 evaluando la serie de arctan(1).', solution: 'arctan(x) = x - x³/3 + x⁵/5 - ... => arctan(1) = π/4 = 1 - 1/3 + 1/5 - 1/7 + ...', category: 'Leibniz' }
    ]
  }
];
