import React from "react";
import "../styles/DepartmentList.css";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.webp";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.webp";
import image7 from "../assets/image7.jpg";
import image8 from "../assets/image8.jpg";
import image9 from "../assets/image9.jpg";
import image10 from "../assets/image10.png";
import image11 from "../assets/image11.jpg";
import image12 from "../assets/image12.jpg";
import image13 from "../assets/image13.jpg";
import image14 from "../assets/image14.png";
import image15 from "../assets/image15.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const departments = [
  { name: "Cấp cứu", 
    image: image1 },
  { name: "Trung tâm Tim mạch", 
    image: image2 },
  {
    name: "Chấn thương chỉnh hình - Y học thể thao",
    image: image3,
  },
  { name: "Trung tâm Nhi", 
    image: image4 },
  { name: "Trung tâm Ung bướu", 
    image: image5 },
  { name: "Tiêu hóa - Gan mật", 
    image: image6 },
  {
    name: "Trung tâm Mắt Vinmec-Alina",
    image: image7,
  },
  {
    name: "Trung tâm Thẩm mỹ Vinmec-View",
    image: image8,
  },
  {
    name: "Miễn dịch - Dị ứng",
    image: image9,
  },
  {
    name: "Trung tâm Công nghệ cao",
    image: image10,
  },
  {
    name: "Trung tâm sức khỏe phụ nữ",
    image: image11,
  },
  {
    name: "Sức khỏe tổng quát",
    image: image12,
  },
  {
    name: "Viện nghiên cứu Tế bào gốc và Công nghệ Gen",
    image: image13,
  },
  {
    name: "Trung tâm Vacxin",
    image: image14,
  },
  {
    name: "Trung tâm Y Học Cổ Truyền Skyemec - Sao Phương Đông",
    image: image15,
  },
];

const DepartmentList = () => {
  return (
    <div className="Dl-body-middle">
      <div className="Bodysd-navigation" id="Dl-middle">
        <span className="Bodysd-home">
          Trang chủ <FontAwesomeIcon icon={faAngleRight} />
        </span>
        <span className="Bodysd-search-doctor">Chuyên khoa</span>
      </div>
      <div className="Dl-body">
        <div className="Dl-grid-container">
          {departments.map((dept, index) => (
            <div key={index} className="Dl-department-card">
              <img src={dept.image} alt={dept.name} />
              <h3>{dept.name}</h3>
              <a href="#">More</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentList;
