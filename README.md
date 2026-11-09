# 🌐 Portal Web Interactivo de Cálculo Integral — TecNM
## Asignatura: Cálculo Integral (Clave: ACF-0902)
### Docente: Ing. Graciela Herrera Vázquez

Aplicación web interactiva, moderna y gamificada de Cálculo Integral diseñada para el **Tecnológico Nacional de México (TecNM)** y lista para despliegue en **Vercel**.

---

## 🚀 Características Principales

1. **Temario Completo de las 4 Unidades Oficiales (TecNM ACF-0902):**
   - **Unidad 1:** Teorema Fundamental del Cálculo (Exhaución, Sumas de Riemann, Darboux, Propiedades, Regla de Barrow y Derivación de Leibniz).
   - **Unidad 2:** Métodos de Integración e Integral Indefinida (Sustitución simple/racionalizante, Por partes tabular, Fórmulas de reducción de Wallis, Sustitución trigonométrica, Fracciones parciales con Heaviside y Sustitución de Weierstrass).
   - **Unidad 3:** Aplicaciones de la Integral (Áreas dx y dy, Longitud de Catenaria, Sólidos de revolución por discos/arandelas/cascarones, Paradoja de la Trompeta de Gabriel, Integrales impropias y Función Gamma).
   - **Unidad 4:** Series (Sucesiones y Fibonacci, Problema de Basilea de Euler, Criterios de convergencia, Series de potencias, Series de Taylor/Maclaurin y Evaluación de integrales no elementales).

2. **Simuladores Visuales en Vivo (HTML5 Canvas con Animación):**
   - **Simulador de Sumas de Riemann & Simpson:** Deslizador de $n$ rectángulos (de 2 a 80), selector de funciones continuas, cálculo en tiempo real de $S_n$, integral exacta de Barrow, error absoluto y relativo, y botón de animación de convergencia.
   - **Visualizador de Sólidos de Revolución 3D:** Renderizado tridimensional continuo giratorio de discos, arandelas y cascarones cilíndricos con modo de malla (wireframe) y ecuaciones diferenciales asociadas.
   - **Demostrador del TFC 1 ($g'(x) = f(x)$):** Visualizador de la función de acumulación continua donde la derivada del área sombreada iguala en tiempo real la altura de la curva.

3. **Zona de Gamificación (4 Juegos de Cálculo):**
   - **🎯 Juego 1: Caza-Primitivas (Drag & Drop):** Arrastra o selecciona la antiderivada correcta sobre cada integral. Incluye multiplicador de racha, efectos de sonido y lluvia de confeti.
   - **⚡ Juego 2: Reactor de Métodos (Speed Sorter):** Clasificador rápido a contrarreloj (15 segundos) para identificar la técnica óptima de integración con explicaciones detalladas.
   - **🧩 Juego 3: Rompecabezas de Pasos Matemáticos:** Reordena los pasos desordenados de una demostración matemática cronológicamente.
   - **⚔️ Juego 4: Batalla de Riemann (Boss Roguelike):** Enfrenta a los 4 guardianes de cada unidad (Arquímedes, Bernoulli, Kepler y Euler). Administra tus 3 vidas, usa comodines (50/50, Pista Dorada, Escudo) y desbloquea el Diploma de Honor.

4. **Tutor Virtual Interactivo (Miss Graciela):**
   - Asistente flotante con pistas graduadas, consejos metodológicos, sistema de vidas (❤️❤️❤️) y acumulador de experiencia (XP).

5. **Modo Claro / Oscuro Automático:**
   - Detecta la preferencia del sistema operativo del usuario (`prefers-color-scheme`) y cuenta con conmutador manual persistente en `localStorage`.

6. **Centro de Descargas:**
   - Descarga directa de los **Apuntes Oficiales de 65+ Páginas en formato Word (.docx)** con 124 cajas estilizadas, 26 figuras en 300 DPI y 88 ejercicios.
   - Descarga del **Temario Normativo Oficial TecNM en PDF**.
   - Generador e impresor de Hojas de Trabajo / Problemarios por unidad listos para el aula.

---

## 💻 Ejecución Local

```bash
# Entrar a la carpeta del proyecto web
cd calculo-integral-web

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo local
npm run dev
```

Abre en tu navegador la dirección indicada (por defecto `http://localhost:5173`).

---

## ☁️ Despliegue en Vercel

El proyecto incluye el archivo de configuración `vercel.json` con las rutas de reescritura para Single Page Applications (SPA).

### Opción A: Desde GitHub
1. Sube la carpeta `calculo-integral-web` a un repositorio de GitHub.
2. Inicia sesión en [vercel.com](https://vercel.com) y haz clic en **"Add New..." -> "Project"**.
3. Importa el repositorio de GitHub.
4. Vercel detectará automáticamente **Vite**:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Haz clic en **Deploy**. ¡Tu sitio estará en vivo en segundos!

### Opción B: Mediante Vercel CLI
```bash
# Instalar vercel globalmente si no lo tienes
npm i -g vercel

# Desplegar desde la carpeta calculo-integral-web
cd calculo-integral-web
vercel
```
