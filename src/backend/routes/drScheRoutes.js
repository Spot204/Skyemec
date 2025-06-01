import express from "express";
import DrSchedule from "../model/drSchedule.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { month, year } = req.query;
  const query = {};
  if (month) query.month = parseInt(month);
  if (year) query.year = parseInt(year);
  try {
    const data = await DrSchedule.find(query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
