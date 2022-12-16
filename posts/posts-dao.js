import postsModel from "./posts-model.js";

export const createPost = (post) => postsModel.create(post)

export const findPostsByWorkID = async (workID) =>
    await postsModel.find(
        {workID})
    .populate('author')// Include reviewer's fields
    .exec()

export const findPostsByUserID = async (userID) =>
    await postsModel.find({author: userID}).exec()

export const deletePost = async (postID) =>
    await postsModel.deleteOne({_id: postID}).exec()