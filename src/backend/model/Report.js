import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
    hospital: { type: String }, // Cơ sở khám
    service: { type: String }, // Dịch vụ khám
    name: { type: String }, // Họ tên
    birthday: { type: String }, // Ngày sinh
    phone: { type: String }, // Số điện thoại
    email: { type: String }, // Email
    pid: { type: String }, // PID nếu có
    note: { type: String }, // Chi tiết yêu cầu
});

const Report = mongoose.model("Report", ReportSchema,"reports"); // Tên collection là "reports"
export default Report;