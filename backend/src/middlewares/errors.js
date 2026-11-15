const { ZodError } = require('zod');
const logger = require('../config/logger');

// Error esperado de negocio: lleva un mensaje comprensible para la persona usuaria.
class AppError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.name = 'AppError';
    this.status = status;
  }
}

function notFound(_req, res) {
  res.status(404).json({ error: 'Recurso no encontrado.' });
}

function errorHandler(err, req, res, _next) {
  if (err instanceof ZodError) {
    const campos = err.issues.map((i) => ({ campo: i.path.join('.'), mensaje: i.message }));
    return res.status(400).json({ error: 'Hay datos por corregir.', campos });
  }
  if (err instanceof AppError) {
    return res.status(err.status).json({ error: err.message });
  }
  // Error inesperado: se registra sin cuerpo de la petición para no exponer datos personales.
  logger.error({ err: { message: err.message, stack: err.stack }, url: req.originalUrl }, 'Error no controlado');
  return res.status(500).json({ error: 'Ocurrió un error inesperado. Intenta de nuevo.' });
}

module.exports = { AppError, notFound, errorHandler };
