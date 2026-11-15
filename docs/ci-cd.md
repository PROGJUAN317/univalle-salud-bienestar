# Integración y entrega continuas

## Integración continua (`.github/workflows/ci.yml`)

Se ejecuta en cada Pull Request hacia `main` y en cada fusión a `main`.

| Job | Qué hace | Si falla |
|---|---|---|
| `test` | Obtiene el código, instala dependencias, ejecuta **ESLint**, crea el esquema en un **Postgres temporal** y corre las **pruebas** | El PR no se puede fusionar (cuando el check esté exigido en las reglas de `main`) |
| `artefacto-docker` | Construye la imagen Docker. Solo al fusionar en `main` la publica | No hay artefacto para esa versión |

**Control de calidad ligado a un riesgo:** ESLint (regla `no-console`) evita registros accidentales con datos
sensibles (riesgo R3). Para demostrarlo: agregar un `console.log` en una rama y observar que el job `test` falla.

**Pruebas:** no se deshabilitan para ocultar fallos. La cobertura no se usa como criterio por sí sola.

## Artefacto

- **Qué es:** imagen Docker del backend con el frontend incluido.
- **Dónde:** GitHub Container Registry, `ghcr.io/<usuario>/univalle-salud-bienestar`, pestaña *Packages* del repositorio.
- **Relación con el código:** cada imagen lleva como etiqueta el **SHA completo del commit** que la generó; `latest` apunta a la última de `main`.

## Entrega (borrador a completar cuando exista el despliegue)

| Paso | ¿Automático? |
|---|---|
| Pruebas y lint en cada PR | Automático |
| Revisión y aprobación del PR por otra persona | Decisión humana |
| Fusión (squash) a `main` y publicación de la imagen | Automático tras la aprobación |
| Despliegue a producción (Render) | Pendiente: se propone un *Environment* de GitHub con aprobación manual |

## Observabilidad

- `GET /health`: 200 si la app y la base funcionan; 503 si la base falla. La imagen Docker lo usa como `HEALTHCHECK`.
- Registros en JSON con pino; los campos sensibles se ocultan.
- **Escenario de fallo a demostrar:** apuntar `DATABASE_URL` a una base inexistente, ver el 503 en `/health` y la causa en los registros.
