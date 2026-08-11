# PRODUCT.md — Portfolio AgTech, Mateo Pizzolo

**register: brand**

El diseño ES el producto. No hay app detrás: la página es lo único que la persona recibe. Su impresión en los primeros 10 segundos es el entregable.

## Qué es

Portfolio de una sola página de un ML Engineer que trabaja en machine learning aplicado al agro argentino. Es la página destino de un QR impreso que se reparte en AgTech Week Río Cuarto (12-13 de agosto de 2026).

Su trabajo es convertir una conversación de pasillo en un contacto técnico: alguien te escucha dos minutos en un evento, escanea el QR, y treinta segundos después sabe si le servís.

## Usuarios

Tres perfiles escanean el mismo QR. La página tiene que funcionar para los tres **sin dividirse en secciones por audiencia**:

1. **Productores agropecuarios.** No técnicos. Entienden de lotes, campañas y rindes, no de arquitecturas. Necesitan ver que esto resuelve un problema real de campo. Si leen "pipeline de inferencia" se van.
2. **CTOs e ingenieros de startups AgTech.** Evalúan si sabés llevar un modelo a producción, no si sabés entrenar. Miran el stack y si las demos andan de verdad.
3. **Investigadores de INTA y universidades.** Miran los datasets y si las fuentes son serias (Sentinel-2, MAGyP, Mapa Nacional de Cultivos).

El punto en común: los tres respetan la precisión y desconfían del marketing. Escribir para el productor sin perder al CTO es la restricción central.

## Contexto de uso

Predio ferial, celular en la mano, sol directo sobre la pantalla, 4G saturado por miles de personas, treinta segundos de atención entre charla y charla. **El 95% del tráfico es mobile.** Esto no es un detalle de implementación: es la condición que define el diseño. Todo lo que no sobreviva a esa escena está mal, por lindo que sea.

## Tono

Español rioplatense con voseo natural ("probalo", "escribime", "mirá tu lote"). Frases cortas, verbos activos.

La voz es la de un ingeniero mostrando su trabajo, no la de una startup vendiendo. Específico le gana a inteligente: "detecta 8 especies de malezas con 95% de precisión" ✅ vs. "soluciones innovadoras para el agro" ❌.

Los proyectos que todavía no existen dicen qué van a hacer y con qué datos, sin pedir disculpas ni prometer de más.

## Principios

1. **Performance antes que estética, estética antes que features.** Ante cualquier trade-off, gana lo más liviano. La métrica que manda es LCP < 2.5s con throttling Slow 4G.
2. **Precisión, no decoración.** La identidad sale de la cartografía agronómica real: cartas de suelo del INTA, visores satelitales, planos catastrales rurales. Un informe técnico, no una landing.
3. **Una página, un scroll, un CTA.** El CTA es contacto. Sin formularios, sin newsletter, sin chat.
4. **Mostrar, no afirmar.** El raster NDVI real del hero prueba que el autor trabaja con estos datos mejor que cualquier frase que lo diga.

## Anti-referencias

Lo que esta página NO puede parecerse a:

- Landing de startup SaaS: gradientes, cards flotantes con sombra, hero-metric gigante, "revolucionando el agro".
- Los dos looks genéricos de IA: (a) fondo crema + serif de alto contraste + acento terracota; (b) fondo negro + verde flúor. Nuestro verde vive sobre papel claro, nunca sobre negro.
- Portfolio de diseñador: la página es de un ingeniero y se tiene que sentir así.
- Stock de campos, tractores y manos con tierra. La única imagen de la página es un raster NDVI real.
- Emojis como sistema visual.

La lista completa y vinculante está en `DESIGN_SYSTEM.md → Anti-patrones`.

## Fuente de verdad

Todo lo visual (color, tipografía, espaciado, componentes, motion, copy) se define en **`DESIGN_SYSTEM.md`**. Ese archivo manda por sobre cualquier default de skill o preferencia general. Si algo no está definido ahí, se propone una extensión del sistema; no se improvisa.
