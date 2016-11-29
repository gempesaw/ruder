import { expect } from 'chai';
import request from 'supertest';

import app from '../lib/app';

app.get('/test', (_, res) => res.send('get'));
app.post('/test', (_, res) => res.send('post'));
app.put('/test', (_, res) => res.send('put'));
app.delete('/test', (_, res) => res.send('delete'));

describe('Ruder E2E', () => {
    const url = 'http://localhost:54321/test';
    let server;
    beforeEach(() => server = app.listen(54321));

    it('should send a simple GET', async function () {
        let response = await request(app)
            .post('/')
            .send({data: `GET ${url}`})
            .expect('get');
    });

    it('should send a POST', async function () {
        let response = await request(app)
            .post('/')
            .send({data: `POST ${url}

{ "data": "json" }`})
            .expect('post');
    });

    it('should send a PUT', async function () {
        let response = await request(app)
            .post('/')
            .send({data: `PUT ${url}

{ "data": "json" }`})
            .expect('put');
    });

    it('should send a DELETE', async function () {
        let response = await request(app)
            .post('/')
            .send({data: `DELETE ${url}

{ "data": "json" }`})
            .expect('delete');
    });

    afterEach(() => server.close());
});
