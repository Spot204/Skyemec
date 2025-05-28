import express from "express";
import Patient from "../model/PatientProfile.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
