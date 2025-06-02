import React, { useState, useEffect } from "react";
import "../styles/D&SManagerment.css";
import { fetchDoctors } from "../services/DoctorListServices";

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Load danh sách bác sĩ từ API
  const loadDoctors = async () => {
    setLoading(true);
    try {
      // Nếu muốn lọc chuyên khoa thì truyền param fetchDoctors("Tim mạch")
      const data = await fetchDoctors();
      setDoctors(data);
    } catch (error) {
      alert("Lỗi khi tải danh sách bác sĩ");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  // Lọc danh sách bác sĩ theo tên (không phân biệt hoa thường)
  const filteredDoctors = doctors.filter((doc) =>
    (doc.fullName || "")
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase())
  );

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 800,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#005566",
      }}
    >
      <h2>Danh sách bác sĩ</h2>

      <div
        style={{
          marginBottom: 20,
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Tìm kiếm theo tên bác sĩ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: 6, flexGrow: 1, minWidth: "40%" }}
          disabled={loading}
        />
      </div>

      {loading ? (
        <p>Đang tải danh sách bác sĩ...</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            boxShadow: "0 2px 5px rgba(0,85,102,0.1)",
            borderRadius: 8,
          }}
          border="1"
        >
          <thead
            style={{ backgroundColor: "#005566", color: "white", fontWeight: 600 }}
          >
            <tr>
              <th style={{ padding: 10 }}>ID</th>
              <th style={{ padding: 10 }}>Tên bác sĩ</th>
              <th style={{ padding: 10 }}>Chuyên khoa</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doc) => (
                <tr key={doc._id} style={{ backgroundColor: "#fafafa" }}>
                  <td style={{ padding: 10 }}>{doc._id}</td>
                  <td style={{ padding: 10 }}>{doc.fullName || "Chưa có tên"}</td>
                  <td style={{ padding: 10 }}>
                    {doc.doctorInfo?.specialty || "Chưa cập nhật"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center", padding: 20 }}>
                  Không tìm thấy bác sĩ nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DoctorManagement;
