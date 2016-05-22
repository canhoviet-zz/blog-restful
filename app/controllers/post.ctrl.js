'use strict';
import logger from '../util/logger';
import commonUtil from '../util/common.util';
import errorMessages from '../../config/error.messages';
import * as postService from '../services/post.service';

const operations = {
	list: (req, resp)=>{
		const q = {
			userName: req.params.userName,
			...req.query
		}
		return postService
				.findAll(q)
				.then((data)=>{
					resp.status(200).json(data);
				});
	},
	get: (req, resp)=>{
		const postId = req.params.postId;
		return postService
				.findById(postId)
				.then((data)=>{
					if(data) {
						resp.status(200).json(data);
					} else {
						resp.status(404).send(errorMessages.POST_NOT_FOUND);
					}
				});
	},
	create: (req, resp)=>{
		const post = req.body;
		post.userId = req.params.userName;
		logger.info('About to create post ', post);
		return postService
				.create(post)
				.then((data)=>{
					resp.json(data);
				});
	},
	delete: (req, resp)=>{
		const postId = req.params.postId;
		logger.info('About to delete post ', postId);
		return postService
				.deletePost(postId)
				.then((affectedRows)=>{
					logger.info('rows deleted', affectedRows);
					resp.status(200).end();
				});
	},
	update: (req, resp)=>{
		const postId = req.params.postId;
		const post = req.body;
		post.id = postId;
		return postService
				.update(post)
				.then((p)=>{
					resp.status(200).end();
				})
				.catch(e=>{
					resp.status(400).end();
				});
	}

}

export default operations;
