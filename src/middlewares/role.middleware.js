const { ForbiddenRequestError } = require("../core/responses/error.response");

const checkRoles = ({ requiredRoles }) => {
    return (req, res, next) => {
        try {
            // const userRole = req.role;
            const userRole = req.user?.role;
            if (!Array.isArray(requiredRoles)) {
                throw new Error("requiredRoles must be an array");
            }
            if (!requiredRoles.includes(userRole)) {
                throw new ForbiddenRequestError("You are not allowed to access this resource");
            }
            next();
        } catch (error) {
            throw error;
        }
    };
};

module.exports = checkRoles;