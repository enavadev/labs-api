const envConfig = require('dotenv');
envConfig.config();

const app = require('./src/application/app');

const logger = require('./src/cross/helpers/logger');

let port = normalizaPort(process.env.PORT || '8080');

function normalizaPort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

app.listen(port, () => {
    logger.info(`WA Labs Api - rodando na porta: ${port}\nlocalhost:${port}`);
});
