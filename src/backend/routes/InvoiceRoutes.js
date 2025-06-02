import express from "express";
import Invoice from "../model/InvoiceModel.js";

const router = express.Router();

// Tạo hóa đơn mới
router.post("/", async (req, res) => {
  try {
    const { appointmentId, invoiceNumber, issueDate, items, status, notes } = req.body;

    const totalAmount = Array.isArray(items)
      ? items.reduce((sum, item) => sum + (item.amount || 0), 0)
      : 0;

    const newInvoice = new Invoice({
      appointmentId,
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
      .populate("appointmentId")
      .sort({ issueDate: -1 })
      .skip(skip)
      .limit(Number(limit));

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
router.get("/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate("appointmentId");
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
router.put("/:id", async (req, res) => {
  try {
    const { appointmentId, invoiceNumber, issueDate, items, status, notes } = req.body;

    const totalAmount = Array.isArray(items)
      ? items.reduce((sum, item) => sum + (item.amount || 0), 0)
      : 0;

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      {
        appointmentId,
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
