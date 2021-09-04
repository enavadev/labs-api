const Utils = require('../../cross/helpers/utils');

class Exame {
    constructor(nome, tipo, status, labs)
    { 
        this.Id = Utils.geraAutoId(1,10000);
        this.Nome = nome;
        this.Tipo = tipo;
        this.Status = status;
        this.Laboratorios = labs || [];
    }
}
module.exports = Exame;