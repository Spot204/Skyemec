import "../styles/DrSchedule.css";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const DrSchedule = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [scheduleData, setScheduleData] = useState([]);
  const [expandedDays, setExpandedDays] = useState([]);
  const dayRefs = useRef({});

  // Lấy dữ liệu lịch trình
  useEffect(() => {
    fetch(`http://localhost:5050/schedule?month=${month}&year=${year}`)
      .then((res) => res.json())
      .then(setScheduleData)
      .catch((error) => console.error("Error fetching schedule:", error));
  }, [month, year]);

  // Mở rộng mặc định và scroll đến ngày hiện tại
  useEffect(() => {
    const days = Array.from(
      new Set(scheduleData.map((item) => Number(item.day)))
    );
    setExpandedDays(days);
    setTimeout(() => {
      const today = new Date();
      if (
        today.getMonth() + 1 === month &&
        today.getFullYear() === year &&
        dayRefs.current[today.getDate()]
      ) {
        dayRefs.current[today.getDate()].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 200);
  }, [scheduleData, month, year]);

  // Gom lịch theo ngày
  const grouped = scheduleData.reduce((acc, item) => {
    const dayNum = Number(item.day);
    (acc[item.day] = acc[item.day] || []).push(item);
    return acc;
  }, {});

  // Toggle thu gọn/mở rộng ngày
  const toggleDay = (day) => {
    setExpandedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  // Chuyển tháng
  const handleNext = () =>
    setMonth(month === 12 ? 1 : month + 1) ||
    (month === 12 && setYear(year + 1));
  const handlePrev = () =>
    setMonth(month === 1 ? 12 : month - 1) ||
    (month === 1 && setYear(year - 1));

  return (
    <div className="background">
      <span
        onClick={() => navigate("/doctor/drhome")}
        className="drsche-navigator"
      >
        Trang chủ <FontAwesomeIcon icon={faAngleRight} /> {"  "}
      </span>
      <span className="drsche-navigator-2">
        {"  "}
        Lịch trình làm việc
      </span>
      <div className="drsche-container">
        <div style={{ textAlign: "center", padding: "20px" }}>
          <button className="change-month" onClick={handlePrev}>
            &lt;
          </button>
          <span className="date">
            Tháng {month}, {year}
          </span>
          <button className="change-month" onClick={handleNext}>
            &gt;
          </button>
        </div>
        <h3>Lịch trình làm việc</h3>
        <div className="scheduled">
          {Object.keys(grouped)
            .map(Number)
            .sort((a, b) => a - b)
            .map((day) => (
              <div key={day} ref={(el) => (dayRefs.current[day] = el)}>
                <div
                  className="day"
                  style={{
                    fontWeight: "bold",
                    fontSize: "24px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={() => toggleDay(day)}
                >
                  <FontAwesomeIcon
                    icon={
                      expandedDays.includes(day)
                        ? faChevronDown
                        : faChevronRight
                    }
                    style={{ marginRight: "10px" }}
                  />
                  Ngày {day}
                </div>
                {expandedDays.includes(day) &&
                  grouped[day]
                    .slice()
                    .sort((a, b) => {
                      const toMinutes = (t) => {
                        const [h, m] = t.split(":").map(Number);
                        return h * 60 + m;
                      };
                      return toMinutes(a.time) - toMinutes(b.time);
                    })
                    .map((item, idx) => (
                      <div key={idx} style={{ margin: "15px 20px" }}>
                        {item.time} - {item.task}
                      </div>
                    ))}
                <div className="drsche-line"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DrSchedule;
