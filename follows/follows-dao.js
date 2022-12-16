import followsModel from "./follows-model.js";

export const followUser = (follow) => followsModel.create(follow)

export const findFollowersByUserID = async (followedUserID) =>
    await followsModel.find(
        {followed: followedUserID})
        .populate('follower') // Get all the followers of the given user
        .exec()

export const findFollowingByUserID = async (followingUserID) =>
    await followsModel.find({follower: followingUserID})
        .populate('followed') // Get all the users who follow the given user
        .exec()