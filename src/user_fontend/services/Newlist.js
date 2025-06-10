import axios from "axios";
export const getNewlist = async (data) => {
  return await axios.get("http://localhost:5050/api/newss/", data);
};

export const getNewById = async (id, data) => {
  return await axios.get(`http://localhost:5050/api/newss/${id}`, data);
}