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
  const [showAdd, setShowAdd] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    day: "",
    month: "",
    year: "",
    time: "",
    task: "",
  });
  const doctorId = localStorage.getItem("doctorId");

  // Lấy dữ liệu lịch trình
  useEffect(() => {
    if (!doctorId) return;
    fetch(`http://localhost:5050/schedule/${doctorId}/schedule`)
      .then((res) => {
        if (!res.ok) throw new Error("Không lấy được lịch trình");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setScheduleData(data);
        else setScheduleData([]);
      })
      .catch((error) => {
        setScheduleData([]);
        console.error("Error fetching schedule:", error);
      });
  }, [month, year, doctorId]);

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

  const filteredSchedule = scheduleData.filter(
    (item) => Number(item.month) === month && Number(item.year) === year
  );

  // Gom lịch theo ngày
  const grouped = filteredSchedule.reduce((acc, item) => {
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

  // Thêm lịch trình mới
  const handleAddSchedule = async (e) => {
    e.preventDefault();
    if (
      !newSchedule.day ||
      !newSchedule.month ||
      !newSchedule.year ||
      !newSchedule.time ||
      !newSchedule.task
    ) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    try {
      await fetch(`http://localhost:5050/schedule/${doctorId}/schedule`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSchedule),
      });
      setShowAdd(false);
      setNewSchedule({
        day: "",
        month: "",
        year: "",
        time: "",
        task: "",
      });
      // Reload schedule
      fetch(`http://localhost:5050/schedule/${doctorId}/schedule`)
        .then((res) => res.json())
        .then(setScheduleData);
    } catch (err) {
      alert("Thêm lịch trình thất bại!");
    }
  };

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

        <div className="add-schedule-div">
          <div className="add-schedule-div-header">
            <h3>Lịch trình làm việc</h3>
            <button
              className="add-schedule-btn"
              onClick={() => setShowAdd(true)}
              title="Thêm lịch trình"
            >
              +
            </button>
          </div>
          {showAdd && (
            <form onSubmit={handleAddSchedule}>
              <div className="form-info">
                <label>
                  Ngày:&nbsp;
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={newSchedule.day}
                    onChange={(e) =>
                      setNewSchedule({ ...newSchedule, day: e.target.value })
                    }
                    required
                  />
                </label>
              </div>
              <div className="form-info">
                <label>
                  Tháng:&nbsp;
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={newSchedule.month}
                    onChange={(e) =>
                      setNewSchedule({ ...newSchedule, month: e.target.value })
                    }
                    required
                  />
                </label>
              </div>
              <div className="form-info">
                <label>
                  Năm:&nbsp;
                  <input
                    type="number"
                    min="2000"
                    max="2100"
                    value={newSchedule.year}
                    onChange={(e) =>
                      setNewSchedule({ ...newSchedule, year: e.target.value })
                    }
                    required
                  />
                </label>
              </div>
              <div className="form-info">
                <label>
                  Giờ:&nbsp;
                  <input
                    type="time"
                    value={newSchedule.time}
                    onChange={(e) =>
                      setNewSchedule({ ...newSchedule, time: e.target.value })
                    }
                    required
                  />
                </label>
              </div>
              <div className="form-info-work">
                <label>
                  Công việc:&nbsp;
                  <input
                    type="text"
                    value={newSchedule.task}
                    onChange={(e) =>
                      setNewSchedule({ ...newSchedule, task: e.target.value })
                    }
                    required
                  />
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "30px",
                }}
              >
                <button type="submit">Lưu</button>
                <button type="button" onClick={() => setShowAdd(false)}>
                  Hủy
                </button>
              </div>
            </form>
          )}
        </div>

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
