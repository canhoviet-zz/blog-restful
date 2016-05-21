'use strict';
/**
 * Module dependencies.
 */

require('./config/init')();
const logger = require('./app/util/logger');
const config = require('./config/config');
const express = require('./config/express');
/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */
logger.info('start loading models');
// Bootstrap sequelize models
const models = require('./app/models');
const server = express(models.sequelize);

models.sequelize.sync().then(()=>{
    return server.listenAsync(config.port).then(()=>{
        logger.info('Application started on port ', config.port);
    });
}).catch((e)=>{
    logger.error('Failed to start the server', e);
});

export default server;
