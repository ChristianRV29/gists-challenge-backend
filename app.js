require('dotenv').config();
require('./models/mongo/index');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const log = require('./utils/logger');

const statusRoutes = require('./routes/status');
const taskRoutes = require('./routes/task');
const githubRoutes = require('./routes/github');

const port = process.env.PORT || 8080;
const app = express();

const env = process.env.ENV || 'Unknown';
const allowLocalhost = ['dev', 'Unknown'].includes(env);

const corsOption = {
  origin(origin, callback) {
    const validateOrigin = (origin) || ' ';
    if ((!origin || allowLocalhost)) {
      callback(null, true);
    } else {
      log.info(`Attemped to provide a response to origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(allowLocalhost ? cors() : cors(corsOption));
app.use(bodyParser.json({ limit: '600mb' }));
app.use(bodyParser.urlencoded({ limit: '600mb', extended: true }));

app.use('/api/', statusRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/github', githubRoutes);

app.listen(port, () => {
  log.info(`The server is running on port: ${port}`);
});
