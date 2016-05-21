'use strict';

import models from '../models';
const Post = models.Post;

/**
 * Find all posts by a Post in the db
 *
**/
export function findAll ({limit = 50, offset = 0, userName='',...otherOptions} = {}){
	return Post.findAll({
		limit: Number(limit),
		offset: Number(offset),
		where: {
			...otherOptions
		}
	});
};
/**
 * Find post by id
 * @param postId id of the post to find
**/
export function findById (postId){
	return Post.findById(postId);
};

/**
 * Create a new post
 * @param post object literal containing info about a post
 * - title {String}
 * - content {String}
 * - userId {String}
 * - status: draf vs published
**/
export function create (post){
	return Post.create(post);
};

/**
 * Update a post
 * @param post {Object} object literal containing info about a post
 * - id {UUID} required
 * - title {String}
 * - content {String}
 * - userId {String}
 * - status: draf vs published
**/
export function update (post){
	return Post
			.findById(post.id)
			.then((p)=>{
				return p.update(post);
			});

};
/**
 * Delete a post by id
 * @param postId {UUID}
**/
export function deletePost (postId){
	return Post.destroy({
		where: {
			id: postId
		}
	});
};
