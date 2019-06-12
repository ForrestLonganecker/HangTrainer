const request = require('request');
const server = require('../../server/index');
const base = 'http://localhost:3000/';

describe('routes : ', () => {

  describe('GET /', () => {
    it('should return status code 200, and contain "HangTrainer"', (done) => {
      request.get(base, (err, res, body) => {
        console.log(res);
        expect(res.statusCode).toBe(200);
        expect(body).toContain('HangTrainer');
        done();
      });
    });
  });

});