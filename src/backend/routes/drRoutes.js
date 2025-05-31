import express from "express";
import DrProfile from "../model/DrProfile.js";
const router = express.Router();

// Lấy tất cả bác sĩ
router.get("/list", async (req, res) => {
  const doctors = await DrProfile.find();
  res.json(doctors);
});

export default router;

