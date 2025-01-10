const userModel = require("../models/user.model");
const { getAllUsers } = require("../repositories/user.repo");

class UserService {
    static getAllUsers = async ({ limit, sort, page, filter, select }) => {
        const usersHolder = await getAllUsers({ limit, sort, page, filter, select });
        return usersHolder
    }
}

module.exports = UserService;