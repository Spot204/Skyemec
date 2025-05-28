import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/connectDB.js";
import Patients from "./routes/patientRoutes.js";
import dotenv from "dotenv";
const PORT = process.env.PORT;
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/patients", Patients);
app.use("/api/appointment", userRoutes);

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
