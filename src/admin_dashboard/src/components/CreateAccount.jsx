import React, { useState } from "react";
import "../styles/CreateAccount.css";
import { createUser } from "../services/CreateService";

const roles = ["admin", "doctor"];
const genders = ["Male", "Female", "Other"];

export default function CreateAccount({ onSave, onCancel }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

    if (!username.trim() || !password.trim() || !fullName.trim()) {
      alert("Vui lòng nhập username, mật khẩu và họ tên đầy đủ");
      return;
    }

    const newUser = {
      username: username.trim(),
      password: password.trim(),
      role,
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      gender,
      dateOfBirth,
      address: address.trim(),
    };

    if (role === "doctor") {
      newUser.doctorInfo = {
        specialty: specialty.trim(),
        licenseNumber: licenseNumber.trim(),
        workSchedule,
        department: department.trim(),
      };
    }

    try {
      const created = await createUser(newUser);
      alert("Tạo tài khoản thành công");
      onSave(created);
    } catch (error) {
      alert("Lỗi: " + error.message);
      console.error(error);
    }
  };

  return (
    <div className="create-account">
      <h2>Tạo mới tài khoản</h2>
      <form onSubmit={handleSubmit} className="ca-form">
        <label>Username:</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} required />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

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

            <label>Mã chứng chỉ:</label>
            <input value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} />

            <label>Lịch làm việc:</label>
            {workSchedule.map((item, index) => (
              <div key={index}>
                <select value={item.day} onChange={(e) => updateWorkScheduleItem(index, "day", e.target.value)}>
                  <option value="">Ngày</option>
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <select value={item.start} onChange={(e) => updateWorkScheduleItem(index, "start", e.target.value)}>
                  <option value="">Bắt đầu</option>
                  {["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"].map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
                <select value={item.end} onChange={(e) => updateWorkScheduleItem(index, "end", e.target.value)}>
                  <option value="">Kết thúc</option>
                  {["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"].map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
                <button type="button" onClick={() => removeWorkScheduleItem(index)}>❌</button>
              </div>
            ))}
            <button type="button" onClick={addWorkSchedule}>➕ Thêm lịch</button>

            <label>Phòng ban:</label>
            <input value={department} onChange={(e) => setDepartment(e.target.value)} />
          </>
        )}

        <div className="ca-buttons">
          <button type="submit" className="ca-btn ca-btn-save">Tạo mới</button>
          <button type="button" className="ca-btn ca-btn-cancel" onClick={onCancel}>Hủy</button>
        </div>
      </form>
    </div>
  );
}
