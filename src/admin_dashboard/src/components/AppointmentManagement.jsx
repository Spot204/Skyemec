import React, { useState, useEffect } from "react";
import AppointmentList from "./AppointmentList";
import AppointmentDetails from "./AppointmentDetails";
import "../styles/AppointmentManagement.css";

import { getAppointments, deleteAppointmentById } from "../services/AppointmentService";

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    phone: "",
    date: "",
    doctor: "",
    hospital: "",
    status: "",
    page: 1,
    limit: 10,
  });
  const [pagination, setPagination] = useState({
    totalPages: 1,
    total: 0,
  });

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    try {
      const result = await getAppointments(filters);
      setAppointments(result.data);
      setPagination({
        totalPages: result.totalPages,
        total: result.total,
      });
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa lịch khám này?")) return;

    try {
      await deleteAppointmentById(id);
      alert("Xóa lịch khám thành công!");
      fetchData();

      if (selectedAppointment && selectedAppointment._id === id) {
        setSelectedAppointment(null);
      }
    } catch (error) {
      alert("Lỗi khi xóa lịch khám: " + error.message);
    }
  };

  return (
    <div className="AppointmentManagement-container">
      {/* Form tìm kiếm và lọc */}
      <div className="filter-container">
        <input
          type="text"
          name="name"
          placeholder="Tìm theo tên"
          value={filters.name}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Tìm theo số điện thoại"
          value={filters.phone}
          onChange={handleFilterChange}
        />
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="doctor"
          placeholder="Tìm theo bác sĩ"
          value={filters.doctor}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="hospital"
          placeholder="Tìm theo cơ sở khám"
          value={filters.hospital}
          onChange={handleFilterChange}
        />
        <select name="status" value={filters.status} onChange={handleFilterChange}>
          <option value="">Tất cả trạng thái</option>
          <option value="pending">Chưa khám</option>
          <option value="done">Đã khám</option>
          <option value="canceled">Đã hủy</option>
        </select>
      </div>

      {/* Danh sách lịch khám */}
      <AppointmentList
        appointments={appointments}
        onSelect={setSelectedAppointment}
        onDelete={handleDelete}
      />

      {/* Phân trang */}
      <div className="pagination">
        {Array.from({ length: pagination.totalPages }, (_, i) => (
          <button
            key={i + 1}
            disabled={filters.page === i + 1}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Chi tiết lịch khám */}
      {selectedAppointment && (
        <AppointmentDetails
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
        />
      )}
    </div>
  );
};

export default AppointmentManagement;
