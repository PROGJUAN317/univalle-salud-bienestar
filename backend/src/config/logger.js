const pino = require('pino');

// Los campos sensibles se ocultan: nunca deben aparecer en los registros.
const logger = pino({
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'test' ? 'silent' : 'info'),
  redact: ['req.headers.authorization', '*.password', '*.contrasena', '*.token'],
});

module.exports = logger;
