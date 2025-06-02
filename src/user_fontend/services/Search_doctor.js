import axios from "axios";
export const searchDoctor = async () => {
  return await axios.get("/api/doctors/list"); // đây là doctors vì server.js để là doctors nha Banh, tôi sửa lại cho đúng á
};
export const searchDoctorByFilter = async (filter) => {
  return await axios.post("/api/doctors/search", filter);
};
