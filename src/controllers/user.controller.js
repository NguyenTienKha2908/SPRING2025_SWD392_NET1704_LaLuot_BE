const { FILTER_USER, SELECT_USER } = require("../configs/user.config")
const { OK, CREATED } = require("../core/responses/success.response")
const UserService = require("../services/user.service")

class UserController {
    getAllUsers = async (req, res) => {
        new OK({
            message: "Get all users successfully",
            metadata: await UserService.getAllUsers({
                limit: req.query.limit || 10,
                sort: req.query.sort || 'ctime',
                page: req.query.page || 1,
                filter: req.query.filter ? JSON.parse(req.query.filter) : FILTER_USER.NORMAL_USER, // http://localhost:8386/api/v1/users?filter={"isDeleted":false}
                select: req.query.select || SELECT_USER.DEFAULT
            })
        }).send(res)
    }

    getUserById = async (req, res) => {
        new OK({
            message: "Get user successfully",
            metadata: await UserService.getUserById(req.params)
        }).send(res)
    }

    createUser = async (req, res) => {
        new CREATED({
            message: "Create user successfully",
            metadata: await UserService.createUser(req.body)
        }).send(res)
    }
}

module.exports = new UserController()