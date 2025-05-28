import axios from "axios";
export const createAppointment = async (data) => {
  return await axios.post("http://localhost:5000/api/appointment/create", data);
};
