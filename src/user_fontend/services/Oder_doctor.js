import axios from "axios";
export const createAppointment = async (data) => {
  return await axios.post("http://localhost:5050/api/appointment/create", data);
};
export const createReport = async (data) => {
  return await axios.post("http://localhost:5050/api/appointment/report", data);
};

//nếu lỗi cái appointment thì tôi nghĩ là sửa nó thành patients á Banh
