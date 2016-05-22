'use strict';

/**
 * Module dependencies.
 */
import express from 'express';
import postCtrl from '../controllers/post.ctrl';
import postValidator from '../validators/post.validator';

export default function(app) {

	let router = express.Router();
	router.route('/:userName/posts')
		.get(postCtrl.list)
		.post([postValidator.reqValidator, postCtrl.create]);
	app.use('/api/users', router);

	router = express.Router();
	router.route('/:postId')
		.get([postValidator.uuidValidator, postCtrl.get])
		.put([postValidator.uuidValidator, postCtrl.update])
		.delete([postValidator.uuidValidator, postCtrl.delete]);
	app.use('/api/posts', router);
}
