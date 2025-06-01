import axios from "axios";
export const searchDoctor = async () => {
  return await axios.get("/api/doctor/list");
}
export const searchDoctorByFilter = async (filter) => {
  return await axios.post("/api/doctor/search", filter);
}