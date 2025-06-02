import express from "express";
import User from "../model/User.js"; // ✅ đảm bảo đường dẫn đúng, là 'model' (không phải 'models')

const router = express.Router();

// API cập nhật tài khoản
router.put("/update-account/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy tài khoản" });
    }
    res.json({ message: "Cập nhật tài khoản thành công", user });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật tài khoản", error });
  }
});

export default router;
