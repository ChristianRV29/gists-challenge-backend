const chalk = require('chalk');

const appName = process.env.APP_NAME || 'Task-manager';
const env = process.env.ENV || 'Unknown';

const { log } = console;

const LOG_LEVEL_INFO = 1;
const LOG_LEVEL_WARN = 2;
const LOG_LEVEL_ERROR = 3;
const LOG_LEVEL_UNKNOWN = 'Unknown';

const safeLog = (what) => {
  if (typeof what !== 'string') {
    log('Only strings can be logged');
    return;
  }
  try {
    log(what);
  } catch (e) {
    log('Error safed log: ', e);
  }
};

const getLogLevel = (level) => {
  let levelToText;

  switch (level) {
    case LOG_LEVEL_INFO:
      levelToText = 'INFO';
      break;
    case LOG_LEVEL_WARN:
      levelToText = 'WARNING';
      break;
    case LOG_LEVEL_ERROR:
      levelToText = 'ERROR';
      break;
    default:
      levelToText = 'UNKNOWN';
      break;
  }
  return levelToText;
};

const formatMessage = (message, level) => {
  const dateText = new Date().toISOString()
    .replace('T', ' ')
    .substring(0, 19);

  return `${dateText} ${getLogLevel(level)} -> ${appName} @ ${env}: ${message}`;
};

const getActualLogMessage = (message, stackTrace, level, pretty = true) => {
  let actualMesage = '';

  if (stackTrace.length > 0) {
    actualMesage = stackTrace;
  } else {
    try {
      if (typeof message === 'string') {
        actualMesage = message.toString();
      } else {
        try {
          actualMesage = pretty ? JSON.stringify(message, null, 2) : JSON.stringify(message);
        } catch (e) {
          actualMesage = message.toString();
        }
      }
    } catch (err) {

    }
  }
  return actualMesage;
};

const formatAndPrint = (message, level) => {
  if (message.length <= 0) return;

  let formattedMessage = '';

  try {
    formattedMessage = formatMessage(message, level);
  } catch (e) {
    return;
  }

  if (formattedMessage.length <= 0) return;

  switch (level) {
    case LOG_LEVEL_INFO:
      safeLog(chalk.green(formattedMessage));
      break;
    case LOG_LEVEL_WARN:
      safeLog(chalk.yellow(formattedMessage));
      break;
    case LOG_LEVEL_ERROR:
      safeLog(chalk.red(formattedMessage));
      break;
    default:
      safeLog(chalk.cyan(formattedMessage));
  }
};

const actualLog = (message, level, pretty = true, printFullStack = false) => {
  // Ensure the message is defined
  if (typeof message === 'undefined' || message === null) return;

  // Ensure the log level is error, if the message is actually an error
  const isError = message instanceof Error;

  let stackTrace = '';
  // Ensure error stack trace exists and get it
  if (isError && typeof message.stack !== 'undefined' && printFullStack) {
    stackTrace = message.stack.toString() || '';
  }
  // Ensure error message exists and get it
  if (isError && typeof message.message !== 'undefined' && stackTrace.length <= 0) {
    stackTrace = (message.message || '').toString();
  }

  const actualMessage = getActualLogMessage(message, stackTrace, level, pretty);
  formatAndPrint(actualMessage, level);
};

const info = (message, pretty = true) => {
  actualLog(message, LOG_LEVEL_INFO, pretty);
};

const warn = (message, pretty = true) => {
  actualLog(message, LOG_LEVEL_WARN, pretty);
};

const error = (message, pretty = true, printFullStack = false) => {
  actualLog(message, LOG_LEVEL_ERROR, pretty, printFullStack);
};

const doLog = (message, level, pretty = true) => {
  const actualLevel = typeof level === 'number' ? level || LOG_LEVEL_UNKNOWN : LOG_LEVEL_UNKNOWN;
  actualLog(message, actualLevel, pretty);
};

module.exports = doLog;
module.exports.info = info;
module.exports.warn = warn;
module.exports.error = error;
