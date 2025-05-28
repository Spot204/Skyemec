import "../styles/DrSchedule.css";
import React, { useState, useEffect } from "react";

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

  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    // Thay đổi sau: sử dụng MongoDB để tạo db gồm day & task, sau đó cần kết hợp bổ sung chọn tháng & năm
    const fetchData = async () => {
      const response = [
        {
          day: "20",
          task: "Họp nhóm, gửi báo cáo, làm việc với khách hàng",
        },
        {
          day: "21",
          task: "Code tính năng mới, kiểm tra hệ thống, viết tài liệu",
        },
        {
          day: "22",
          task: "Thảo luận dự án, tổng kết tuần, lập kế hoạch mới",
        },
      ];
      setScheduleData(response);
    };

    fetchData();
  }, []);

  return (
    <div className="background">
      <div className="container">
        <div style={{ textAlign: "center", padding: "20px" }}>
          <button onClick={handlePrev}>&lt;</button>
          <span className="date">
            {months[month]}, {year}
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
