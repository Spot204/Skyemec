import mongoose from "mongoose";

const MedicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dosage_forms: [String],
    group: String,
    indications: [String],
    contraindications: [String],
    precautions: [String],
    side_effects: {
      common: [String],
      less_common: [String],
      rare: [String],
    },
    dosage_and_administration: {
      adults: [String],
      children: [String],
      instructions: [String],
    },
    notes: [String],
    references: [String],
  },
  { collection: "Medicines" }
);

export default mongoose.model("Medicine", MedicineSchema);
