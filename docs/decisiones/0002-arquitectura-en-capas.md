# 0002. Arquitectura en capas: routes → services → repositories

**Problema.** Las reglas de negocio deben poder probarse sin base de datos ni servidor.

**Decisión.** `routes/` recibe y responde HTTP; `services/` contiene las reglas como funciones puras;
`repositories/` es la única capa que escribe SQL. `createApp({ checkDb })` recibe sus dependencias por parámetro.

**Beneficio.** Pruebas unitarias rápidas de las reglas y pruebas de integración separadas.

**Costos y limitaciones.** Más archivos para un alcance pequeño. No se agregan más capas (no se exige SOLID completo).
