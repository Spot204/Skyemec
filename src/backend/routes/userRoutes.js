import express from "express";
import User from "../model/User.js";

const router = express.Router();

// Đặt lịch khám: POST /api/appointment/create
router.post("/create", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
