import React, { useState } from "react";
import "../styles/D&SManagerment.css";


const initialDoctors = [
  { id: 1, name: "Bác sĩ Nguyễn Văn A", specialty: "Tim mạch" },
  { id: 2, name: "Bác sĩ Trần Thị B", specialty: "Nhi khoa" },
];

// Giả sử bạn có danh sách chuyên khoa này, có thể lấy từ props hoặc API
const specialties = [
  "Tim mạch",
  "Nhi khoa",
  "Da liễu",
  "Ung bướu",
  "Ngoại khoa",
  "Thần kinh",
];

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [editDoctor, setEditDoctor] = useState(null);
  const [formData, setFormData] = useState({ name: "", specialty: specialties[0] });

  const resetForm = () => setFormData({ name: "", specialty: specialties[0] });

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddOrUpdate = () => {
    if (!formData.name.trim() || !formData.specialty.trim()) {
      alert("Vui lòng nhập đầy đủ thông tin bác sĩ.");
      return;
    }
    if (editDoctor) {
      setDoctors((prev) =>
        prev.map((doc) =>
          doc.id === editDoctor.id ? { ...doc, ...formData } : doc
        )
      );
      setEditDoctor(null);
    } else {
      const newDoctor = {
        id: doctors.length + 1,
        ...formData,
      };
      setDoctors((prev) => [...prev, newDoctor]);
    }
    resetForm();
  };

  const handleEdit = (doctor) => {
    setEditDoctor(doctor);
    setFormData({ name: doctor.name, specialty: doctor.specialty });
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa bác sĩ này?")) {
      setDoctors((prev) => prev.filter((doc) => doc.id !== id));
      if (editDoctor && editDoctor.id === id) {
        setEditDoctor(null);
        resetForm();
      }
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: "#005566" }}>
      <h2>Quản lý bác sĩ</h2>

      <div style={{ marginBottom: 20, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <input
          type="text"
          name="name"
          placeholder="Tên bác sĩ"
          value={formData.name}
          onChange={handleInputChange}
          style={{ padding: 6, flexGrow: 1, minWidth: "40%" }}
        />
        <select
          name="specialty"
          value={formData.specialty}
          onChange={handleInputChange}
          style={{ padding: 6, flexGrow: 1, minWidth: "40%" }}
        >
          {specialties.map((sp) => (
            <option key={sp} value={sp}>
              {sp}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddOrUpdate}
          style={{
            backgroundColor: "#005566",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: 6,
            cursor: "pointer",
            minWidth: 100,
          }}
        >
          {editDoctor ? "Cập nhật" : "Thêm mới"}
        </button>
        {editDoctor && (
          <button
            onClick={() => {
              setEditDoctor(null);
              resetForm();
            }}
            style={{
              backgroundColor: "#ccc",
              border: "none",
              padding: "8px 16px",
              borderRadius: 6,
              cursor: "pointer",
              color: "#333",
              minWidth: 80,
            }}
          >
            Hủy
          </button>
        )}
      </div>

      <table
        style={{ width: "100%", borderCollapse: "collapse", boxShadow: "0 2px 5px rgba(0,85,102,0.1)", borderRadius: 8 }}
        border="1"
      >
        <thead style={{ backgroundColor: "#005566", color: "white", fontWeight: 600 }}>
          <tr>
            <th style={{ padding: 10 }}>ID</th>
            <th style={{ padding: 10 }}>Tên bác sĩ</th>
            <th style={{ padding: 10 }}>Chuyên khoa</th>
            <th style={{ padding: 10 }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc) => (
            <tr key={doc.id} style={{ backgroundColor: "#fafafa" }}>
              <td style={{ padding: 10 }}>{doc.id}</td>
              <td style={{ padding: 10 }}>{doc.name}</td>
              <td style={{ padding: 10 }}>{doc.specialty}</td>
              <td style={{ padding: 10 }}>
                <button
                  onClick={() => handleEdit(doc)}
                  style={{
                    backgroundColor: "#0077cc",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: 5,
                    marginRight: 8,
                    cursor: "pointer",
                  }}
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(doc.id)}
                  style={{
                    backgroundColor: "#cc4b37",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: 5,
                    cursor: "pointer",
                  }}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
          {doctors.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: 20 }}>
                Chưa có bác sĩ nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorManagement;
