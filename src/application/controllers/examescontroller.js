const logger = require('../../cross/helpers/logger');
const ReqResult = require('../../domain/entities/reqresult');
const ExamesRepository = require('../../repository/exames/repo-exames');

class ExamesController {
    constructor(){
        this.examesRepository = new ExamesRepository();
        this.ReqResult = new ReqResult();
    }

    ObterExames = async (req, res, next) => {
        this.ReqResult = new ReqResult();
        try {
            const examId = req.params.id; 
            const examAtivos = req.params.ativos; 
            await this.examesRepository.Listar(examAtivos,examId).then(ret => {
                const exams = ret;
                this.ReqResult.Dados = exams;
                this.ReqResult.Sucesso = exams !== null;
            }).catch(err => {
                throw err;
            });

            res.status(200).json( this.ReqResult );
        } catch (error) {
            this.ReqResult.Mensagem = 'Ocorreu um erro ao obter exames.\nErro: ' + error.toString(); 
            logger.error(this.ReqResult.Mensagem);
            res.status(400).json( this.ReqResult );
        }
    };
    
    AdicionarExames = async (req, res, next) => {
        this.ReqResult = new ReqResult();
        try {
            const exams = req.body;
            await this.examesRepository.Adicionar(exams).then(ret =>{
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
            this.ReqResult.Mensagem = 'Ocorreu um erro ao adicionar o(s) exame(s).\nErro: ' + error.toString(); 
            logger.error(this.ReqResult.Mensagem);
            res.status(400).json( this.ReqResult );
        }
    };
    AlterarExame = async (req, res, next) => {
        this.ReqResult = new ReqResult();
        try {
            const exam = req.body;
            await this.examesRepository.Alterar(exam).then(ret =>{
                this.ReqResult.Dado = ret['modifiedCount'];
                this.ReqResult.Sucesso = this.ReqResult.Dado !== null;
            }).catch(err => {
                throw err;
            });

            res.status(200).json( this.ReqResult );
        } catch (error) {
            this.ReqResult.Mensagem = 'Ocorreu um erro ao alterar exame.\nErro: ' + error.toString(); 
            logger.error(this.ReqResult.Mensagem);
            res.status(400).json( this.ReqResult );
        }
    };
    RemoverExame = async (req, res, next) => {
        this.ReqResult = new ReqResult();
        try {
            const examId = req.params.id; 

            await this.examesRepository.Remover(examId).then(ret =>{
                this.ReqResult.Dado = ret['deletedCount'];
                this.ReqResult.Sucesso = this.ReqResult.Dado !== null;
            }).catch(err => {
                throw err;
            });

            res.status(200).json( this.ReqResult );
        } catch (error) {
            this.ReqResult.Mensagem = 'Ocorreu um erro ao remover exame.\nErro: ' + error.toString(); 
            logger.error(this.ReqResult.Mensagem);
            res.status(400).json( this.ReqResult );
        }
    };
    PesquisaExames = async (req, res, next) => {
        this.ReqResult = new ReqResult();
        try {
            const examNome = req.params.nome; 

            await this.examesRepository.Pesquisar(examNome).then(ret =>{
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
}

module.exports = ExamesController;
