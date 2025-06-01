import express from "express";
import DrProfile from "../model/drProfile.js";
const router = express.Router();

// Lấy tất cả bác sĩ
router.get("/list", async (req, res) => {
  const doctors = await DrProfile.find();
  res.json(doctors);
});

router.get("/:id", async (req, res) => {
  try {
    const doctor = await DrProfile.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/search", async (req, res) => {
  try {
    const { name, hospital, specialty, degree, rank } = req.body;
    const query = {};

    if (name) query.name = { $regex: name, $options: "i" };
    if (hospital) query.workplace = { $regex: hospital, $options: "i" };
    if (specialty) query.role = { $regex: specialty, $options: "i" };
    if (degree) query.degree = { $regex: degree, $options: "i" };
    if (rank) query.rank = { $regex: rank, $options: "i" };
    console.log("Search query:", query);
    const doctors = await DrProfile.find(query);
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
