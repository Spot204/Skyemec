import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  headers: [{ type: String }],
  notes: [{ type: String }],
  images: [{ type: String }],
}, {
  collection: "news"
});

const News = mongoose.model("News", newsSchema);

export default News; // <=== Bắt buộc phải có dòng này để export default
