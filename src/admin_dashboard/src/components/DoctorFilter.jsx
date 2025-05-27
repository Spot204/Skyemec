import React, { useState } from "react";
import "../styles/DoctorFilter.css";


const DoctorFilter = ({ doctors, specialties, onFilter }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [searchName, setSearchName] = useState("");

  const handleFilter = () => {
    let filtered = doctors;

    if (selectedSpecialty) {
      filtered = filtered.filter(
        (doc) => doc.specialty === selectedSpecialty
      );
    }
    if (searchName.trim()) {
      filtered = filtered.filter((doc) =>
        doc.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    onFilter(filtered);
  };

  return (
    <div
      style={{
        marginBottom: 20,
        display: "flex",
        gap: 15,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#005566",
        alignItems: "center",
      }}
    >
      <input
        type="text"
        placeholder="Tìm theo tên bác sĩ"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        style={{
          padding: 8,
          borderRadius: 6,
          border: "1px solid #ccc",
          flexGrow: 1,
          fontSize: 16,
        }}
      />

      <select
        value={selectedSpecialty}
        onChange={(e) => setSelectedSpecialty(e.target.value)}
        style={{
          padding: 8,
          borderRadius: 6,
          border: "1px solid #ccc",
          fontSize: 16,
          minWidth: 200,
          cursor: "pointer",
        }}
      >
        <option value="">Chọn chuyên khoa</option>
        {specialties.map((sp) => (
          <option key={sp.id} value={sp.name}>
            {sp.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleFilter}
        style={{
          backgroundColor: "#005566",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: 6,
          cursor: "pointer",
          fontWeight: 600,
          fontSize: 16,
        }}
      >
        Lọc
      </button>
    </div>
  );
};

export default DoctorFilter;
