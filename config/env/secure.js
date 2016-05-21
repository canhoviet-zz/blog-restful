'use strict';

const confg = {
	log: {
		//morgan options: 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'combined',
		//winston config
		transports: {
			file: {
				level: 'info',
				filename: './logs/applog.log',
				handleExceptions: true,
				json: false,
				maxsize: 5242880, //5MB
				colorize: false
			}
		}
	}
};
export default config;
