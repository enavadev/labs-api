const Utils = require('../cross/helpers/utils');
const BaseSchemas = require('./base/base-schema');
const DB = require('./context/dbcontex');

class DataModels {
    static laboratorios = () => DB.Context.model('Laboratorios', BaseSchemas.laboratoriosShm());
    static exames = () => DB.Context.model('Exames', BaseSchemas.examesShm());
}

module.exports = DataModels;