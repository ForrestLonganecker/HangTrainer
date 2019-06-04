const request = require('request');
const server = require('../../server/index');
const base = 'http://localhost:3000/';

describe('routes : static', () => {

  describe('GET /workouts', () => {
    it('should return status code 200, and contain "Hangtrainer"', (done) => {
      request.get(`${base}workouts`, (err, res, body) => {
        console.log(res);
        expect(res.statusCode).toBe(200);
        expect(body).toContain('HangTrainer');
        done();
      });
    });
  });
});