const request = require('supertest');
const app = require('./app')

describe('Allowed Methods', () => {
    it('should allow for GET requests', async () => {
      const res = await request(app)
        .get('/api/1451001600000')
        .set('Accept', 'application/vnd.api+json')
        .set('Content-Type', 'application/vnd.api+json')
      expect(res.statusCode).toEqual(200);
    });

    it('should NOT allow for POST requests', async () => {
        const res = await request(app)
            .post('/api/1451001600000')
            .set('Accept', 'application/vnd.api+json')
            .set('Content-Type', 'application/vnd.api+json')
        expect(res.statusCode).toEqual(405);
    });

    it('should NOT allow for PUT requests', async () => {
        const res = await request(app)
            .put('/api/1451001600000')
            .set('Accept', 'application/vnd.api+json')
            .set('Content-Type', 'application/vnd.api+json')
        expect(res.statusCode).toEqual(405);
    });

    it('should NOT allow for DELETE requests', async () => {
        const res = await request(app)
            .delete('/api/1451001600000')
            .set('Accept', 'application/vnd.api+json')
            .set('Content-Type', 'application/vnd.api+json')
        expect(res.statusCode).toEqual(405);
    });
});
  
describe('Request Headers', () => {
    it('should allow for requests with Content-Type and Accept headers set to "application/vnd.api+json"', async () => {
        const res = await request(app)
            .get('/api/1451001600000')
            .set('Accept', 'application/vnd.api+json')
            .set('Content-Type', 'application/vnd.api+json')
        expect(res.statusCode).toEqual(200);
    });

    it('should NOT allow for requests with Content-Type different from "application/vnd.api+json"', async () => {
        const res = await request(app)
            .get('/api/1451001600000')
            .set('Accept', 'application/vnd.api+json')
            .set('Content-Type', 'application/json')
        expect(res.statusCode).toEqual(415);
    });

    it('should NOT allow for requests with Accept field different from "application/vnd.api+json"', async () => {
        const res = await request(app)
            .get('/api/1451001600000')
            .set('Accept', 'text/plain')
            .set('Content-Type', 'application/vnd.api+json')
        expect(res.statusCode).toEqual(406);
    });
});

describe('Missing path', () => {
    it('should give 404 for missing path', async () => {
      const res = await request(app)
        .get('/path')
        .set('Accept', 'application/vnd.api+json')
        .set('Content-Type', 'application/vnd.api+json')
    expect(res.statusCode).toEqual(404);
    });
});

describe('Correct date interpretation', () => {
    it('should give 200 and today for empty date param', async () => {
        const today = new Date();
        const res = await request(app)
        .get('/api/')
        .set('Accept', 'application/vnd.api+json')
        .set('Content-Type', 'application/vnd.api+json')
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes.utc).toEqual(today.toUTCString())
    });

    it('should give 200 and correct day for non-empty date param', async () => {
        const input = new Date(1451001600000);
        const res = await request(app)
        .get(`/api/${input.getTime()}`)
        .set('Accept', 'application/vnd.api+json')
        .set('Content-Type', 'application/vnd.api+json')
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.attributes.utc).toEqual(input.toUTCString())
    });

    it('should give 400 for invalid date', async () => {
        const res = await request(app)
            .get('/api/date')
            .set('Accept', 'application/vnd.api+json')
            .set('Content-Type', 'application/vnd.api+json')
        expect(res.statusCode).toEqual(400);
    });
});