import React, { useState, useEffect } from "react";
import "../styles/RevenueStats.css";

import { getRevenueStats } from "../services/RevenueService"; // Bạn tạo service gọi API

const RevenueStats = () => {
  const [mode, setMode] = useState("month"); // 'month' hoặc 'week'
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [mode]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getRevenueStats({ mode });
      setData(result);
    } catch (err) {
      setError(err.message || "Lỗi khi lấy dữ liệu thống kê doanh thu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
      <h2>Thống kê doanh thu theo {mode === "month" ? "tháng" : "tuần"}</h2>

      <div style={{ marginBottom: 20 }}>
        <label>
          Chọn chế độ:{" "}
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="month">Tháng</option>
            <option value="week">Tuần</option>
          </select>
        </label>
      </div>

      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && data.length === 0 && <p>Không có dữ liệu thống kê</p>}

      {!loading && !error && data.length > 0 && (
        <table
          border={1}
          cellPadding={8}
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>Bệnh viện</th>
              <th>Năm</th>
              {mode === "month" ? <th>Tháng</th> : <th>Tuần</th>}
              <th>Doanh thu (VNĐ)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td>{item.hospital || "Không rõ"}</td>
                <td>{item.year}</td>
                {mode === "month" ? <td>{item.month}</td> : <td>{item.week}</td>}
                <td>{item.totalRevenue?.toLocaleString() || "0"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RevenueStats;
