const express=require('express');
const LaboratorioController = require('../controllers/laboratoriocontroller');
const ExamesController = require('../controllers/examescontroller');

Routers = express.Router();

const labsController = new LaboratorioController();
const examesController = new ExamesController();

//Laboratorios
Routers.get('/laboratorio/listar/:ativos?/:id?', labsController.ObterLaboratorios);
Routers.post('/laboratorio/adicionar/', labsController.AdicionarLaboratorios);
Routers.put('/laboratorio/alterar/', labsController.AlterarLaboratorio);
Routers.delete('/laboratorio/remover/:id?', labsController.RemoverLaboratorio);

//Exames
Routers.get('/exames/listar/:ativos?/:id?', examesController.ObterExames);
Routers.post('/exames/adicionar/', examesController.AdicionarExames);
Routers.put('/exames/alterar/', examesController.AlterarExame);
Routers.delete('/exames/remover/:id?', examesController.RemoverExame);
Routers.get('/exames/pesquisa/:nome', examesController.PesquisaExames);

module.exports = Routers;
