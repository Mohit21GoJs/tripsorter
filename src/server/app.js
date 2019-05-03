import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from 'config';
import packageJson from 'root/package.json';
import trips from 'server/modules/trips/route';

const app = express();
const port = config.get('PORT');

app.use(bodyParser.json()); // parse json body for now
// @TODO: whitelist only our client and enable csrf protection for POST/PUT
app.use(cors()); // since client and server run on separate port or probably separate domains

// For version or ping response - health checks
app.get('/version', (_, res) => res.json(packageJson.version));

// For trips module
app.use('/trips', trips);

process.on('uncaughtException', () => {
  // log error and restart
});

process.on('unhandledRejection', () => {
  // log error
});

app.listen(port, () =>
  console.log(
    `${packageJson.name} with version ${
      packageJson.version
    } app listening on port ${port}!`,
  ),
);
