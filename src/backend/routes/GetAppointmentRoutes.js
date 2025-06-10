import express from "express";
import Appointment from "../model/Appointment.js";

const router = express.Router();

const mapAppointment = (appointment) => ({
  ...appointment.toObject(),
  hospital: appointment.hospital || appointment.registeredHospital,
  birthday: appointment.birthday || appointment.birthDate,
  date: appointment.date || appointment.examinationDate,
});

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

    const mappedAppointments = appointments.map(mapAppointment);

    res.status(200).json({
      data: mappedAppointments,
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
 * @route   GET /api/appointments/stats
 * @desc    Thống kê số lượng lịch khám theo ngày được đặt lịch khám trong khoảng thời gian và bệnh viện được chọn
 * @access  Public
 */
router.get("/stats", async (req, res) => {
  try {
    const { startDate, endDate, hospital } = req.query;

    // Kiểm tra và chuyển đổi ngày tháng (startDate, endDate) thành Date objects
    const start = startDate ? new Date(startDate) : new Date();
    const end = endDate ? new Date(endDate) : new Date();

    // Tạo query filter cho thống kê
    const query = {
      examinationDate: { $gte: start, $lte: end }, // Lọc theo examinationDate
    };

    // Nếu có bệnh viện, thêm điều kiện vào query
    if (hospital) {
      query.registeredHospital = { $regex: hospital, $options: "i" }; // Lọc theo registeredHospital
    }

    // Thực hiện aggregation để nhóm dữ liệu theo ngày
    const stats = await Appointment.aggregate([
      {
        $match: query, // Áp dụng filter từ query
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$examinationDate" } }, // Nhóm theo ngày examinationDate
          count: { $sum: 1 }, // Đếm số lượng lịch khám
        },
      },
      { $sort: { _id: 1 } }, // Sắp xếp theo ngày
    ]);

    res.status(200).json(stats); // Trả về thống kê
  } catch (error) {
    console.error("GET /api/appointments/stats error:", error);
    res.status(500).json({ message: "Lỗi khi lấy thống kê lịch khám theo ngày" });
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

export default router;
