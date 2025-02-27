class CreateInputDTO {
  constructor(title, reportStaffId, supplierId) {
    this.title = title;
    this.reportStaffId = reportStaffId;
    this.supplierId = supplierId;
    this.status = "Pending"; // Mặc định
  }
}

module.exports = CreateInputDTO;
