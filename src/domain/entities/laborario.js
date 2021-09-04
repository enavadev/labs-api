const Utils = require('../../cross/helpers/utils');

class Laboratorio {
    constructor(nome, endereco, status)
    { 
        this.Id = Utils.geraAutoId(1,10000);
        this.Nome = nome;
        this.Endereco = endereco;
        this.Status = status;
    }
}
module.exports = Laboratorio;