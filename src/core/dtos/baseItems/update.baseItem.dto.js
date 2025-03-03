class CreateInputDTO {
  constructor(title) {
    this.title = title;
  }
  async validate() {
    if (!this.title || typeof this.title !== "string") {
      throw new Error("Title is required and must be a string");
    }
  }
}

class AddInputDetailDTO {
  constructor(
    itemId,
    quantity,
    unitPrice,
    batchNumber,
    manufactureDate,
    expiredDate
  ) {
    this.itemId = itemId;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.batchNumber = batchNumber;
    this.manufactureDate = manufactureDate;
    this.expiredDate = expiredDate;
  }
  async validate() {
    if (
      !this.itemId ||
      !this.quantity ||
      !this.unitPrice ||
      !this.batchNumber ||
      !this.manufactureDate ||
      !this.expiredDate
    ) {
      throw new Error("All fields are required");
    }
    if (new Date(this.expiredDate) <= new Date(this.manufactureDate)) {
      throw new Error("Expired date must be later than manufacture date");
    }
  }
}

class SelectSupplierDTO {
  constructor(supplierId) {
    this.supplierId = supplierId;
  }
  async validate() {
    if (!this.supplierId) {
      throw new Error("Supplier ID is required");
    }
  }
}

module.exports = { CreateInputDTO, AddInputDetailDTO, SelectSupplierDTO };
