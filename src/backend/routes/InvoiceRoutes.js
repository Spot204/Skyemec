import express from "express";
import Invoice from "../model/InvoiceModel.js";
import Appointment from "../model/Appointment.js"; // Đảm bảo đã import Appointment model

const router = express.Router();

// Tạo hóa đơn mới
router.post("/", async (req, res) => {
  try {
    const { invoiceNumber, issueDate, items, status, notes } = req.body;

    // Kiểm tra nếu invoiceNumber đã tồn tại
    const existingInvoice = await Invoice.findOne({ invoiceNumber });
    if (existingInvoice) {
      return res.status(400).json({ message: "Mã hóa đơn đã tồn tại" });
    }

    // Tính tổng tiền cho hóa đơn
    const totalAmount = Array.isArray(items)
      ? items.reduce((sum, item) => sum + (item.amount || 0), 0)
      : 0;

    // Tạo hóa đơn mới
    const newInvoice = new Invoice({
      invoiceNumber,
      issueDate: issueDate ? new Date(issueDate) : new Date(),
      items,
      totalAmount,
      status: status || "pending",
      notes,
    });

    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    console.error("POST /api/invoices error:", error);
    res.status(500).json({ message: "Lỗi khi tạo hóa đơn" });
  }
});


// Lấy danh sách hóa đơn (hỗ trợ phân trang, lọc)
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const query = {};
    if (status) query.status = status;

    const skip = (page - 1) * limit;

    const invoices = await Invoice.find(query)
      .sort({ issueDate: -1 })
      .skip(skip)
      .limit(Number(limit)); // Không cần populate("appointmentId")

    const total = await Invoice.countDocuments(query);

    res.status(200).json({
      data: invoices,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("GET /api/invoices error:", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách hóa đơn" });
  }
});


// Lấy chi tiết hóa đơn theo ID
// Lấy chi tiết hóa đơn theo ID
router.get("/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id); // Loại bỏ populate("appointmentId")
    if (!invoice) {
      return res.status(404).json({ message: "Không tìm thấy hóa đơn" });
    }
    res.status(200).json(invoice);
  } catch (error) {
    console.error("GET /api/invoices/:id error:", error);
    res.status(500).json({ message: "Lỗi khi lấy chi tiết hóa đơn" });
  }
});


// Cập nhật hóa đơn theo ID
// Cập nhật hóa đơn theo ID
router.put("/:id", async (req, res) => {
  try {
    const { invoiceNumber, issueDate, items, status, notes } = req.body;

    // Tính tổng tiền cho hóa đơn
    const totalAmount = Array.isArray(items)
      ? items.reduce((sum, item) => sum + (item.amount || 0), 0)
      : 0;

    // Tiến hành cập nhật hóa đơn mà không cần appointmentId
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      {
        invoiceNumber,
        issueDate: issueDate ? new Date(issueDate) : new Date(),
        items,
        totalAmount,
        status,
        notes,
      },
      { new: true, runValidators: true }
    );

    if (!updatedInvoice) {
      return res.status(404).json({ message: "Không tìm thấy hóa đơn để cập nhật" });
    }

    res.status(200).json(updatedInvoice);
  } catch (error) {
    console.error("PUT /api/invoices/:id error:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật hóa đơn" });
  }
});


// Xóa hóa đơn theo ID
router.delete("/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: "Không tìm thấy hóa đơn để xóa" });
    }
    await Invoice.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Xóa hóa đơn thành công" });
  } catch (error) {
    console.error("DELETE /api/invoices/:id error:", error);
    res.status(500).json({ message: "Lỗi khi xóa hóa đơn" });
  }
});

export default router;
