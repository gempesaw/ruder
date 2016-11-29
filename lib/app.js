import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import rp from 'request-promise-native';
import parsePayload from '../lib/parser';

const app = express();
app.server = http.createServer(app);
app.use(bodyParser.json());

app.post('/', async (req, res) => {
    try {
        const options = parsePayload(req.body.data);
        const response = await sendRequest(options);

        res.send(response);
    } catch (err) {
        res.send(`fkedup:\n\n${err}`);

    }
});

function sendRequest(options) {
    return rp(options);
}

export default app;
