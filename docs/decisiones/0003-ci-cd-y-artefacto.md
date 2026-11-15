# 0003. CI en GitHub Actions y artefacto como imagen Docker

**Problema.** Se necesita un flujo automático del cambio a la versión comprobada, con artefacto identificable.

**Decisión.** Workflow con `test` (lint, migraciones y pruebas contra Postgres temporal) y `artefacto-docker`
(imagen en GHCR etiquetada con el SHA del commit). Las pruebas no usan la base de Neon.

**Beneficio.** Cada versión fusionada tiene una imagen ejecutable ligada a un commit exacto.

**Costos y limitaciones.** El CI no prueba contra Neon (puede haber diferencias menores). Hay que mantener el Dockerfile.
