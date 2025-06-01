import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/connectDB.js";
import Patients from "./routes/patientRoutes.js";
import drRoutes from "./routes/drRoutes.js";
import drScheRoutes from "./routes/drScheRoutes.js";
import drNews from "./routes/drNewsRoutes.js";
import MedRoutes from "./routes/drMedRoutes.js";

import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5050;

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/patients", Patients);
app.use("/api/doctors", drRoutes);
app.use("/api/appointment", userRoutes);
app.use("/schedule", drScheRoutes);
app.use("/api/news", drNews);
app.use("/api/medicines", MedRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
