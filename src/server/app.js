import express from 'express';
import config from 'config';
import packageJson from 'root/package.json';

const app = express();
const port = config.get('PORT');

// For version or ping response - health checks
app.get('/version', (req, res) => res.json(packageJson.version));

app.get('/trip', )

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
