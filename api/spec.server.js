const request = require('supertest');

const server = require('./server');

describe('server', () => {
  describe('GET /', () => {
    it('should return status 200 ok', () => {
      return request(server)
        .get('/')
        .then(res => {
          expect(res.status).tobe(200);
        });
    });

    it('should return json', () => {
      return request(server)
        .get('/')
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });
  });
});
