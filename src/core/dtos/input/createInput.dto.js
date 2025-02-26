const { isValidObjectId } = require("mongoose");

class CreateInputDTO {
    constructor(supplierId, itemId, batchNumber, quantity, inputPrice) {
        this.supplierId = supplierId; 
        this.itemId = itemId;
        this.batchNumber = batchNumber;
        this.quantity = quantity;
        this.inputPrice = inputPrice;
    }

    async validate() {
        if (!isValidObjectId(this.supplierId)) {
            throw new Error("Invalid supplier ID");
        }
        if (!isValidObjectId(this.itemId)) {
            throw new Error("Invalid item ID");
        }
        if (!this.batchNumber || typeof this.batchNumber !== "string") {
            throw new Error("Batch number is required and must be a string");
        }
        if (typeof this.quantity !== "number" || this.quantity <= 0) {
            throw new Error("Quantity must be a positive number");
        }
        if (typeof this.inputPrice !== "number" || this.inputPrice <= 0) {
            throw new Error("Input price must be a positive number");
        }
    }
}

module.exports = CreateInputDTO;
