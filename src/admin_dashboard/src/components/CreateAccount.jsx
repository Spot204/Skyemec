import React, { useState } from "react";
import "../styles/CreateAccount.css";


const roles = ["admin", "doctor", "user"];
const genders = ["Male", "Female", "Other"];

export default function CreateAccount({ onSave, onCancel }) {
  // Thông tin chung
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(roles[0]);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState(genders[0]);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");

  // Thông tin bác sĩ (nếu role=doctor)
  const [specialty, setSpecialty] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [workSchedule, setWorkSchedule] = useState([]); // mảng lịch làm việc
  const [department, setDepartment] = useState("");

  // Thông tin user (nếu role=user)
  const [medicalHistory, setMedicalHistory] = useState("");
  const [insuranceInfo, setInsuranceInfo] = useState("");

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const hours = [
    "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00",
  ];

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

  const handleSubmit = (e) => {
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
    } else if (role === "user") {
      newUser.userInfo = {
        medicalHistory: medicalHistory.trim(),
        insuranceInfo: insuranceInfo.trim(),
      };
    }

    onSave(newUser);
  };

  return (
    <div className="create-account">
      <h2>Tạo mới tài khoản</h2>
      <form onSubmit={handleSubmit} className="ca-form">
        {/* Thông tin chung */}
        <label>Username:</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nhập username hoặc email"
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nhập mật khẩu"
          required
        />

        <label>Vai trò:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </option>
          ))}
        </select>

        <label>Họ và tên:</label>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Nhập họ và tên"
          required
        />

        <label>Số điện thoại:</label>
        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Nhập số điện thoại"
        />

        <label>Giới tính:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          {genders.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <label>Ngày sinh:</label>
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />

        <label>Địa chỉ:</label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Nhập địa chỉ"
        />

        {/* Thông tin đặc thù theo role */}
        {role === "doctor" && (
          <>
            <h3>Thông tin bác sĩ</h3>
            <label>Chuyên khoa:</label>
            <input
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              placeholder="Nhập chuyên khoa"
            />
            <label>Mã chứng chỉ hành nghề:</label>
            <input
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              placeholder="Nhập mã chứng chỉ"
            />
            <label>Lịch làm việc:</label>
            {workSchedule.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <select
                  value={item.day}
                  onChange={(e) => updateWorkScheduleItem(i, "day", e.target.value)}
                  required
                >
                  <option value="">Chọn ngày</option>
                  {daysOfWeek.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <select
                  value={item.start}
                  onChange={(e) => updateWorkScheduleItem(i, "start", e.target.value)}
                  required
                >
                  <option value="">Bắt đầu</option>
                  {hours.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
                <select
                  value={item.end}
                  onChange={(e) => updateWorkScheduleItem(i, "end", e.target.value)}
                  required
                >
                  <option value="">Kết thúc</option>
                  {hours.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  style={{
                    backgroundColor: "#cc4444",
                    color: "white",
                    borderRadius: 4,
                    border: "none",
                    cursor: "pointer",
                    padding: "4px 8px",
                  }}
                  onClick={() => removeWorkScheduleItem(i)}
                >
                  Xóa
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addWorkSchedule}
              style={{
                marginBottom: 20,
                backgroundColor: "#005566",
                color: "white",
                border: "none",
                borderRadius: 6,
                padding: "10px 16px",
                cursor: "pointer",
              }}
            >
              Thêm lịch làm việc
            </button>
            <label>Phòng ban:</label>
            <input
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Nhập phòng ban"
            />
          </>
        )}

        {role === "user" && (
          <>
            <h3>Thông tin bệnh nhân</h3>
            <label>Tiền sử bệnh:</label>
            <textarea
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
              rows={3}
              placeholder="Nhập tiền sử bệnh"
            />
            <label>Thông tin bảo hiểm y tế:</label>
            <input
              value={insuranceInfo}
              onChange={(e) => setInsuranceInfo(e.target.value)}
              placeholder="Nhập thông tin bảo hiểm"
            />
          </>
        )}

        <div className="ca-buttons">
          <button type="submit" className="ca-btn ca-btn-save">
            Tạo mới
          </button>
          <button
            type="button"
            className="ca-btn ca-btn-cancel"
            onClick={onCancel}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}