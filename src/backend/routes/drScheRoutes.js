import express from "express";
import Dr from "../model/drAccount.js";

const router = express.Router();

// Lấy lịch trình của bác sĩ theo id
router.get("/:doctorId/schedule", async (req, res) => {
  try {
    const doctor = await Dr.findById(req.params.doctorId);
    if (!doctor)
      return res.status(404).json({ message: "Không tìm thấy bác sĩ" });
    res.json(doctor.schedules || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Thêm lịch trình cho bác sĩ
router.post("/:doctorId/schedule", async (req, res) => {
  try {
    const doctor = await Dr.findById(req.params.doctorId);
    if (!doctor)
      return res.status(404).json({ message: "Không tìm thấy bác sĩ" });
    doctor.schedules.push(req.body);
    await doctor.save();
    res.status(201).json(doctor.schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
