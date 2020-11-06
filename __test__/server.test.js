const app = require('../src/server/server')
const supertest = require('supertest')
const request = supertest(app)

describe("GET Endpoint", () => {

    it('Tests the "/test" endpoint', async (done) => {

        const response = await request.get('/test');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Message received!');
        done();
    })
})
