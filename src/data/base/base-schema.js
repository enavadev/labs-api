const Utils = require('../../cross/helpers/utils');
const DB = require('../context/dbcontex');

const LaboratoriosShm = new DB.Context.Schema({
    Id: { type: Number, required: false, default: Utils.geraAutoId(1,100_000)  },
    Nome: { type: String, required: true, default: '' },
    Endereco: { type: String, required: true, default: '' },
    Status: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, default: Date.now }
});

const ExamesShm = new DB.Context.Schema({
    Id: { type: Number, required: false, default: Utils.geraAutoId(1,100_000)  },
    Nome: { type: String, required: true, default: '' },
    Tipo: { type: String, required: true, default: '' },
    Status: { type: Boolean, required: true, default: false },
    Laboratorios: { type: [Number], required: false, default: [] },
    createdAt: { type: Date, default: Date.now }
});
class BaseSchemas {
    static laboratoriosShm = () => LaboratoriosShm;
    static examesShm = () => ExamesShm;
}

module.exports = BaseSchemas;