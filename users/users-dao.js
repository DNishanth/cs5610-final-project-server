import usersModel from "./users-model.js";

export const createUser = (user) => usersModel.create(user)

export const findUserByUsername = async (username) =>
    await usersModel.findOne({username})