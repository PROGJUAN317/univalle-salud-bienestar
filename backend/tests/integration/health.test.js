const request = require('supertest');
const { createApp } = require('../../src/app');

describe('GET /health', () => {
  test('responde 200 cuando la base de datos está disponible', async () => {
    const app = createApp({ checkDb: async () => true });
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ status: 'ok', db: 'up' });
  });

  test('responde 503 cuando la base de datos no responde', async () => {
    const app = createApp({ checkDb: async () => false });
    const res = await request(app).get('/health');
    expect(res.status).toBe(503);
    expect(res.body).toMatchObject({ status: 'degraded', db: 'down' });
  });
});

describe('API', () => {
  test('una ruta inexistente responde 404 con mensaje claro', async () => {
    const app = createApp({ checkDb: async () => true });
    const res = await request(app).get('/api/no-existe');
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });
});
