import mongoose from "mongoose";

const InvoiceItemSchema = new mongoose.Schema({
  description: { type: String, required: true }, // Mô tả dịch vụ khám (ví dụ: "Khám tổng quát")
  quantity: { type: Number, required: true, default: 1 }, // Số lượng dịch vụ (thường là 1)
  unitPrice: { type: Number, required: true }, // Đơn giá dịch vụ
  amount: { type: Number, required: true }, // Thành tiền (quantity * unitPrice)
});

const InvoiceSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  }, // Liên kết lịch khám
  invoiceNumber: { type: String, required: true, unique: true }, // Mã hóa đơn, ví dụ "HD20250601-001"
  issueDate: { type: Date, default: Date.now }, // Ngày phát hành hóa đơn
  items: [InvoiceItemSchema], // Danh sách dịch vụ khám tính tiền
  totalAmount: { type: Number, required: true }, // Tổng tiền của hóa đơn
  status: {
    type: String,
    enum: ["pending", "paid", "canceled"],
    default: "pending",
  }, // Trạng thái thanh toán
  notes: { type: String }, // Ghi chú thêm (nếu cần)
});

const Invoice = mongoose.model("Invoice", InvoiceSchema);

export default Invoice;
