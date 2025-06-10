import mongoose from "mongoose";

// Schema cho mỗi mục trong hóa đơn
const InvoiceItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  unitPrice: { type: Number, required: true },
  amount: { type: Number, required: true }, // Thành tiền
});

// Schema cho hóa đơn
const InvoiceSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment", // Tham chiếu đến Appointment model
    required: true,
  },
  invoiceNumber: { type: String, required: true, unique: true }, // Mã hóa đơn
  issueDate: { type: Date, default: Date.now }, // Ngày phát hành
  items: [InvoiceItemSchema], // Danh sách các mục hóa đơn
  totalAmount: { type: Number, required: true }, // Tổng tiền
  status: {
    type: String,
    enum: ["pending", "paid", "canceled"],
    default: "pending",
  }, // Trạng thái hóa đơn
  notes: { type: String }, // Ghi chú
});

const Invoice = mongoose.model("Invoice", InvoiceSchema);

export default Invoice;
