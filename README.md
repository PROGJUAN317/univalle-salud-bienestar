# Univalle Salud y Bienestar

Aplicación web que centraliza el **agendamiento de citas de psicología y odontología** y la
**inscripción a eventos de Bienestar Universitario** en la sede Tuluá de la Universidad del Valle.
Proyecto de *Desarrollo de Software II* y *Proyecto Integrador I* (Ingeniería de Sistemas).

## ¿Qué necesidad atiende?

Hoy las citas, actividades y eventos se consultan por canales dispersos: las personas no saben qué hay
disponible y Bienestar no tiene un registro único ni forma de evitar que dos personas tomen el mismo
horario o el mismo cupo. La aplicación ofrece un solo lugar, con reglas que impiden esos conflictos.

**Usuarios:** paciente (estudiante o trabajador), profesional de salud y administrador de Bienestar.
**Recorridos:** agendar una cita · inscribirse a un evento.
Las reglas de negocio y sus casos de prueba están en [`docs/reglas-de-negocio.md`](docs/reglas-de-negocio.md).

## Tecnologías

| Parte | Herramienta |
|---|---|
| Backend | Node.js 20 + Express |
| Base de datos | PostgreSQL (Neon en la nube; Postgres local con Docker) |
| Validación | Zod |
| Seguridad | helmet, express-rate-limit, bcryptjs, jsonwebtoken |
| Registros | pino |
| Pruebas / calidad | Jest, Supertest, ESLint |
| CI/CD y artefacto | GitHub Actions, imagen Docker en GitHub Container Registry |
| Frontend | HTML, CSS, JavaScript y Materialize (servido por Express) |

## Estructura

```
backend/    API: routes → services (reglas de negocio) → repositories (SQL)
db/         migraciones SQL numeradas y datos de ejemplo
frontend/   sitio web (HTML/CSS/JS)
docs/       decisiones, riesgos, reglas de negocio, CI/CD, seguimiento de rúbricas
.github/    plantilla de Pull Request, plantillas de Issues y workflow de CI
```

## Configuración

Requisitos: Node.js 20 o superior y Docker (opcional pero recomendado).

1. Copia `.env.example` como `.env` y completa los valores (el archivo `.env` no se sube al repositorio).
2. Elige la base de datos:
   - **Local:** `docker compose up db -d` y usa en `DATABASE_URL` la cadena indicada en `.env.example`.
   - **Neon:** crea un proyecto en Neon y pega su cadena de conexión en `DATABASE_URL`.

## Ejecución

**Con Docker (aplicación + base de datos):**

```bash
docker compose up --build
docker compose run --rm app node backend/scripts/migrate.js   # crear el esquema
```

**Sin Docker (solo Node):**

```bash
cd backend
npm ci
npm run migrate      # crea el esquema
npm run seed         # datos de ejemplo (opcional)
npm run dev          # http://localhost:3000
```

Estado del servicio: `GET /health` responde 200 si la aplicación y la base de datos funcionan, y 503 si la base falla.

## Pruebas

```bash
cd backend
npm run lint   # control de calidad
npm test       # pruebas automáticas
```

Las pruebas de integración que usan base de datos requieren `DATABASE_URL` apuntando a una base de prueba vacía.

## Flujo de trabajo

Todo cambio llega a `main` mediante una rama y un Pull Request revisado por otra persona.
El CI ejecuta lint, migraciones y pruebas contra un Postgres temporal, y genera la imagen Docker.
Detalles en [`docs/ci-cd.md`](docs/ci-cd.md).

## Equipo

Scarllys del Valle Vallecilla Caicedo · Dilan Joseph Sanchez Silva · Dennis Maryuri Rosero Garcia ·
Juan Sebastian Navarrete Rada · Valentina Betancourt Caicedo · Juan Jose Trujillo Gonzales
