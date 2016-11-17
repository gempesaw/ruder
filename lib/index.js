import express from 'express';
import {Router} from 'express';
import http from 'http';

import parsePayload from '../lib/parser'

const app = express();
app.server = http.createServer(app);
const router = Router();

router.get('/', async (req, res) => {
    try {
        res.send(await parsePayload(req.query.data));
    } catch (err) {
        res.send('fkedup');
    }
});

app.use(router);
app.server.listen(3000);