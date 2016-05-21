'use strict';

/**
 * Module dependencies.
 */
import _ from 'lodash';

/**
 * Load app configurations
 */
export default _.extend(
	require( './env/all'),
	require( './env/' + process.env.NODE_ENV) || {}
);
