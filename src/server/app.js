import express from 'express';
import bodyParser from 'body-parser';
import config from 'config';
import packageJson from 'root/package.json';
import trips from 'server/modules/trips/route';

const app = express();
const port = config.get('PORT');

app.use(bodyParser.json()); // parse json body for now

// For version or ping response - health checks
app.get('/version', (req, res) => res.json(packageJson.version));

// For trips module
app.use('/trips', trips);

process.on('uncaughtException', () => {});

process.on('unhandledRejection', () => {});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
