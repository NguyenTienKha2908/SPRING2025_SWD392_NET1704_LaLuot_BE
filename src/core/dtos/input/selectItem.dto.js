class SelectItemDTO {
    constructor(baseItemId, manufactureDate, expiredDate, quantity, unitPrice, batchNumber) {
        this.baseItemId = baseItemId;
        this.manufactureDate = manufactureDate;
        this.expiredDate = expiredDate;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.batchNumber = batchNumber;
    }
}
module.exports = SelectItemDTO;
