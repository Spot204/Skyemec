import express from "express";
import DrProfile from "../model/DrProfile.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const doctors = await DrProfile.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const doctor = await DrProfile.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
