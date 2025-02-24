class InventoryPojo {
    constructor(warehouseId,itemId, batchNumber, quantity) {
        this.warehouseId  = warehouseId
        this.itemId = itemId
        this.batchNumber = batchNumber
        this.quantity = quantity
    }
}
module.exports = InventoryPojo;