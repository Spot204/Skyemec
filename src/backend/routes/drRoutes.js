import express from "express";
import Dr from "../models/Dr";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Dr.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Sai email hoặc mật khẩu!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Sai email hoặc mật khẩu!" });

    res.json({ message: "Đăng nhập thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!", error });
  }
});

export default router;
