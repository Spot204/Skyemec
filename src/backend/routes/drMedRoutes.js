import express from "express";
import Medicine from "../model/drMed.js";
const router = express.Router();

// Lấy thông tin 1 thuốc theo id
router.get("/:id", async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine)
      return res.status(404).json({ error: "Không tìm thấy thuốc" });
    res.json(medicine);
  } catch (err) {
    res.status(500).json({ error: "Lỗi server" });
  }
});

// Lấy danh sách thuốc
router.get("/", async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: "Lỗi server" });
  }
});

export default router;
