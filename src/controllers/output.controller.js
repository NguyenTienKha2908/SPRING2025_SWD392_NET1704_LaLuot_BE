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

    getOutputRequest = async (req, res) => {
        new OK({
            message: "Get output request successfully",
            metadata: await OutputService.getOutputRequest({
                id: req.params.id
            })
        }).send(res)
    }

    createOuputRequest = async (req, res) => {
        new CREATED({
            message: "Create output request successfully",
            metadata: await OutputService.createOuputRequest(req.body)
        }).send(res)
    }

    getAllOuputDetails = async (req, res) => {
        new OK({
            message: "Get all output details successfully",
            metadata: await OutputService.getAllOutputDetails({
                limit: req.query.limit || 10,
                sort: req.query.sort || 'ctime',
                page: req.query.page || 1,
                filter: req.query.filter ? JSON.parse(req.query.filter) : { isDeleted: false },
                select: req.query.select || '',
                expand: req.query.expand || ''
            })
        }).send(res)
    }

    getOutputDetail = async (req, res) => {
        new OK({
            message: "Get output detail successfully",
            metadata: await OutputService.getOutputDetail({
                id: req.params.id
            })
        }).send(res)
    }

    receiveOutputRequest = async (req, res) => {
        new OK({
            message: "Receive output request successfully",
            metadata: await OutputService.receiveOutputRequest({
                id: req.params.id,
                reportStaffId: req.body.reportStaffId
            })
        }).send(res)
    }

    approveOutputRequest = async (req, res) => {
        new OK({
            message: "Approve output request successfully",
            metadata: await OutputService.approveOutputRequest({
                id: req.params.id,
                managerId: req.body.managerId
            })
        }).send(res)
    }

    rejectOutputRequest = async (req, res) => {
        new OK({
            message: "Reject output request successfully",
            metadata: await OutputService.rejectOutputRequest({
                id: req.params.id,
                managerId: req.body.managerId
            })
        }).send(res)
    }

    deliverOutputRequest = async (req, res) => {
        new OK({
            message: "Deliver output request successfully",
            metadata: await OutputService.deliverOutputRequest({
                id: req.params.id,
                inventoryStaffId: req.body.inventoryStaffId
            })
        }).send(res)
    }

    completeOutputRequest = async (req, res) => {
        new OK({
            message: "Complete output request successfully",
            metadata: await OutputService.completeOutputRequest({
                id: req.params.id,
            })
        }).send(res)
    }

    cancelOutputRequest = async (req, res) => {
        new OK({
            message: "Cancel output request successfully",
            metadata: await OutputService.cancelOutputRequest({
                id: req.params.id,
                cancelReason: req.body.cancelReason
            })
        }).send(res)
    }
}

module.exports = new OutputController();