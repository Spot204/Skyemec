import mongoose from "mongoose";

const RelativeSchema = new mongoose.Schema({
  name: String,
  phone: String,
  relation: String,
  address: String,
});

const PatientSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    birthDate: String,
    idNumber: String,
    gender: String,
    ethnicity: String,
    address: String,
    insuranceNumber: String,
    examinationDate: String,
    registeredHospital: String,
    job: String,
    relatives: [RelativeSchema],
    medicalHistory: [String],
    examinationReasons: [String],
    treatmentPlan: [String],
    currentStatus: [String],
    tests: [String],
    diary: [String],
  },
  { collection: "Patients" }
);

const Patient = mongoose.model("Patient", PatientSchema);
export default Patient;
