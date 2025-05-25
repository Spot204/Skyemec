const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDB.js");
const userRoutes = reouire('./routes/userRoutes.js');

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
connectDB();

// API test
app.use.apply('/api', userRoutes);

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server chạy trên port ${PORT}`);
});