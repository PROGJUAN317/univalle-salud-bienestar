# Migraciones

Scripts SQL numerados que crean el esquema. Se aplican **en orden** y **una sola vez**
(el ejecutor registra cada una en la tabla `schema_migrations`).

- Nombre: `001_usuarios.sql`, `002_profesionales.sql`, `003_citas.sql`, ...
- Una vez fusionada en `main`, una migración **no se edita**: se crea una nueva.
- Ejecutar: `npm run migrate` (desde `backend/`). Reconstruye el esquema desde cero en una base vacía.
