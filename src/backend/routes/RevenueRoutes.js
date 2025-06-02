import express from "express";
import Invoice from "../model/InvoiceModel.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { mode = "month", hospital } = req.query; // mode = week hoặc month

    let groupId = {};
    if (mode === "week") {
      groupId = {
        year: { $isoWeekYear: "$issueDate" },
        week: { $isoWeek: "$issueDate" },
      };
    } else {
      groupId = {
        year: { $year: "$issueDate" },
        month: { $month: "$issueDate" },
      };
    }

    if (hospital) {
      // Nếu bạn có trường hospital trong hóa đơn, thêm như này
      groupId.hospital = "$hospital";
    }

    const matchStage = { status: "paid" };
    if (hospital) {
      matchStage.hospital = hospital;
    }

    const pipeline = [
      { $match: matchStage },
      {
        $group: {
          _id: groupId,
          totalRevenue: { $sum: "$totalAmount" },
          countInvoices: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.week": 1,
        },
      },
    ];

    const results = await Invoice.aggregate(pipeline);

    const data = results.map((item) => {
      const { year, month, week, hospital } = item._id;
      return {
        hospital,
        year,
        month,
        week,
        totalRevenue: item.totalRevenue,
        countInvoices: item.countInvoices,
      };
    });

    res.json(data);
  } catch (error) {
    console.error("GET /api/revenue error:", error);
    res.status(500).json({ message: "Lỗi server khi lấy thống kê doanh thu" });
  }
});

export default router;
