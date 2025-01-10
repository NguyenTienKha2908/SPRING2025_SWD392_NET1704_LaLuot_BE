const { ForbiddenRequestError } = require("../core/responses/error.response");

const checkRole = (requiredRole) => {
    return (req, res, next) => {
        try {
            const userRole = req.role;
            if (userRole !== requiredRole) {
                throw new ForbiddenRequestError("You are not allowed to access this resource");
            }
            next();
        } catch (error) {
            throw error;
        }
    };
};

module.exports = checkRole;