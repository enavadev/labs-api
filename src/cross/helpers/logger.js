const log4js = require('log4js');

const logfile = './wa-api-log.log';
const logtype = 'console'; //'file' -> se quiser gravar em arquivo
const logConf = {
  appenders: {
    console: { type: logtype },
    everything: { 
      type: logtype, 
      filename: logfile, 
      maxLogSize: 20971520 
    }
  },
  categories: {
    default: { appenders: [ 'everything' ], level: 'debug' }
  }
};

log4js.configure(logConf);
  
const logger = log4js.getLogger();

module.exports = logger;