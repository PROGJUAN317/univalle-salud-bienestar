const { env, assertEnv } = require('./config/env');
const logger = require('./config/logger');
const { checkDb } = require('./config/db');
const { createApp } = require('./app');

assertEnv();
const app = createApp({ checkDb });
app.listen(env.port, () => logger.info({ port: env.port }, 'Servidor iniciado'));
