import express from "express";
import User from "../model/User.js";

const router = express.Router();

// POST /api/doctors - Lấy danh sách bác sĩ, filter theo chuyên khoa trong body { specialty }
router.post("/nam123", async (req, res) => {
  try {
    const { specialty } = req.body; // lấy specialty từ body thay vì query
    let filter = { role: "doctor" };

    if (specialty) {
      filter["doctorInfo.specialty"] = specialty;
    }

    const doctors = await User.find(filter).select("fullName doctorInfo.specialty");
    res.json(doctors);
  } catch (error) {
    console.error("Lỗi lấy danh sách bác sĩ:", error);
    res.status(500).json({ message: "Lỗi server khi lấy danh sách bác sĩ" });
  }
});

export default router;
