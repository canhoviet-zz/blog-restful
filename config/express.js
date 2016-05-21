'use strict';

/**
 * Module dependencies.
 */
import fs from 'fs';
import https from 'https';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import config from './config';
import logger from '../app/util/logger';
import errorMessages from './error.messages';
import Promise from 'bluebird';
import commonUtil from '../app/util/common.util';

export default (db) => {
	// Initialize express app
	var app = express();
	app.listenAsync = Promise.promisify(app.listen).bind(app);
	app.use(morgan(config.log.format, {stream: logger.stream}));

	// Showing stack errors
	app.set('showStackError', true);

    // CookieParser should be above session
    app.use(cookieParser());

    // Request body parsing middleware should be above methodOverride
	app.use(bodyParser.json({ type: 'application/*', limit: '30mb' }));
	app.use(bodyParser.urlencoded({ extended: true }));    
    app.use(methodOverride());

    // Use helmet to secure Express headers
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.use(helmet.ienoopen());
    app.disable('x-powered-by');
	serveFavicon(app);

    function bootstrapRoutes() {
        // Skip the app/routes/middlewares directory as it is meant to be
        // used and shared by routes as further middlewares and is not a
        // route by itself
        const appPath = process.cwd();
        commonUtil.walk(appPath + '/app', 'route', 'middlewares', function(path) {
            logger.info('loading route ', path);
            require(path)(app);
        });
    }

    //NOTE: routes config should be defined after all configurations
    bootstrapRoutes();

	app.use(function(err, req, res, next) {
		let errorMsg;
		if(err.name === 'SyntaxError' && err.message.indexOf('Unexpected') >= 0) {
			errorMsg = errorMessages.UNPARSABLE_REQUEST;
			res.status(400).send(errorMsg);
			return;
		}
		errorMsg = errorMessages.SERVER_ERROR;
		logger.error(err.stack);
		res.status(500).send(errorMsg);

	});
	// Assume 404 since no middleware responded
	app.use((req, res) => {
		logger.error('request ' + req.path + ' not found');
		const notFound = errorMessages.NOT_FOUND;
		res.status(404).send(notFound);
	});

	if (process.env.NODE_ENV === 'secure') {

		// Load SSL key and certificate
		const privateKey = fs.readFileSync('./config/sslcerts/key.pem', 'utf8');
		const certificate = fs.readFileSync('./config/sslcerts/cert.pem', 'utf8');

		// Create HTTPS Server
		server = https.createServer({
			key: privateKey,
			cert: certificate
		}, app);
	}
	logger.info('completed configuring express application');
	return app;
};
function serveFavicon(app){
	const favicon = new Buffer('AAABAAEAEBAQAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAA/4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREQAAAAAAEAAAEAAAAAEAAAABAAAAEAAAAAAQAAAQAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAA//8AAP//AAD8HwAA++8AAPf3AADv+wAA7/sAAP//AAD//wAA+98AAP//AAD//wAA//8AAP//AAD//wAA', 'base64');
 	app.get("/favicon.ico", (req, res) =>{
		  res.statusCode = 200;
		  res.setHeader('Content-Length', favicon.length);
		  res.setHeader('Content-Type', 'image/x-icon');
		  res.setHeader("Cache-Control", "public, max-age=5592000");
		  res.setHeader("Expires", new Date(Date.now() + 5592000000).toUTCString());
		  res.end(favicon);
 	});
}
