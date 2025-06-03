import express from "express";
import Appointment from "../model/Appointment.js";

const router = express.Router();

/**
 * @route   GET /api/appointments
 * @desc    Lấy danh sách lịch hẹn với tìm kiếm, lọc, phân trang
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const {
      name,
      phone,
      date,
      doctor,
      hospital,
      status,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (name) query.name = { $regex: name, $options: "i" };
    if (phone) query.phone = { $regex: phone, $options: "i" };
    if (date) query.date = date;
    if (doctor) query.doctor = { $regex: doctor, $options: "i" };
    if (hospital) query.hospital = { $regex: hospital, $options: "i" };
    if (status) query.status = status;

    const skip = (page - 1) * limit;

    const appointments = await Appointment.find(query)
      .sort({ date: 1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Appointment.countDocuments(query);

    res.status(200).json({
      data: appointments,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("GET /api/appointments error:", error);
    res.status(500).json({ message: "Lỗi server khi lấy danh sách lịch hẹn" });
  }
});

/**
 * @route   GET /api/appointments/:id
 * @desc    Lấy chi tiết lịch hẹn theo ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Không tìm thấy lịch hẹn" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    console.error("GET /api/appointments/:id error:", error);
    res.status(500).json({ message: "Lỗi server khi lấy chi tiết lịch hẹn" });
  }
});

/**
 * @route   DELETE /api/appointments/:id
 * @desc    Xóa lịch hẹn theo ID
 * @access  Public (nên thêm xác thực/thêm role thực tế)
 */
router.delete("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Không tìm thấy lịch hẹn để xóa" });
    }
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Xóa lịch hẹn thành công" });
  } catch (error) {
    console.error("DELETE /api/appointments/:id error:", error);
    res.status(500).json({ message: "Lỗi server khi xóa lịch hẹn" });
  }
});

/**
 * @route   GET /api/appointments/stats/monthly
 * @desc    Thống kê số lượng lịch khám theo tháng
 * @access  Public
 */
router.get("/stats/monthly", async (req, res) => {
  try {
    const stats = await Appointment.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json(stats);
  } catch (error) {
    console.error("GET /api/appointments/stats/monthly error:", error);
    res.status(500).json({ message: "Lỗi khi lấy thống kê lịch khám theo tháng" });
  }
});

/**
 * @route   GET /api/appointments/stats/weekly
 * @desc    Thống kê số lượng lịch khám theo tuần
 * @access  Public
 */
router.get("/stats/weekly", async (req, res) => {
  try {
    const stats = await Appointment.aggregate([
      {
        $group: {
          _id: { isoWeekYear: { $isoWeekYear: "$date" }, week: { $isoWeek: "$date" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.isoWeekYear": 1, "_id.week": 1 } },
    ]);

    res.status(200).json(stats);
  } catch (error) {
    console.error("GET /api/appointments/stats/weekly error:", error);
    res.status(500).json({ message: "Lỗi khi lấy thống kê lịch khám theo tuần" });
  }
});

export default router;
