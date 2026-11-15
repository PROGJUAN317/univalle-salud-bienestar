const { Router } = require('express');

// Indicador de disponibilidad: responde 200 si el servicio y la base de datos funcionan.
module.exports = function healthRouter({ checkDb }) {
  const router = Router();
  router.get('/health', async (_req, res) => {
    const dbUp = await checkDb();
    res.status(dbUp ? 200 : 503).json({
      status: dbUp ? 'ok' : 'degraded',
      db: dbUp ? 'up' : 'down',
      uptime: Math.round(process.uptime()),
    });
  });
  return router;
};
