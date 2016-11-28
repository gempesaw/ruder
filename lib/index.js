import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import parsePayload from '../lib/parser';
import rp from 'request-promise-native';

const app = express();
app.server = http.createServer(app);
app.use(bodyParser.json());
const router = express.Router();

router.post('/', async (req, res) => {
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

app.use(router);
app.server.listen(3000);
