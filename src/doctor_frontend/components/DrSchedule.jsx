import "../styles/DrSchedule.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const DrSchedule = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const handleNext = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const handlePrev = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/schedule?month=${month}&year=${year}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Schedule data:", data);
        setScheduleData(data);
      })
      .catch((error) => console.error("Error fetching schedule:", error));
  }, [month, year]);

  const grouped = scheduleData.reduce((acc, item) => {
    acc[item.day] = acc[item.day] || [];
    acc[item.day].push(item);
    return acc;
  }, {});

  return (
    <div className="background">
      <div className="container">
        <div style={{ textAlign: "center", padding: "20px" }}>
          <button class="change-month" onClick={handlePrev}>
            &lt;
          </button>
          <span className="date">
            Tháng {month}, {year}
          </span>
          <button class="change-month" onClick={handleNext}>
            &gt;
          </button>
        </div>
        <h25>Lịch trình làm việc</h25>
        <div className="scheduled">
          {Object.keys(grouped)
            .sort((a, b) => a - b)
            .map((day) => (
              <div key={day}>
                <div
                  className="day"
                  style={{ fontWeight: "bold", fontSize: "24px" }}
                >
                  Ngày {day}
                </div>
                {grouped[day].map((item, idx) => (
                  <div key={idx} style={{ margin: "15px 20px" }}>
                    {item.time} - {item.task}
                  </div>
                ))}
                <div className="line"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DrSchedule;
