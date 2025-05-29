import express from "express";
import Appointment from "../model/Appointment.js";

const router = express.Router();

// Đặt lịch khám: POST /api/appointment/create
router.post("/create", async (req, res) => {
  console.log("BODY BACKEND NHẬN:", req.body);
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
