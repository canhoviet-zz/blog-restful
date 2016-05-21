'use strict';
import logger from '../util/logger';
import commonUtil from '../util/common.util';
import errorMessages from '../../config/error.messages';
import * as userService from '../services/user.service';

const operations = {
	list: (req, resp)=>{
		return userService
				.findAll(req.query)
				.then((data)=>{
					resp.status(200).json(data);
				});
	},
	get: (req, resp)=>{
		const userName = req.params.userName;
		return userService
				.findByUserName(userName)
				.then((data)=>{
					if(data) {
						resp.status(200).json(data);
					} else {
						resp.status(404).send(errorMessages.USER_NOT_FOUND);
					}
				});
	},
	create: (req, resp)=>{
		const user = req.body;
		logger.info('About to create user ', user);
		return userService
				.create(user)
				.then((data)=>{
					resp.json(data);
				});
	},
	delete: (req, resp)=>{
		const userName = req.params.userName;
		logger.info('About to delete user ', userName);
		return userService
				.deleteUser({
					userName: userName
				})
				.then((affectedRows)=>{
					logger.info('rows deleted', affectedRows);
					resp.status(200).end();
				});
	}

}

export default operations;
