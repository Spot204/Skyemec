import React, { useState, useEffect } from "react";
import { getAppointmentStatsByHospital } from "../services/StatsService";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "../styles/StatsAppointments.css";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatsAppointments = () => {
  const [hospital, setHospital] = useState(""); // State for hospital filter
  const [startDate, setStartDate] = useState(""); // State for start date
  const [endDate, setEndDate] = useState(""); // State for end date
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Danh sách các bệnh viện có sẵn
  const hospitals = [
    "Skyemec Hà Đông",
    "Skyemec Thanh Xuân",
    "Skyemec Cầu Giấy",
    "Skyemec Tuyên Quang",
    "Skyemec Bắc Ninh"
  ];

  useEffect(() => {
    fetchStats();
  }, [hospital, startDate, endDate]);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const stats = await getAppointmentStatsByHospital({ hospital, startDate, endDate });
      if (stats.length === 0) {
        setError("Không có dữ liệu thống kê");
      } else {
        setData(stats);
      }
    } catch (err) {
      setError(err.message || "Lỗi khi lấy dữ liệu thống kê");
    } finally {
      setLoading(false);
    }
  };

  // Prepare chart data
  const chartData = {
    labels: data.map(item => item._id),  // Ngày
    datasets: [
      {
        label: "Số lượt khám",
        data: data.map(item => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="stats-container">
      <h2>Thống kê số lượng lịch khám theo bệnh viện</h2>

      <div className="stats-controls">
        <label className="stats-mode-label">
          Chọn bệnh viện:
          <select
            value={hospital}
            onChange={(e) => setHospital(e.target.value)}
          >
            <option value="">Tất cả bệnh viện</option>
            {hospitals.map((hospitalName, index) => (
              <option key={index} value={hospitalName}>
                {hospitalName}
              </option>
            ))}
          </select>
        </label>

        <label className="stats-mode-label">
          Chọn ngày bắt đầu:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>

        <label className="stats-mode-label">
          Chọn ngày kết thúc:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>

      {loading && <p className="loading">Đang tải dữ liệu...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && data.length === 0 && (
        <p>Không có dữ liệu thống kê</p>
      )}

      {!loading && !error && data.length > 0 && (
        <>
          {/* Biểu đồ */}
          <div className="chart-container">
            <Bar data={chartData} options={{ responsive: true }} />
          </div>

          {/* Bảng thống kê */}
          <table className="stats-table">
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Số lượt khám</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx}>
                  <td>{item._id}</td>
                  <td>{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default StatsAppointments;
