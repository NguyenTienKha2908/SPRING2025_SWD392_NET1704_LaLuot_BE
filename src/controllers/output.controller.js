const { CREATED, OK } = require("../core/responses/success.response");
const OutputService = require("../services/output.service");

class OutputController {
    getAllOutputRequests = async (req, res) => {
        new OK({
            message: "Get all output requests successfully",
            metadata: await OutputService.getAllOutputRequests({
                limit: req.query.limit || 10,
                sort: req.query.sort || 'ctime',
                page: req.query.page || 1,
                filter: req.query.filter ? JSON.parse(req.query.filter) : { isDeleted: false },
                select: req.query.select || '',
                expand: req.query.expand || ''
            })
        }).send(res)
    }

    createOuputRequest = async (req, res) => {
        new CREATED({
            message: "Create output request successfully",
            metadata: await OutputService.createOuputRequest(req.body)
        }).send(res)
    }

    receiveOutputRequest = async (req, res) => {
        new OK({
            message: "Receive output request successfully",
            metadata: await OutputService.receiveOutputRequest(req.body)
        }).send(res)
    }

    approveOutputRequest = async (req, res) => {
        new OK({
            message: "Approve output request successfully",
            metadata: await OutputService.approveOutputRequest(req.body)
        }).send(res)
    }

    rejectOutputRequest = async (req, res) => {
        new OK({
            message: "Reject output request successfully",
            metadata: await OutputService.rejectOutputRequest(req.body)
        }).send(res)
    }

    deliverOutputRequest = async (req, res) => {
        new OK({
            message: "Deliver output request successfully",
            metadata: await OutputService.deliverOutputRequest(req.body)
        }).send(res)
    }

    completeOutputRequest = async (req, res) => {
        new OK({
            message: "Complete output request successfully",
            metadata: await OutputService.completeOutputRequest(req.body)
        }).send(res)
    }

    cancelOutputRequest = async (req, res) => {
        new OK({
            message: "Cancel output request successfully",
            metadata: await OutputService.cancelOutputRequest(req.body)
        }).send(res)
    }
}

module.exports = new OutputController();