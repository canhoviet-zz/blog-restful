'use strict';

/**
 * Module dependencies.
 */
import express from 'express';
import userCtrl from '../controllers/user.ctrl';
import userValidator from '../validators/user.validator';
const router = express.Router();

export default function(app) {

	router.route('/').get(userCtrl.list);
	router.route('/:userName').get(userCtrl.get);
	router.route('/').post([userValidator.reqValidator, userValidator.uniqueValidator, userCtrl.create]);
	router.route('/:userName').delete( userCtrl.delete);

	app.use('/api/users', router);
}
