const logger = require('../../cross/helpers/logger');
const BaseSchemas = require('../../data/base/base-schema');
const DataModels = require('../../data/models');

class ExamesRepository {

    Listar = async (Ativos, Id ) => {
        try {
    
            let objFind = {};
            if (Id)
                objFind = {Id: Id};

            if (Ativos === true) 
                objFind['Status'] = true;

            return await DataModels.exames().find(objFind);

        } catch (error) {
            logger.error('Ocorreu um erro ao obter exames - Erro: ', error);
            throw error; 
        }
    }
    Adicionar = async (models) => {
        try {
            let ExamesModel = null;
            if (models.length)
            {
                ExamesModel = [];
                models.map((model,idx) => {
                    const m = BaseSchemas.examesShm();
                    m.Nome = model.Nome;
                    m.Status = model.Status;
                    m.Tipo = model.Tipo;
                    m.Laboratorios = model.Laboratorios;
                    ExamesModel.push(m);
                });
            }
            else {
                ExamesModel = BaseSchemas.examesShm();
                ExamesModel.Nome = models.Nome;
                ExamesModel.Status = models.Status;
                ExamesModel.Tipo = models.Tipo;
                ExamesModel.Laboratorios = models.Laboratorios;
            }

           return DataModels.exames().create(ExamesModel);

        } catch (error) {
            logger.error('Ocorreu um erro ao adicionar um novo exame - Erro: ', error);
            throw error; 
        }
    }
    Alterar = async (model) => {
        try {
            if (model)
            {
                const ExamesModel = BaseSchemas.examesShm();
                ExamesModel.Id = model.Id;
                ExamesModel.Nome = model.Nome;
                ExamesModel.Status = model.Status;
                ExamesModel.Tipo = model.Tipo;
                ExamesModel.Laboratorios = model.Laboratorios;

                return DataModels.exames().updateMany({Id:model.Id }, { $set: ExamesModel });
            }
        } catch (error) {
            logger.error('Ocorreu um erro ao adicionar um novo exame - Erro: ', error);
            throw error; 
        }
    }
    Remover = async (Id) => {
        try {
            if (Id){
                return await DataModels.exames().deleteOne({ Id : Id });
            }
            else
                return await DataModels.exames().deleteMany({});

        } catch (error) {
            logger.error('Ocorreu um erro ao remover o exame - Erro: ', error);
            throw error; 
        }
    }
    Pesquisar = async (nome ) => {
        try {

            const query = DataModels.exames().find({ Nome: { $regex: nome, $options: 'i' } });
            return await query;

        } catch (error) {
            logger.error('Ocorreu um erro ao consultar exames - Erro: ', error);
            throw error; 
        }
    }
}
module.exports = ExamesRepository;