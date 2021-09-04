const logger = require('../../cross/helpers/logger');
const LaboratorioRepository = require('../../repository/laboratorio/repo-laboratorio');
const ReqResult = require('../../domain/entities/reqresult');

class LaboratorioController {
    constructor(){
        this.labRepository = new LaboratorioRepository();
        this.ReqResult = new ReqResult();
    }

    ObterLaboratorios = async (req, res, next) => {
        this.ReqResult = new ReqResult();
        try {
            const labId = req.params.id; 
            const labAtivos = req.params.ativos; 
            await this.labRepository.Listar(labAtivos,labId).then(ret => {
                this.ReqResult.Dados = ret;
                this.ReqResult.Sucesso = parseInt(ret['length']) > 0 ;
            }).catch(err => {
                throw err;
            });

            res.status(200).json( this.ReqResult );
        } catch (error) {
            this.ReqResult.Mensagem = 'Ocorreu um erro ao obter laboratórios.\nErro: ' + error.toString(); 
            logger.error(this.ReqResult.Mensagem);
            res.status(400).json( this.ReqResult );
        }
    };
    
    AdicionarLaboratorios = async (req, res, next) => {
        this.ReqResult = new ReqResult();
        try {
            const labs = req.body;

            await this.labRepository.Adicionar(labs).then(ret =>{
                if (ret['length'])
                    this.ReqResult.Dados = ret;
                else
                    this.ReqResult.Dado = ret;

                this.ReqResult.Sucesso = this.ReqResult.Dados !== null || this.ReqResult.Dado !== null;
            }).catch(err => {
                throw err;
            });

            res.status(200).json( this.ReqResult );
        } catch (error) {
            this.ReqResult.Mensagem = 'Ocorreu um erro ao adicionar o(s) laboratório(s).\nErro: ' + error.toString(); 
            logger.error(this.ReqResult.Mensagem);
            res.status(400).json( this.ReqResult );
        }
    };
    AlterarLaboratorio = async (req, res, next) => {
        this.ReqResult = new ReqResult();
        try {
            const lab = req.body;

            await this.labRepository.Alterar(lab).then(ret =>{
                this.ReqResult.Dado = ret['modifiedCount'];
                this.ReqResult.Sucesso = this.ReqResult.Dado !== null;
            }).catch(err => {
                throw err;
            });

            res.status(200).json( this.ReqResult );
        } catch (error) {
            this.ReqResult.Mensagem = 'Ocorreu um erro ao alterar laboratório.\nErro: ' + error.toString(); 
            logger.error(this.ReqResult.Mensagem);
            res.status(400).json( this.ReqResult );
        }
    };
    RemoverLaboratorio = async (req, res, next) => {
        this.ReqResult = new ReqResult();
        try {
            const labId = req.params.id; 

            await this.labRepository.Remover(labId).then(ret =>{
                this.ReqResult.Dado = ret['deletedCount'];
                this.ReqResult.Sucesso = this.ReqResult.Dado !== null;
            }).catch(err => {
                throw err;
            });

            res.status(200).json( this.ReqResult );
        } catch (error) {
            this.ReqResult.Mensagem = 'Ocorreu um erro ao remover laboratório.\nErro: ' + error.toString(); 
            logger.error(this.ReqResult.Mensagem);
            res.status(400).json( this.ReqResult );
        }
    };
}

module.exports = LaboratorioController;

