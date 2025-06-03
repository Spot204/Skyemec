// Lấy thông tin bệnh nhân theo email hoặc id
import express from "express";
import Appointment from "../model/Appointment.js";
import Report from "../model/Report.js";
import nodemailer from "nodemailer";

const router = express.Router();

// Đặt lịch khám: POST /api/appointment/create
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

// Gửi báo cáo: POST /api/appointment/report
router.post("/report", async (req, res) => {
  console.log("BODY BACKEND NHẬN:", req.body);
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

router.post;

// Gửi email thông báo
async function sendConfirmationEmail(to, subject, text) {
  let transporter = nodemailer.createTransport({
    service: "gmail", // hoặc SMTP khác
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // dùng app password, không dùng mật khẩu thường
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
