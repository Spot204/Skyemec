import React, { useState, useEffect } from "react";
import "../styles/UpdateAccount.css";
import { updateUser } from "../services/UpdateService"; // ✅ import đúng service

const roles = ["admin", "doctor", "user"];
const genders = ["Male", "Female", "Other"];

export default function UpdateAccount({ userToEdit, onSave, onCancel }) {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState(roles[0]);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState(genders[0]);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");

  const [specialty, setSpecialty] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [workSchedule, setWorkSchedule] = useState([]);
  const [department, setDepartment] = useState("");

  const [medicalHistory, setMedicalHistory] = useState("");
  const [insuranceInfo, setInsuranceInfo] = useState("");

  useEffect(() => {
    if (userToEdit) {
      setUsername(userToEdit.username || "");
      setRole(userToEdit.role || roles[0]);
      setFullName(userToEdit.fullName || "");
      setPhoneNumber(userToEdit.phoneNumber || "");
      setGender(userToEdit.gender || genders[0]);
      setDateOfBirth(userToEdit.dateOfBirth || "");
      setAddress(userToEdit.address || "");

      setSpecialty(userToEdit.doctorInfo?.specialty || "");
      setLicenseNumber(userToEdit.doctorInfo?.licenseNumber || "");
      setWorkSchedule(userToEdit.doctorInfo?.workSchedule || []);
      setDepartment(userToEdit.doctorInfo?.department || "");

      setMedicalHistory(userToEdit.userInfo?.medicalHistory || "");
      setInsuranceInfo(userToEdit.userInfo?.insuranceInfo || "");
    }
  }, [userToEdit]);

  const addWorkSchedule = () => {
    setWorkSchedule([...workSchedule, { day: "", start: "", end: "" }]);
  };

  const updateWorkScheduleItem = (index, field, value) => {
    const updated = [...workSchedule];
    updated[index][field] = value;
    setWorkSchedule(updated);
  };

  const removeWorkScheduleItem = (index) => {
    const updated = [...workSchedule];
    updated.splice(index, 1);
    setWorkSchedule(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !fullName.trim()) {
      alert("Vui lòng nhập đầy đủ username và họ tên");
      return;
    }

    const updatedUser = {
      username: username.trim(),
      role,
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      gender,
      dateOfBirth,
      address: address.trim(),
    };

    if (role === "doctor") {
      updatedUser.doctorInfo = {
        specialty: specialty.trim(),
        licenseNumber: licenseNumber.trim(),
        workSchedule,
        department: department.trim(),
      };
    } else if (role === "user") {
      updatedUser.userInfo = {
        medicalHistory: medicalHistory.trim(),
        insuranceInfo: insuranceInfo.trim(),
      };
    }

    try {
      const result = await updateUser(userToEdit._id, updatedUser); // ✅ dùng _id
      alert("Cập nhật thành công!");
      onSave(result);
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
      alert("Không thể cập nhật tài khoản");
    }
  };

  return (
    <div className="update-account">
      <h2>Cập nhật thông tin tài khoản</h2>
      <form onSubmit={handleSubmit} className="ua-form">
        <label>Username:</label>
        <input value={username} disabled readOnly />

        <label>Vai trò:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          {roles.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <label>Họ và tên:</label>
        <input value={fullName} onChange={(e) => setFullName(e.target.value)} required />

        <label>Số điện thoại:</label>
        <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

        <label>Giới tính:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          {genders.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <label>Ngày sinh:</label>
        <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />

        <label>Địa chỉ:</label>
        <input value={address} onChange={(e) => setAddress(e.target.value)} />

        {role === "doctor" && (
          <>
            <h3>Thông tin bác sĩ</h3>
            <label>Chuyên khoa:</label>
            <input value={specialty} onChange={(e) => setSpecialty(e.target.value)} />
            <label>Mã chứng chỉ hành nghề:</label>
            <input value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} />
            <label>Lịch làm việc:</label>
            {workSchedule.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                <select value={item.day} onChange={(e) => updateWorkScheduleItem(i, "day", e.target.value)} required>
                  <option value="">Chọn ngày</option>
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <select value={item.start} onChange={(e) => updateWorkScheduleItem(i, "start", e.target.value)} required>
                  <option value="">Bắt đầu</option>
                  {["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
                <select value={item.end} onChange={(e) => updateWorkScheduleItem(i, "end", e.target.value)} required>
                  <option value="">Kết thúc</option>
                  {["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
                <button type="button" onClick={() => removeWorkScheduleItem(i)} style={{ backgroundColor: "#cc4444", color: "white", border: "none", borderRadius: 4, padding: "4px 8px", cursor: "pointer" }}>Xóa</button>
              </div>
            ))}
            <button type="button" onClick={addWorkSchedule} style={{ marginBottom: 20, backgroundColor: "#005566", color: "white", border: "none", borderRadius: 6, padding: "10px 16px", cursor: "pointer" }}>
              Thêm lịch làm việc
            </button>
            <label>Phòng ban:</label>
            <input value={department} onChange={(e) => setDepartment(e.target.value)} />
          </>
        )}

        {role === "user" && (
          <>
            <h3>Thông tin bệnh nhân</h3>
            <label>Tiền sử bệnh:</label>
            <textarea value={medicalHistory} onChange={(e) => setMedicalHistory(e.target.value)} rows={3} />
            <label>Thông tin bảo hiểm y tế:</label>
            <input value={insuranceInfo} onChange={(e) => setInsuranceInfo(e.target.value)} />
          </>
        )}

        <div className="ua-buttons">
          <button type="submit" className="ua-btn ua-btn-save">Lưu thay đổi</button>
          <button type="button" className="ua-btn ua-btn-cancel" onClick={onCancel}>Hủy</button>
        </div>
      </form>
    </div>
  );
}
