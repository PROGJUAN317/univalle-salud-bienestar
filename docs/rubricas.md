# Seguimiento de requisitos y rúbricas

Estado: ✅ listo · 🟡 base lista, falta completar · ⬜ pendiente. Actualizar en cada Pull Request relevante.

## Desarrollo de Software II (entrega 12/dic/2026; sustentación 13 al 19/dic)

| Requisito | Evidencia | Estado |
|---|---|---|
| Quién usa el producto y qué necesidad atiende | `README.md` | ✅ |
| Dos tipos de información relacionados | Migraciones en `db/migrations/` | ⬜ |
| Registrar, consultar y editar | `backend/src/routes/` | ⬜ |
| Al menos dos reglas de negocio | `backend/src/services/`, `docs/reglas-de-negocio.md` | 🟡 |
| Mensajes comprensibles al validar | `validators/` + manejador de errores | 🟡 |
| Datos guardados de forma permanente | Neon + migraciones | 🟡 |
| Riesgos y decisiones con beneficio y costo | `docs/riesgos.md`, `docs/decisiones/` | 🟡 |
| Ramas, commits y Pull Requests revisados | Historial y PRs del repo | 🟡 |
| Pruebas de reglas (válido, rechazo, límite) e integración | `backend/tests/` | 🟡 |
| CI: construir, probar, informar, bloquear si falla | `.github/workflows/ci.yml` | 🟡 |
| Artefacto identificable por versión | Imagen en GHCR (SHA del commit) | 🟡 |
| Control de calidad con falla demostrada | ESLint, `docs/ci-cd.md` | 🟡 |
| Configuración reproducible, sin secretos en el repo | `.env.example`, README | ✅ |
| Contenedor documentado | `Dockerfile`, `docker-compose.yml` | 🟡 |
| Flujo de entrega documentado | `docs/ci-cd.md` | 🟡 |
| Estado del servicio y escenario de fallo | `/health`, registros | 🟡 |

## Proyecto Integrador I

| Requisito | Evidencia | Estado |
|---|---|---|
| Investigación de usuarios (encuestas/entrevistas) | `docs/` | ⬜ |
| Análisis de competencia | `docs/` | ⬜ |
| Al menos 4 personas y escenarios de uso | `docs/` | ⬜ |
| Sitemap y wireframes | `docs/` + Figma | 🟡 |
| Prototipo interactivo y pruebas con 5 usuarios | Figma + `docs/` | 🟡 |
| Accesibilidad e inclusión | `frontend/` | ⬜ |
| HTML, CSS y JS responsivo | `frontend/` | 🟡 |
| Pruebas funcionales y de rendimiento documentadas | `docs/` | ⬜ |
| Guía de estilo (logo, tipografía, paleta) | Página Avances | ✅ |
| Seguridad básica (datos, autenticación, cifrado) | `backend/` | 🟡 |
| Optimización de carga | `frontend/` | ⬜ |
| Panel de administración y gestión de usuarios | `frontend/` + `backend/` | ⬜ |
| Multiplataforma e idioma de la interfaz (es/en) | `frontend/` | ⬜ |
| SEO básico | `frontend/` | ⬜ |
| Metodología ágil documentada | GitHub Projects + `docs/` | ⬜ |
| Al menos una API externa (opcional para el núcleo; con manejo de fallo) | p. ej. mapa Leaflet + OpenStreetMap | ⬜ |
| Notificaciones push | Web Push | ⬜ |
| Al menos 3 métricas de éxito | `docs/` | ⬜ |
| Plan de marketing y estrategia de sostenibilidad | `docs/` | ⬜ |
| Monetización (si aplica) | `docs/` | ⬜ |
