import express from "express";
import News from "../model/News.js"; // ES Module style, cần phải có export default

const router = express.Router();

// Thêm mới tin tức
router.post("/", async (req, res) => {
  try {
    const { name, headers, notes, images } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Tên tin tức không được để trống" });
    }

    const newNews = new News({ name, headers, notes, images });
    await newNews.save();

    res.status(201).json({ message: "Thêm tin tức thành công", news: newNews });
  } catch (error) {
    console.error("Lỗi khi thêm tin tức:", error);
    res.status(500).json({ message: "Lỗi server khi thêm tin tức", error: error.message });
  }
});

// Lấy danh sách tin tức
router.get("/", async (req, res) => {
  try {
    const newsList = await News.find();
    res.json(newsList);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách tin tức:", error);
    res.status(500).json({ message: "Lỗi server khi lấy danh sách tin tức", error: error.message });
  }
});

// Cập nhật tin tức theo ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, headers, notes, images } = req.body;

    const updatedNews = await News.findByIdAndUpdate(
      id,
      { name, headers, notes, images },
      { new: true, runValidators: true }
    );

    if (!updatedNews) {
      return res.status(404).json({ message: "Không tìm thấy tin tức với ID này" });
    }

    res.json({ message: "Cập nhật tin tức thành công", news: updatedNews });
  } catch (error) {
    console.error("Lỗi khi cập nhật tin tức:", error);
    res.status(500).json({ message: "Lỗi server khi cập nhật tin tức", error: error.message });
  }
});

// Xóa tin tức theo ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await News.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy tin tức với ID này" });
    }
    res.json({ message: "Xóa tin tức thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa tin tức:", error);
    res.status(500).json({ message: "Lỗi server khi xóa tin tức", error: error.message });
  }
});

export default router;
