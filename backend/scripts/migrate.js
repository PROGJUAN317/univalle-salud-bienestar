/* Aplica los scripts SQL numerados de db/migrations (en orden) y, con --seed, los de db/seeds.
   Cada migración se registra en la tabla schema_migrations y se aplica una sola vez. */
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env'), quiet: true });

const log = (msg) => process.stdout.write(`${msg}\n`);

async function main() {
  if (!process.env.DATABASE_URL) throw new Error('Falta DATABASE_URL. Revisa .env.example');
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const dir = (n) => path.resolve(__dirname, `../../db/${n}`);
  const sqlFiles = (d) => (fs.existsSync(d) ? fs.readdirSync(d).filter((f) => f.endsWith('.sql')).sort() : []);

  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
      nombre TEXT PRIMARY KEY, aplicada_en TIMESTAMPTZ NOT NULL DEFAULT now())`);
    const hechas = new Set((await pool.query('SELECT nombre FROM schema_migrations')).rows.map((r) => r.nombre));

    for (const f of sqlFiles(dir('migrations'))) {
      if (hechas.has(f)) continue;
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        await client.query(fs.readFileSync(path.join(dir('migrations'), f), 'utf8'));
        await client.query('INSERT INTO schema_migrations (nombre) VALUES ($1)', [f]);
        await client.query('COMMIT');
        log(`Aplicada: ${f}`);
      } catch (err) {
        await client.query('ROLLBACK');
        throw new Error(`Falló ${f}: ${err.message}`, { cause: err });
      } finally {
        client.release();
      }
    }

    if (process.argv.includes('--seed')) {
      for (const f of sqlFiles(dir('seeds'))) {
        await pool.query(fs.readFileSync(path.join(dir('seeds'), f), 'utf8'));
        log(`Datos de ejemplo: ${f}`);
      }
    }
    log('Migraciones al día.');
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  process.stderr.write(`${err.message}\n`);
  process.exit(1);
});
