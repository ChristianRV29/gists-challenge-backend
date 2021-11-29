const mongoose = require('mongoose');
const log = require('../../utils/logger');

const URI = process.env.MONGOOSE_URI
  ? process.env.MONGOOSE_URI
  : 'Unknown';

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { connection } = mongoose;

connection.once('open', () => {
  log.info({ message: `URI: ${URI}` });
  log.info('MongoDB connected');
});

