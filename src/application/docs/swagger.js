const swaggerAutogen = require('swagger-autogen')();

const outputFile = './src/application/docs/swagger_output.json';
const endpointsFiles = ['./src/application/app.js'];

swaggerAutogen(outputFile, endpointsFiles);