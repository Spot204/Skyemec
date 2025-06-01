import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "../styles/Department.css";
import Department_body from "./Department_body";
import List_doctor from "./List_doctor";
import { useNavigate } from 'react-router-dom';

const Department = ({ text }) => {
  const navigate = useNavigate();
  const [contents, setContents] = useState({}); // Khởi tạo object rỗng
  const [selectedTab, setSelectedTab] = useState("general");

  useEffect(() => {
    fetch("/dist/data/data.json") // Đảm bảo file JSON nằm trong thư mục public
      .then((response) => response.json())
      .then((data) => setContents(data))
      .catch((error) => console.error("Lỗi tải dữ liệu", error));
  }, []);

  // Kiểm tra dữ liệu trước khi render
  if (!contents[text]) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <div className="Department-Container">
    <div className="Department-body">
      <div className="Bodysd-navigation" id="Department-middle">
        <span className="Bodysd-home"onClick={()=> navigate('/user/home')}>
          Trang chủ <FontAwesomeIcon icon={faAngleRight} />
        </span>
        <span id="Department-text" onClick={()=> navigate('/user/khoa')}>
          Chuyên khoa <FontAwesomeIcon icon={faAngleRight} />
        </span>
        <span>{contents[text].name}</span>
      </div>

      <div className="Department-body-middle">
        <h2 className="Department-body-head">
          {contents[text].sections[selectedTab].title}
        </h2>

        {/* Danh sách cố định */}
        <ul className="Department-list">
          <li
            className={`Department-item ${
              selectedTab === "general" ? "active" : ""
            }`}
            onClick={() => setSelectedTab("general")}
          >
            Tổng quát
          </li>
          <li
            className={`Department-item ${
              selectedTab === "service" ? "active" : ""
            }`}
            onClick={() => setSelectedTab("service")}
          >
            Dịch vụ
          </li>
          <li
            className={`Department-item ${
              selectedTab === "technology" ? "active" : ""
            }`}
            onClick={() => setSelectedTab("technology")}
          >
            Kỹ thuật - Công nghệ
          </li>
          <li
            className={`Department-item ${
              selectedTab === "list_doctor" ? "active" : ""
            }`}
            onClick={() => setSelectedTab("list_doctor")}
          >
            Đội ngũ bác sĩ
          </li>
        </ul>

        <div className="Department-middle-text">
          {contents[text] && contents[text].information && (
            <div>{contents[text].information}</div>
          )}
        </div>
      </div>
      {selectedTab === "list_doctor" ? (
        <List_doctor />
      ) : (
        <Department_body
          headers={contents[text].sections[selectedTab].headers}
          notes={contents[text].sections[selectedTab].notes}
          images={contents[text].sections[selectedTab].images}
        />
      )}
    </div>
    </div>
  );
};

export default Department;
