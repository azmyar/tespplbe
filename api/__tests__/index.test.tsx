import request from 'supertest';
import app from '../index';
import { Server } from 'http';

let server: Server;

beforeAll((done) => {
  server = app.listen(done);
});

afterAll((done) => {
  server.close(done);
});

test('GET / should return PPL C-5', async () => {
  const response = await request(app).get('/');
  expect(response.status).toBe(200);
  expect(response.text).toBe('PPL C-5');
});

// test('CORS should allow requests from whitelisted origin', async () => {
//   process.env.PROD_CLIENT_URL = 'http://example.com';
//   const response = await request(app)
//     .get('/')
//     .set('Origin', 'http://example.com');
//   expect(response.status).toBe(200);
//   expect(response.text).toBe('PPL C-5');
// });

test('CORS should block requests from non-whitelisted origin', async () => {
  process.env.PROD_CLIENT_URL = 'http://example.com';
  const response = await request(app)
    .get('/')
    .set('Origin', 'http://notallowed.com');
  expect(response.status).toBe(500); // CORS error results in 500 status
});

test('CORS should allow requests with no origin', async () => {
  process.env.PROD_CLIENT_URL = 'http://example.com';
  const response = await request(app).get('/');
  expect(response.status).toBe(200);
  expect(response.text).toBe('PPL C-5');
});