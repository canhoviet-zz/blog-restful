'use strict';
const winston = require('winston');
const config = require('../../config/config').log;

// Set up logger
const logger = new winston.Logger({
  exitOnError: false
});

//winston.addColors(config.customColors);
Object.keys(config.transports).forEach(function(transport){
	logger.add(winston.transports[transport.charAt(0).toUpperCase() + transport.slice(1).toLowerCase()],
				config.transports[transport]);
});

logger.stream = {
    write: function(message, encoding){
        logger.info(message.slice(0, -1));
    }
};

export default logger;
