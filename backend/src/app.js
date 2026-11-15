const path = require('path');
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const logger = require('./config/logger');
const healthRouter = require('./routes/health');
const { notFound, errorHandler } = require('./middlewares/errors');

// checkDb se recibe como parámetro para poder probar la app sin base de datos real.
function createApp({ checkDb }) {
  const app = express();
  app.set('trust proxy', 1); // detrás del proxy de Render

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          // DEUDA TÉCNICA: 'unsafe-inline' porque objetivos.html y contacto.html tienen scripts
          // en línea. Al moverlos a js/, quitar esta excepción (ver docs/riesgos.md).
          scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdnjs.cloudflare.com', 'https://code.jquery.com'],
          styleSrc: ["'self'", "'unsafe-inline'", 'https://cdnjs.cloudflare.com', 'https://fonts.googleapis.com'],
          fontSrc: ["'self'", 'https://fonts.gstatic.com'],
          imgSrc: ["'self'", 'data:', 'https://images.unsplash.com'],
          connectSrc: ["'self'"],
        },
      },
    })
  );
  app.use(express.json({ limit: '100kb' }));

  app.use((req, res, next) => {
    const inicio = Date.now();
    res.on('finish', () => {
      logger.info({ method: req.method, url: req.originalUrl, status: res.statusCode, ms: Date.now() - inicio }, 'petición');
    });
    next();
  });

  app.use(healthRouter({ checkDb }));

  app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: true, legacyHeaders: false }));
  // Aquí se registrarán las rutas de la API: app.use('/api/citas', ...), etc.
  app.use('/api', notFound);

  app.use(express.static(path.resolve(__dirname, '../../frontend')));
  app.use(errorHandler);
  return app;
}

module.exports = { createApp };
