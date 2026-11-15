# Reglas de negocio

Tomadas de la propuesta aceptada. Cada regla se prueba con un caso válido, uno de rechazo y uno límite.
Las reglas viven en `backend/src/services/` como funciones puras, con sus pruebas en `backend/tests/unit/`.

## Regla 1. Un profesional no puede tener dos citas activas que se crucen

| Caso | Situación | Resultado esperado |
|---|---|---|
| Rechazo | El profesional tiene cita de 8:00 a 9:00 y se intenta otra de 8:30 a 9:30 | Rechazada: "El profesional ya tiene una cita en ese horario. Elige otro horario." |
| Límite | Con la cita de 8:00 a 9:00, se agenda otra de 9:00 a 10:00 | Aceptada: una cita que empieza cuando termina la otra no se cruza (decisión a documentar) |
| Válido | La cita de 8:00 a 9:00 está cancelada y se agenda otra en ese horario | Aceptada: las citas canceladas no ocupan horario |

## Regla 2. La hora de fin debe ser posterior a la de inicio

| Caso | Situación | Resultado esperado |
|---|---|---|
| Rechazo | Inicio 10:00, fin 9:00 | Rechazada: "La hora de fin debe ser posterior a la hora de inicio." |
| Límite | Inicio 10:00, fin 10:00 | Rechazada: la cita no puede durar cero minutos |
| Válido | Inicio 10:00, fin 11:00 | Aceptada |

## Regla 3. No se aceptan más inscripciones que los cupos del evento

| Caso | Situación | Resultado esperado |
|---|---|---|
| Límite | 20 cupos y 19 inscritos; se inscribe una persona más | Aceptada: ocupa el último cupo |
| Rechazo | 20 inscritos; se inscribe la persona 21 | Rechazada: "Este evento ya no tiene cupos disponibles." |
| Válido | Un inscrito cancela y queda un cupo; otra persona se inscribe | Aceptada: el cupo liberado vuelve a estar disponible |

## Regla 4. Una persona no puede inscribirse dos veces al mismo evento

| Caso | Situación | Resultado esperado |
|---|---|---|
| Rechazo | Ana ya está inscrita y vuelve a intentarlo | Rechazada: "Ya estás inscrita en este evento." |
| Válido | Ana se inscribe en otro evento distinto | Aceptada |
| Límite | Ana cancela su inscripción y se inscribe de nuevo, con cupos disponibles | Aceptada |
