import express from "express";
import Appointment from "../model/Appointment.js";
import Report from "../model/Report.js";
import nodemailer from "nodemailer";

const router = express.Router();

// Lấy toàn bộ danh sách bệnh nhân (tức là tất cả appointment)
router.get("/", async (req, res) => {
  try {
    const patients = await Appointment.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Lấy một bệnh nhân theo id
router.get("/:id", async (req, res) => {
  try {
    const patient = await Appointment.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Cập nhật thông tin bệnh nhân theo id
router.put("/:id", async (req, res) => {
  try {
    const updatedPatient = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPatient)
      return res.status(404).json({ message: "Patient not found" });
    res.json(updatedPatient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Đặt lịch khám: POST /api/patients/create
router.post("/create", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();

    // Gửi email xác nhận đặt lịch khám
    const { email, name, hospital, birthday } = req.body;
    if (email) {
      const subject = "Xác nhận đặt lịch khám Skyemec";
      const text = `Xin chào ${name},\n\nBạn đã đăng ký đặt lịch khám tại: ${hospital}\nNgày sinh: ${birthday}\nChúng tôi đã nhận được thông tin của bạn và sẽ liên hệ lại sớm nhất.\n\nCảm ơn bạn đã chọn Skyemec!\n\nTrân trọng,\nSkyemec`;
      try {
        await sendConfirmationEmail(email, subject, text);
      } catch (mailErr) {
        console.error("Lỗi gửi email xác nhận:", mailErr);
      }
    }
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Gửi báo cáo: POST /api/patients/report
router.post("/report", async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();

    // Gửi email xác nhận báo cáo
    const { email, name, hospital, birthday } = req.body;
    if (email) {
      const subject = "Xác nhận gửi báo cáo Skyemec";
      const text = `Xin chào ${name},\n\nBạn đã gửi báo cáo/yêu cầu tại bệnh viện: ${hospital}\nChúng tôi đã nhận được thông tin của bạn và sẽ xử lý trong thời gian sớm nhất.\n\nTrân trọng,\nSkyemec`;
      try {
        await sendConfirmationEmail(email, subject, text);
      } catch (mailErr) {
        console.error("Lỗi gửi email xác nhận báo cáo:", mailErr);
      }
    }

    res.json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Gửi email thông báo
async function sendConfirmationEmail(to, subject, text) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: '"Skyemec" <your-email@gmail.com>',
    to,
    subject,
    text,
  });
}

export default router;
