import React, { useState } from "react";
import "../styles/D&SManagerment.css";

const initialSpecialties = [
  { id: 1, name: "Tim mạch" },
  { id: 2, name: "Nhi khoa" },
];

const SpecialtyManagement = () => {
  const [specialties, setSpecialties] = useState(initialSpecialties);
  const [editSpecialty, setEditSpecialty] = useState(null);
  const [name, setName] = useState("");

  const resetForm = () => {
    setName("");
    setEditSpecialty(null);
  };

  const handleAddOrUpdate = () => {
    if (!name.trim()) {
      alert("Vui lòng nhập tên chuyên khoa.");
      return;
    }
    if (editSpecialty) {
      setSpecialties((prev) =>
        prev.map((sp) => (sp.id === editSpecialty.id ? { ...sp, name } : sp))
      );
    } else {
      const newSpecialty = { id: specialties.length + 1, name };
      setSpecialties((prev) => [...prev, newSpecialty]);
    }
    resetForm();
  };

  const handleEdit = (sp) => {
    setEditSpecialty(sp);
    setName(sp.name);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa chuyên khoa này?")) {
      setSpecialties((prev) => prev.filter((sp) => sp.id !== id));
      if (editSpecialty && editSpecialty.id === id) {
        resetForm();
      }
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: "#005566" }}>
      <h2>Quản lý chuyên khoa</h2>
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Tên chuyên khoa"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: 6, width: "70%", marginRight: 10 }}
        />
        <button
          onClick={handleAddOrUpdate}
          style={{
            backgroundColor: "#005566",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          {editSpecialty ? "Cập nhật" : "Thêm mới"}
        </button>
        {editSpecialty && (
          <button
            onClick={resetForm}
            style={{
              marginLeft: 10,
              backgroundColor: "#ccc",
              border: "none",
              padding: "8px 16px",
              borderRadius: 6,
              cursor: "pointer",
              color: "#333",
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
            <th style={{ padding: 10 }}>Tên chuyên khoa</th>
            <th style={{ padding: 10 }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {specialties.map((sp) => (
            <tr key={sp.id} style={{ backgroundColor: "#fafafa" }}>
              <td style={{ padding: 10 }}>{sp.id}</td>
              <td style={{ padding: 10 }}>{sp.name}</td>
              <td style={{ padding: 10 }}>
                <button
                  onClick={() => handleEdit(sp)}
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
                  onClick={() => handleDelete(sp.id)}
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
          {specialties.length === 0 && (
            <tr>
              <td colSpan="3" style={{ textAlign: "center", padding: 20 }}>
                Chưa có chuyên khoa nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SpecialtyManagement;
