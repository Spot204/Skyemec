import express from "express";
import Parser from "rss-parser";
const router = express.Router();
const parser = new Parser();

router.get("/tintucyte", async (req, res) => {
  try {
    const feed = await parser.parseURL("https://tuoitre.vn/rss/y-te.rss");
    const keywords = ["y tế", "bệnh viện", "bác sĩ", "chuyên khoa"];
    const filtered = feed.items.filter((item) =>
      keywords.some((keyword) =>
        (
          item.title +
          " " +
          (item.contentSnippet || "") +
          " " +
          (item.content || "")
        )
          .toLowerCase()
          .includes(keyword)
      )
    );
    res.json(filtered.slice(0, 8));
  } catch (err) {
    res.status(500).json({ error: "Không lấy được tin tức" });
  }
});

export default router;
