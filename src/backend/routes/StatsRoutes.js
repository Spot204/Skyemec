import express from "express";
import Appointment from "../model/Appointment.js";
const router = express.Router();

router.get("/appointments/hospital", async (req, res) => {
  try {
    const validModes = ["week", "month"];
    let { mode = "month" } = req.query;
    if (!validModes.includes(mode)) mode = "month";

    let groupId = {};
    if (mode === "week") {
      groupId = {
        hospital: "$hospital",
        year: { $isoWeekYear: "$date" },
        week: { $isoWeek: "$date" },
      };
    } else {
      groupId = {
        hospital: "$hospital",
        year: { $year: "$date" },
        month: { $month: "$date" },
      };
    }

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const result = await Appointment.aggregate([
      {
        $match: {
          date: { $gte: oneYearAgo }, // Lọc lịch 1 năm gần đây
        },
      },
      {
        $group: {
          _id: groupId,
          count: { $sum: 1 },
        },
      },
      {
        $sort:
          mode === "week"
            ? { "_id.year": 1, "_id.week": 1 }
            : { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    const data = result.map((item) => {
      const { hospital, year, month, week } = item._id;
      return {
        hospital,
        year,
        month: month || null,
        week: week || null,
        count: item.count,
      };
    });

    res.json(data);
  } catch (error) {
    console.error("GET /api/stats/appointments/hospital error:", error);
    res.status(500).json({ message: "Lỗi server khi lấy thống kê" });
  }
});

export default router;
