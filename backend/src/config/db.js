const { Pool } = require('pg');
const { env } = require('./env');

let pool;

// El pool se crea la primera vez que se necesita.
function getPool() {
  if (!pool) {
    pool = new Pool({ connectionString: env.databaseUrl });
  }
  return pool;
}

async function checkDb() {
  try {
    await getPool().query('SELECT 1');
    return true;
  } catch (_err) {
    return false;
  }
}

module.exports = { getPool, checkDb };
