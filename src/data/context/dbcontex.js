const logger = require('../../cross/helpers/logger');
const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/wa-labs-db');

const { DBUSER, DBPASS, DBHOST, DBPORT, DBNAME } = process.env

mongoose.connect(
    `mongodb://${DBUSER}:${DBPASS}@${DBHOST}:${DBPORT}/${DBNAME}?authSource=admin`,
    {
        useNewUrlParser: true,
    }
);

mongoose.connection.on('error', () => logger.error('connection error:'))
mongoose.connection.once('open', () => logger.log('database connected'))
    
module.exports = {Context: mongoose};