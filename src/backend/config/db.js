require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Kết nối MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Route cơ bản
app.get('/', (req, res) => {
    res.send('Server đang chạy!');
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server chạy tại http://localhost:${PORT}`);
});