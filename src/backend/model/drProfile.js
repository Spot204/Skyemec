import mongoose from "mongoose";

const DrProfileSchema = new mongoose.Schema(
  {
    name: String,
    degree: String,
    role: String,
    avatar: String,
    introduction: [String],
    specialty: [String],
    workplace: String,
    education: [String],
    experience: [String],
    organizations: [String],
    publications: [String],
  },
  { collection: "Doctors" }
);

const DrProfile = mongoose.model("DrProfile", DrProfileSchema);
export default DrProfile;
