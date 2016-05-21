'use strict';

const config =  {
	port: process.env.PORT || 5003,
	log: {
		//morgan options: 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'combined',
		//winston config
		transports: {
			file: {
				level: 'debug',
				filename: './logs/applog.log',
				handleExceptions: true,
				json: false,
				maxsize: 5242880, //5MB
				colorize: false
			},
			console: {
				level: 'debug',
				handleExceptions: true,
				json: false,
				colorize: true
			}
		}
	}
};
export default config;
