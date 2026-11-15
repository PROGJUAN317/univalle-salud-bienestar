# 0001. Base de datos: PostgreSQL en Neon, con Postgres local como respaldo

**Problema.** Los datos deben persistir al reiniciar y cualquier integrante debe poder reconstruir el esquema.

**Decisión.** PostgreSQL gestionado en Neon (plan gratuito), esquema con scripts SQL numerados, y un Postgres
local en `docker-compose.yml` para desarrollar sin depender de la nube. El CI usa un Postgres temporal.

**Beneficio.** Persistencia real y gratuita, Postgres estándar (sin ataduras), y reproducible desde cero.

**Costos y limitaciones.** Neon suspende el cómputo por inactividad: la primera consulta puede tardar unos
segundos. El plan gratuito limita almacenamiento y horas de cómputo (suficiente para este alcance).

**Alternativas descartadas.** Supabase gratuito (se pausa por inactividad) y Postgres gratuito de Render (expira).
