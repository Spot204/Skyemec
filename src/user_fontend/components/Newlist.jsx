import React, { use, useEffect, useState } from "react";
import "../styles/DepartmentList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getNewlist } from "../services/Newlist";


const Newlist = () => {
  const navigate = useNavigate();
  const [newList, setNewList] = useState([]);
  useEffect(() => {
    getNewlist()
      .then((res) => {
        setNewList(res.data);
      })
      .catch((err) => {
        setNewList([]);
        console.error("lỗi danh sách tin tức:", err);
      });
  }, []);
  return (
    <div className="Dl-body-middle">
      <div className="Bodysd-navigation" id="Dl-middle">
        <span className="Bodysd-home" onClick={() => navigate("/user/home")}>
          Trang chủ <FontAwesomeIcon icon={faAngleRight} />
        </span>
        <span className="Bodysd-search-doctor">Tin tức</span>
      </div>
      <div className="Dl-body">
        <div className="Dl-grid-container">
          {newList.map((news, index) => (
            <div key={index} className="Dl-department-card">
              <img
                src={`/assets/newImage/${news.images[0]}`}
                alt={news.name}
                onClick={() => navigate(`/user/news/${news._id}`)}
              />
              <h3 onClick={() => navigate(`/user/news/${news._id}`)}>{news.name}</h3>
              <a onClick={() => navigate(`/user/news/${news._id}`)}>More</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Newlist;
