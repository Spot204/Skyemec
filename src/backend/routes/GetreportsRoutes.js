// routes/GetreportsRoutes.js
import express from "express";
import Report from "../model/Report.js";

const router = express.Router();

/**
 * @route   GET /api/reports
 * @desc    Lấy danh sách tất cả lịch hẹn
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().sort({ _id: -1 }); // Lấy mới nhất trước
    res.status(200).json(reports);
  } catch (error) {
    console.error("GET /api/reports error:", error);
    res.status(500).json({ message: "Lỗi server khi lấy danh sách lịch hẹn" });
  }
});

/**
 * @route   GET /api/reports/:id
 * @desc    Lấy chi tiết lịch hẹn theo ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: "Không tìm thấy lịch hẹn" });
    }
    res.status(200).json(report);
  } catch (error) {
    console.error("GET /api/reports/:id error:", error);
    res.status(500).json({ message: "Lỗi server khi lấy chi tiết lịch hẹn" });
  }
});

export default router;
