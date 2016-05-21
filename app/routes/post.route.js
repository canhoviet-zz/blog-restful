'use strict';

/**
 * Module dependencies.
 */
import express from 'express';
import postCtrl from '../controllers/post.ctrl';
import postValidator from '../validators/post.validator';
const router = express.Router();

export default function(app) {

	router.route('/:userName/posts').get(postCtrl.list);
	router.route('/:userName/posts/:postId').get([postValidator.uuidValidator, postCtrl.get]);
	router.route('/:userName/posts').post([postValidator.reqValidator, postCtrl.create]);
	router.route('/:userName/posts/:postId').delete([postValidator.uuidValidator, postCtrl.delete]);
	router.route('/:userName/posts/:postId').post([postValidator.uuidValidator, postCtrl.update]);


	app.use('/api/users', router);
}
