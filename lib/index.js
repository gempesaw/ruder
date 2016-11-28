import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import parsePayload from '../lib/parser';

const app = express();
app.server = http.createServer(app);
app.use(bodyParser.json());
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        res.send(await parsePayload(req.body.data));
    } catch (err) {
        res.send(`fkedup:\n\n${err}`);

    }
});

app.use(router);
app.server.listen(3000);
