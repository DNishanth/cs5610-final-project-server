import usersModel from "./users-model.js";

export const createUser = (user) =>
    usersModel.create(user)