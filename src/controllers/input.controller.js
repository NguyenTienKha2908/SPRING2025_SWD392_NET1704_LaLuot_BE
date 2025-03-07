const { CREATED, OK } = require("../core/responses/success.response");
const InputService = require("../services/input.service");

class InputController {
    getAllInputRequests = async (req, res) => {
        new OK({
            message: "Get all input requests successfully",
            metadata: await InputService.getAllInputRequests({
                limit: req.query.limit || 10,
                sort: req.query.sort || 'ctime',
                page: req.query.page || 1,
                filter: req.query.filter ? JSON.parse(req.query.filter) : { isDeleted: false },
                select: req.query.select || '',
                expand: req.query.expand || ''
            })
        }).send(res);
    }

    getInputRequest = async (req, res) => {
        new OK({
            message: "Get input request successfully",
            metadata: await InputService.getInputRequest({
                id: req.params.id
            })
        }).send(res);
    }

    createInputRequest = async (req, res) => {
        new CREATED({
            message: "Create input request successfully",
            metadata: await InputService.createInputRequest(req.body)
        }).send(res);
    }

    getAllInputDetails = async (req, res) => {
        new OK({
            message: "Get all input details successfully",
            metadata: await InputService.getAllInputDetails({
                limit: req.query.limit || 10,
                sort: req.query.sort || 'ctime',
                page: req.query.page || 1,
                filter: req.query.filter ? JSON.parse(req.query.filter) : { isDeleted: false },
                select: req.query.select || '',
                expand: req.query.expand || ''
            })
        }).send(res);
    }

    getInputDetail = async (req, res) => {
        new OK({
            message: "Get input detail successfully",
            metadata: await InputService.getInputDetail({
                id: req.params.id
            })
        }).send(res);
    }

    approveInputRequest = async (req, res) => {
        new OK({
            message: "Approve input request successfully",
            metadata: await InputService.approveInputRequest({
                id: req.params.id,
                ...req.body
            })
        }).send(res);
    }

    rejectInputRequest = async (req, res) => {
        new OK({
            message: "Reject input request successfully",
            metadata: await InputService.rejectInputRequest({
                id: req.params.id,
                ...req.body
            })
        }).send(res);
    }

    deliverInputRequest = async (req, res) => {
        new OK({
            message: "Receive input request successfully",
            metadata: await InputService.deliverInputRequest({
                id: req.params.id,
                ...req.body
            })
        }).send(res);
    }

    completeInputRequest = async (req, res, next, session) => {
        new OK({
            message: "Complete input request successfully",
            metadata: await InputService.completeInputRequest({
                id: req.params.id,
                ...req.body,
                session: session
            })
        }).send(res);
    }

    cancelInputRequest = async (req, res) => {
        new OK({
            message: "Cancel input request successfully",
            metadata: await InputService.cancelInputRequest({
                id: req.params.id,
                cancelReason: req.body.cancelReason
            })
        }).send(res);
    }
}

module.exports = new InputController();
