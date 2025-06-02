// backend/routes/DeleteAccountRoutes.js
import express from "express";
import User from "../model/User.js";

const router = express.Router();

// ✅ RESTful: DELETE /api/users/:id
router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy tài khoản" });
    }
    res.json({ message: "Xóa tài khoản thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa tài khoản", error });
  }
});

export default router;
