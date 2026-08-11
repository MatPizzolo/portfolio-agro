# Proyectos avanzados — roadmap fuera de la página

Cuatro proyectos para construir después de AgTech Week. **No aparecen en la página del QR**: la página solo publica proyectos con demo andando. Cada uno tiene su criterio de entrada al final.

Regla general (la misma de `projects.ts`): cuando la demo esté deployada, el proyecto entra al array con su `area`, y si el área es nueva se suma a `AREAS` — el filtro la levanta solo. Sin métricas inventadas en ningún texto: los números aparecen cuando existan mediciones reales.

---

## 1. Conteo de plantas con drone

**Área nueva:** `vision` (la existente) o una futura `drones` si se suman más proyectos de vuelo.

**Qué hace:** cuenta plantas emergidas por hectárea a partir de imágenes de vuelo bajo, para estimar stand de siembra y detectar fallas de emergencia lote adentro.

**Por qué es avanzado:** detección de objetos chicos y densos en imágenes gigantes: exige tiling (SAHI o equivalente), NMS entre tiles, y calibración de conteo contra verdad de campo. Es un problema de visión cualitativamente más difícil que clasificar una foto.

**Datos reales para arrancar:** dataset público Global Wheat Head Detection (GWHD) para el pipeline base; después, vuelos propios o de productores conocidos para maíz/soja (el conteo de stand en maíz es el caso de negocio más claro).

**Stack sugerido:** YOLO (detección) + SAHI (tiling) + ONNX para servir; el mismo patrón FastAPI/Docker/MLflow del detector de malezas, que ya está probado.

**Criterio de entrada a la página:** demo donde subís una imagen de drone real y devuelve el conteo con las detecciones dibujadas.

---

## 2. Detector de malezas sin señal

**Área nueva:** `edge`.

**Qué hace:** el detector de malezas corriendo entero en el celular, sin internet: en el lote no hay señal, y ahí es donde está el yuyo. PWA offline-first con el modelo cuantizado corriendo en el navegador.

**Por qué es avanzado:** demuestra la habilidad más escasa del stack ML: achicar un modelo hasta que corra en el fierro que la gente tiene en el bolsillo. Cuantización, conversión a ONNX, WebGPU/WASM como target, presupuesto de latencia y batería.

**Datos reales:** los mismos del detector actual (DeepWeeds). No necesita datos nuevos: necesita ingeniería.

**Stack sugerido:** ONNX Runtime Web (WebGPU con fallback WASM), PWA con service worker para el modelo cacheado. Variante Jetson para tractores/implementos como fase 2.

**Criterio de entrada a la página:** la demo funciona con el celular en modo avión. Ese es exactamente el pitch de la card: "Probalo sin señal".

---

## 3. Alerta de heladas por lote

**Área nueva:** `clima`.

**Qué hace:** pronóstico probabilístico de helada a nivel lote (no a nivel ciudad): combina el pronóstico regional del SMN con estaciones INTA cercanas y la altimetría del terreno, porque la helada se acumula en los bajos.

**Por qué es avanzado:** forecasting probabilístico serio (el productor necesita "80% de chance de helada en tu bajo", no "mínima 2°C en Río Cuarto"), fusión de fuentes heterogéneas, y evaluación honesta con métricas de calibración.

**Datos reales:** SMN (pronósticos y observaciones públicas), red de estaciones INTA, modelo digital de elevación (IGN). Todo público y argentino.

**Stack sugerido:** series temporales (gradient boosting o modelos probabilísticos livianos), pipeline batch diario, alertas por la vía que ya use la gente (WhatsApp/Telegram) como fase 2.

**Criterio de entrada a la página:** demo con mapa de riesgo de helada por zona para las próximas 48h, actualizado a diario.

---

## 4. Asistente de fitosanitarios

**Área nueva:** `llm`.

**Qué hace:** respondés "¿puedo mezclar X con Y para soja en V4?" y contesta con la etiqueta oficial citada: dosis, carencias, compatibilidades y restricciones, con link al documento fuente. RAG sobre labels de SENASA y hojas técnicas del INTA.

**Por qué es avanzado:** RAG donde alucinar es inaceptable (una dosis inventada es un problema real, no un bug simpático): retrieval sobre PDFs regulatorios, citas obligatorias, y negarse a responder cuando la fuente no está. Eso es ingeniería LLM adulta, no un wrapper de chat.

**Datos reales:** vademécum público de SENASA, etiquetas oficiales de productos, publicaciones técnicas del INTA.

**Stack sugerido:** pipeline de ingesta de PDFs + embeddings + retrieval con re-ranking; el modelo que convenga por costo. Toda respuesta lleva cita o no sale.

**Criterio de entrada a la página:** demo que responde 10 preguntas típicas de un ingeniero agrónomo con la cita correcta visible en cada respuesta.

---

## Orden sugerido

1. **Detector sin señal** — reusa todo lo que ya existe, y "probalo en modo avión" es la mejor demo de feria imaginable.
2. **Alerta de heladas** — datos 100% públicos, cero dependencia de terceros, y resuelve un dolor que cualquier productor nombra solo.
3. **Conteo con drone** — necesita conseguir imágenes de vuelo; el pipeline arranca con GWHD mientras tanto.
4. **Asistente de fitosanitarios** — el de mayor superficie de riesgo (regulatorio + alucinaciones); conviene encararlo con los otros ya andando.
