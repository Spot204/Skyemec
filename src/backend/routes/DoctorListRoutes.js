import express from "express";
import DrProfile from "../model/drProfile.js"; // Import model DrProfile thay vì User

const router = express.Router();

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
/**
 * POST /api/doctors/load
 * Lấy danh sách bác sĩ phân loại theo chuyên khoa và bệnh viện, phân trang
 */
router.post("/load", async (req, res) => {
  try {
    const { specialty, workplace, page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = req.body;

    const filter = {};  // Không cần filter role: "doctor" vì model DrProfile không có trường này
    if (specialty) {
      filter.specialty = { $in: [specialty] };  // Lọc theo chuyên khoa trong DrProfile
    }
    if (workplace) {
      filter.workplace = { $in: [workplace] };  // Lọc theo bệnh viện trong DrProfile
    }

    const skip = (Number(page) - 1) * Number(limit);

    // Tính tổng số bác sĩ đáp ứng filter
    const total = await DrProfile.countDocuments(filter);  
    const doctors = await DrProfile.find(filter)
      .select("name degree role avatar specialty workplace introduction education experience organizations publications")  // Chọn tất cả các trường cần thiết
      .skip(skip)
      .limit(Number(limit));

    // Lấy danh sách các chuyên khoa và bệnh viện có sẵn từ tất cả các bác sĩ
    const specialties = await DrProfile.distinct("specialty");  // Lấy các giá trị chuyên khoa khác nhau từ bác sĩ
    const workplaces = await DrProfile.distinct("workplace");  // Lấy các giá trị bệnh viện khác nhau từ bác sĩ

    res.json({
      data: doctors,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
      specialties,  // Trả về danh sách chuyên khoa
      workplaces,   // Trả về danh sách bệnh viện
    });
  } catch (error) {
    console.error("Lỗi lấy danh sách bác sĩ:", error);
    res.status(500).json({ message: "Lỗi server khi lấy danh sách bác sĩ" });
  }
});

/**
 * POST /api/doctors/search
 * Tìm kiếm bác sĩ theo tên và chuyên khoa, phân trang
 */
router.post("/search", async (req, res) => {
  try {
    const { name, specialty, page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = req.body;

    const filter = {};  // Không cần filter role: "doctor" vì model DrProfile không có trường này

    if (name) {
      filter.name = { $regex: name, $options: "i" };  // Tìm kiếm theo tên bác sĩ (trường 'name' trong DrProfile)
    }
    if (specialty) {
      filter.specialty = { $in: [specialty] };  // Lọc theo chuyên khoa trong DrProfile
    }

    const skip = (Number(page) - 1) * Number(limit);

    const total = await DrProfile.countDocuments(filter);  // Thay User bằng DrProfile
    const doctors = await DrProfile.find(filter)
      .select("name degree role avatar specialty workplace introduction education experience organizations publications")  // Chọn các trường liên quan đến bác sĩ trong DrProfile
      .skip(skip)
      .limit(Number(limit));

    res.json({
      data: doctors,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit), // Tính tổng số trang
    });
  } catch (error) {
    console.error("Lỗi tìm kiếm bác sĩ:", error);
    res.status(500).json({ message: "Lỗi server khi tìm kiếm bác sĩ" });
  }
});

export default router;
