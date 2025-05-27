import "../styles/DrSchedule.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const DrSchedule = () => {
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(new Date().getFullYear());

  const handleNext = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const handlePrev = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/schedule?month=${month + 1}&year=${year}`
        );
        setScheduleData(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, [month, year]);

  return (
    <div className="background">
      <div className="container">
        <div style={{ textAlign: "center", padding: "20px" }}>
          <button onClick={handlePrev}>&lt;</button>
          <span className="date">
            {[month]}, {year}
          </span>
          <button onClick={handleNext}>&gt;</button>
        </div>

        <h2>Ngày hẹn khám</h2>
        <div className="scheduled">
          {scheduleData.map((item, index) => (
            <div key={index}>
              {index !== 0 && <div className="line"></div>}
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  gap: "10px",
                }}
              >
                <div
                  className="day"
                  style={{
                    flex: 1,
                    fontWeight: "bold",
                    fontSize: "26px",
                    textAlign: "left",
                  }}
                >
                  {item.day}
                </div>
                <div style={{ flex: 4, textAlign: "left" }}>{item.task}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ marginTop: "50px" }}>Lịch làm việc</h2>
        <div className="worktime">
          {scheduleData.map((item, index) => (
            <div key={index}>
              {index !== 0 && <div className="line"></div>}
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  gap: "10px",
                }}
              >
                <div
                  className="day"
                  style={{
                    flex: 1,
                    fontWeight: "bold",
                    fontSize: "26px",
                    textAlign: "left",
                  }}
                >
                  {item.day}
                </div>
                <div style={{ flex: 4, textAlign: "left" }}>{item.task}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrSchedule;
