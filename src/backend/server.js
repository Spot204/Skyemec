import express from "express";
import cors from "cors";
import connectDB from "./config/connectDB.js";

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
connectDB();


// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server chạy trên port ${PORT}`);
});