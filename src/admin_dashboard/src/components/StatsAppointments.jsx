import React, { useState, useEffect } from "react";
import { getAppointmentStatsByHospital } from "../services/StatsService";
import "../styles/StatsAppointments.css";

const StatsAppointments = () => {
  const [mode, setMode] = useState("month");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, [mode]);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const stats = await getAppointmentStatsByHospital({ mode });
      setData(stats);
    } catch (err) {
      setError(err.message || "Lỗi khi lấy dữ liệu thống kê");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stats-container">
      <h2>Thống kê số lượng lịch khám theo bệnh viện</h2>

      <div className="stats-controls">
        <label>
          Chọn chế độ:
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="week">Theo tuần</option>
            <option value="month">Theo tháng</option>
          </select>
        </label>
      </div>

      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && data.length === 0 && (
        <p>Không có dữ liệu thống kê</p>
      )}

      {!loading && !error && data.length > 0 && (
        <table className="stats-table">
          <thead>
            <tr>
              <th>Bệnh viện</th>
              <th>Năm</th>
              {mode === "month" ? <th>Tháng</th> : <th>Tuần</th>}
              <th>Số lượt khám</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td>{item.hospital}</td>
                <td>{item.year}</td>
                <td>{mode === "month" ? item.month : item.week}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StatsAppointments;
