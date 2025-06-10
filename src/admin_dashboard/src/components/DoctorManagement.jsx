import React, { useState, useEffect } from "react";
import { fetchDoctors } from "../services/DoctorListServices"; // Đảm bảo bạn đã import đúng service

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);  // Danh sách các chuyên khoa
  const [workplaces, setWorkplaces] = useState([]);    // Danh sách các bệnh viện
  const [searchTerm, setSearchTerm] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [workplace, setWorkplace] = useState("");        // Giá trị bệnh viện
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Load danh sách bác sĩ, chuyên khoa và bệnh viện mỗi khi page hoặc filter thay đổi
  useEffect(() => {
    const loadDoctors = async () => {
      setLoading(true);
      try {
        const data = await fetchDoctors({
          page,
          limit,
          name: searchTerm,
          specialty,
          workplace,  // Lọc theo bệnh viện
        });
        setDoctors(data.data || []);
        setTotalPages(data.totalPages || 1);
        setSpecialties(data.specialties || []);  // Lưu danh sách chuyên khoa
        setWorkplaces(data.workplaces || []);    // Lưu danh sách bệnh viện
      } catch (error) {
        alert("Lỗi khi tải danh sách bác sĩ");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, [page, limit, searchTerm, specialty, workplace]);

  // Xử lý sự kiện tìm kiếm
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);  // Cập nhật giá trị tìm kiếm
    setPage(1);  // Đặt lại trang về 1 khi tìm kiếm
  };

  // Chuyển trang trước
  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  // Chuyển trang sau
  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  // Xử lý khi chọn chuyên khoa
  const handleSpecialtyChange = (e) => {
    setSpecialty(e.target.value);  // Cập nhật giá trị chuyên khoa khi người dùng chọn
    setPage(1);  // Đặt lại trang về 1 khi thay đổi chuyên khoa
  };

  // Xử lý khi chọn bệnh viện
  const handleWorkplaceChange = (e) => {
    setWorkplace(e.target.value);  // Cập nhật giá trị bệnh viện khi người dùng chọn
    setPage(1);  // Đặt lại trang về 1 khi thay đổi bệnh viện
  };

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 800,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#005566",
        margin: "0 auto",  // Canh giữa màn hình
      }}
    >
      <h2 style={{ textAlign: "center" }}>Danh sách bác sĩ</h2>

      <div
        style={{
          marginBottom: 20,
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",  // Canh giữa form
        }}
      >
        <input
          type="text"
          placeholder="Tìm kiếm theo tên bác sĩ..."
          value={searchTerm}  // Liên kết giá trị input với trạng thái searchTerm
          onChange={handleSearch}  // Cập nhật giá trị tìm kiếm khi nhập
          style={{ padding: 6, flexGrow: 1, minWidth: "40%" }}
          disabled={loading}
        />

        <select
          value={specialty}
          onChange={handleSpecialtyChange}  // Xử lý sự kiện thay đổi chuyên khoa
          disabled={loading}
          style={{ padding: 6, minWidth: "150px" }}
        >
          <option value="">-- Chọn chuyên khoa --</option>
          {specialties.map((specialtyItem, index) => (
            <option key={index} value={specialtyItem}>
              {specialtyItem}
            </option>
          ))}
        </select>

        <select
          value={workplace}
          onChange={handleWorkplaceChange}  // Xử lý sự kiện thay đổi bệnh viện
          disabled={loading}
          style={{ padding: 6, minWidth: "150px" }}
        >
          <option value="">-- Chọn bệnh viện --</option>
          {workplaces.map((workplaceItem, index) => (
            <option key={index} value={workplaceItem}>
              {workplaceItem}
            </option>
          ))}
        </select>

        <button
          id="ad-btn"
          onClick={() => setPage(1)}  // Đặt lại trang về 1 khi tìm kiếm
          disabled={loading}
          style={{ padding: "6px 16px" }}
        >
          Tìm kiếm
        </button>
      </div>

      {loading ? (
        <p>Đang tải danh sách bác sĩ...</p>
      ) : (
        <>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              boxShadow: "0 2px 5px rgba(0,85,102,0.1)",
              borderRadius: 8,
            }}
            border="1"
          >
            <thead>
              <tr>
                <th style={{ padding: 10 }}>ID</th>
                <th style={{ padding: 10 }}>Tên bác sĩ</th>
                <th style={{ padding: 10 }}>Chuyên khoa</th>
                <th style={{ padding: 10 }}>Học vị</th>
                <th style={{ padding: 10 }}>Bệnh viện</th>
              </tr>
            </thead>
            <tbody>
              {doctors.length > 0 ? (
                doctors.map((doc) => (
                  <tr key={doc._id} style={{ backgroundColor: "#fafafa" }}>
                    <td style={{ padding: 10 }}>{doc._id}</td>
                    <td style={{ padding: 10 }}>{doc.name || "Chưa có tên"}</td>
                    <td style={{ padding: 10 }}>
                      {doc.role || "Chưa cập nhật"}
                    </td>
                    <td style={{ padding: 10 }}>
                      {doc.degree || "Chưa cập nhật"}
                    </td>
                    <td style={{ padding: 10 }}>
                      {doc.workplace || "Chưa cập nhật"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: 20 }}>
                    Không tìm thấy bác sĩ nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <button onClick={handlePrevPage} disabled={page <= 1 || loading}>
              Trang trước
            </button>
            <span>
              Trang {page} / {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page >= totalPages || loading}
            >
              Trang sau
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DoctorManagement;
