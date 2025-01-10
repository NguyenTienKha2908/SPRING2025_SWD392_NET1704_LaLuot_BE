const { OK } = require("../core/responses/success.response")
const UserService = require("../services/user.service")

class UserController {
    getAllUsers = async (req, res) => {
        new OK({
            message: "Get all users successfully",
            metadata: await UserService.getAllUsers({
                limit: req.query.limit || 10,
                sort: req.query.sort || 'ctime',
                page: req.query.page || 1,
                filter: req.query.filter ? JSON.parse(req.query.filter) : { isDeleted: false }, // http://localhost:8386/api/v1/users?filter={"isDeleted":false}
                select: req.query.select
            })
        }).send(res)
    }
}

module.exports = new UserController()