import express from "express";
import User from "../model/User.js";

const router = express.Router();

// GET /api/users - Trả về danh sách tất cả user (admin, doctor, user)
router.get("/", async (req, res) => {
  try {
    const users = await User.find({
      role: { $in: ["admin", "doctor", "user"] },
    }).select("-password"); // Không trả về mật khẩu

    res.status(200).json(users);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách user:", error);
    res.status(500).json({ message: "Lỗi server khi truy vấn người dùng." });
  }
});

export default router;
