import axios from "axios";
export const searchDoctor = async () => {
  return await axios.get("/api/doctor/list");
}