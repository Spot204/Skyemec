import express from "express";
import DrSchedule from "../model/drSchedule.js";
const router = express.Router();

router.get("/drschedule", async (req, res) => {
  try {
    const data = await DrSchedule.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
