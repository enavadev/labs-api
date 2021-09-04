const logger = require('../../cross/helpers/logger');
const BaseSchemas = require('../../data/base/base-schema');
const DataModels = require('../../data/models');

class LaboratorioRepository {

    Listar = async (Ativos, Id ) => {
        try {
    
            let objFind = {};
            if (Id)
                objFind = {Id: Id};

            if (Ativos === true) 
                objFind['Status'] = true;

            return await DataModels.laboratorios().find(objFind);

        } catch (error) {
            logger.error('Ocorreu um erro ao obter laboratorios - Erro: ', error);
            throw error; 
        }
    }
    Adicionar = async (models) => {
        try {
            let laboratoriosModel = null;

            if (models.length)
            {
                laboratoriosModel = [];
                models.map((model,idx) => {
                    const m = BaseSchemas.laboratoriosShm();
                    m.Nome = model.Nome;
                    m.Endereco = model.Endereco;
                    m.Status = model.Status;
                    laboratoriosModel.push(model);
                });
            }
            else {
                laboratoriosModel = BaseSchemas.laboratoriosShm();
                laboratoriosModel.Nome = models.Nome;
                laboratoriosModel.Status = models.Status;
                laboratoriosModel.Endereco = models.Endereco;
            }

           return DataModels.laboratorios().create(laboratoriosModel);

        } catch (error) {
            logger.error('Ocorreu um erro ao adicionar um novo laboratório - Erro: ', error);
            throw error; 
        }
    }
    Alterar = async (model) => {
        try {
            if (model)
            {
                const laboratoriosModel = BaseSchemas.laboratoriosShm();
                laboratoriosModel.Id = model.Id;
                laboratoriosModel.Nome = model.Nome;
                laboratoriosModel.Status = model.Status;
                laboratoriosModel.Endereco = model.Endereco;

                return DataModels.laboratorios().updateMany({Id:model.Id }, { $set: laboratoriosModel });
            }
        } catch (error) {
            logger.error('Ocorreu um erro ao adicionar um novo laboratório - Erro: ', error);
            throw error; 
        }
    }
    Remover = async (Id) => {
        try {
            if (Id){
                return await DataModels.laboratorios().deleteOne({ Id : Id });
            }
            else
                return await DataModels.laboratorios().deleteMany({});

        } catch (error) {
            logger.error('Ocorreu um erro ao remover o laboratório - Erro: ', error);
            throw error; 
        }
    }
    Pesquisar = async (nome ) => {
        try {

            const query = DataModels.laboratorios().find({ Nome: { $regex: nome, $options: 'i' } });
            return await query;

        } catch (error) {
            logger.error('Ocorreu um erro ao consultar laboratorios - Erro: ', error);
            throw error; 
        }
    }
}
module.exports = LaboratorioRepository;