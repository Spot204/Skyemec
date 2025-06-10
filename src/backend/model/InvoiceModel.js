import mongoose from "mongoose";

const InvoiceItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  unitPrice: { type: Number, required: true },
  amount: { type: Number, required: true }, // Thành tiền
});

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  issueDate: { type: Date, default: Date.now },  // Ngày phát hành
  items: [InvoiceItemSchema],  // Danh sách dịch vụ
  totalAmount: { 
    type: Number, 
    required: true, 
    default: 0
  },
  status: {
    type: String,
    enum: ["pending", "paid", "canceled"],
    default: "pending",  // Trạng thái hóa đơn
  },
  paymentDate: { type: Date },  // Ngày thanh toán
  notes: { type: String },  // Ghi chú
});

// Tính toán tổng tiền và lưu vào totalAmount khi tạo hóa đơn
InvoiceSchema.pre('save', function(next) {
  if (this.isModified('items')) {
    let total = 0;
    this.items.forEach(item => {
      item.amount = item.quantity * item.unitPrice;
      total += item.amount;
    });
    this.totalAmount = total;  // Tính toán lại tổng tiền
  }
  next();
});

const Invoice = mongoose.model("Invoice", InvoiceSchema);

export default Invoice;
