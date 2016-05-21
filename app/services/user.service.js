'use strict';

import models from '../models';
const User = models.User;

/**
 * Find all users in the db
 *
**/
export function findAll ({limit = 50, offset = 0, ...otherOptions} = {}){
	return User.findAll({
		limit: Number(limit),
		offset: Number(offset),
		where: {
			...otherOptions
		}
	});
};

/**
 * Find a user by user name
 * @param userName
**/
export function findByUserName (userName){
	return User.find({
		where: {
			userName: userName
		}
	});
};
/**
 * Create a new user
 * @param user object literal containing info about a user
 * - userName {String}
 * - firstName {String}
 * - lastName {String}
 * - status: active vs inactive
**/
export function create (user){
	return User.create(user);
};

/**
 * Delete user(s) based on input criteria
 * @param user object literal containing info about a user
 * - userName {String}
 * - firstName {String}
 * - lastName {String}
 * - status: active vs inactive
**/
export function deleteUser (user){
	return User.destroy({
		where: {
			...user
		}
	});
};
