const express = require('express');
const Routers = require('./routers/routers');
const swaggerUi = require('swagger-ui-express');

const CorsPermitidos = require('../cross/helpers/cors');

const app = express();

const swaggerFile = require('./docs/swagger_output.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(CorsPermitidos);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/api',Routers);

app.use(function(req, res, next) {
	res.status(404).send(`<!DOCTYPE html><html lang="pt-BR"><head><title>WA Labs Api</title></head>
  <body><br /><br /><br /><h1>Desculpe! não foi possível encontrar o você que procura!</h1></body></html>`);
  
});

module.exports = app;



