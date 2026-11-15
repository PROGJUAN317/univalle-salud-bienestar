# Riesgos de diseño, calidad y entrega

> **Borrador inicial: el equipo debe revisarlo, ajustarlo y apropiarse de él.** El PDF pide al menos
> dos riesgos, priorizar uno y explicar una decisión con su beneficio y al menos un costo.

| # | Riesgo | Probabilidad | Impacto | Prioridad |
|---|---|---|---|---|
| R1 | Dos personas reservan el mismo horario o el último cupo **al mismo tiempo** y ambas pasan la validación | Media | Alto | **1** |
| R2 | La base (Neon) o el servicio (Render) están "dormidos" durante la sustentación y la primera petición tarda o falla | Alta | Medio | 2 |
| R3 | Se filtran datos personales o credenciales en el repositorio o en los registros | Baja | Alto | 3 |
| R4 | La política de seguridad del navegador (CSP) permite scripts en línea por los scripts actuales del sitio | Alta | Bajo | 4 |

## Decisión para el riesgo prioritario (R1)

**Problema.** Validar la regla solo en el código no basta: dos peticiones simultáneas pueden leer "horario libre" y guardar ambas.

**Decisión (propuesta).** Además de la regla en `services/`, hacer que la base de datos la garantice:
una restricción de exclusión de PostgreSQL (`btree_gist` con rango de tiempo) para citas, y una restricción
única (persona, evento) para inscripciones; los cupos se descuentan dentro de una transacción.

**Beneficio.** Aun con peticiones simultáneas, la base impide el conflicto.

**Costos y limitaciones.** Se depende de funciones específicas de PostgreSQL (hay que confirmar que Neon
permita la extensión `btree_gist`); el error de la base debe traducirse a un mensaje comprensible;
la migración es más compleja de explicar.

## Notas de los demás riesgos

- **R2:** abrir `/health` unos minutos antes de presentar; plan B con `docker compose up`.
- **R3:** `.env` en `.gitignore`, `.env.example` sin valores, registros con campos sensibles ocultos (pino `redact`), datos de ejemplo ficticios.
- **R4:** al mover los scripts en línea de `objetivos.html` y `contacto.html` a `frontend/js/`, quitar `'unsafe-inline'` de `scriptSrc` en `backend/src/app.js`.
