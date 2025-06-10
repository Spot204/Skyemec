import "../styles/Department.css";
import React, { useState, useEffect } from "react";
import { getNewById } from "../services/Newlist";
import { useParams , useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Department_body = () => {
  const [News, setNews] = useState([]);
  const [images, setImages] = useState([]);
  const [notes, setNotes] = useState([]);
  const [headers, setHeaders] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getNewById(id)
      .then((res) => setNews(res.data))
      .catch((err) => {
        setNews(null);
        console.error("Lỗi lấy tin tức:", err);
      });
  }, [id]);
  useEffect(() => {
    if (News) {
      setHeaders(News.headers || []);
      setNotes(News.notes || []);
      setImages(News.images || []);
    }
  }, [News]); // Chỉ chạy khi `News` thay đổi

  console.log("News:", News);
  console.log("Headers:", headers);
  console.log("Notes:", notes);
  console.log("Images:", images);

  if (News === null)
    return <div>Không tìm thấy bác sĩ hoặc có lỗi xảy ra.</div>;

  return (
    <div className="Db-body">
      <div className="Bodysd-navigation" id="Department-middle">
        <span className="Bodysd-home" onClick={() => navigate("/user/home")}>
          Trang chủ <FontAwesomeIcon icon={faAngleRight} />
        </span>
        <span id="Department-text" onClick={() => navigate("/user/news")}>
          Tin tức <FontAwesomeIcon icon={faAngleRight} />
        </span>
        <span>{News.name}</span>
      </div>
      <div className="Department-sections">
        {headers.map((header, index) => (
          <div
            key={index}
            className={`Department-section ${
              index % 2 === 0 ? "left" : "right"
            }`}
          >
            {index % 2 === 0 ? (
              <>
                <div className="Department-sections-text-item">
                  <img
                    src={`/assets/newImage/${images[index]}`}
                    alt={`image-${index}`}
                  />
                  <div className="Department-sections-text">
                    <h2>{header}</h2>
                    <p>{notes[index * 3 + 0]}</p>
                    <p>{notes[index * 3 + 1]}</p>
                    <p>{notes[index * 3 + 2]}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="Department-sections-text-item">
                  <div className="Department-sections-text">
                    <h2>{header}</h2>
                    <p>{notes[index * 3 + 0]}</p>
                    <p>{notes[index * 3 + 1]}</p>
                    <p>{notes[index * 3 + 2]}</p>
                  </div>
                  <img
                    src={`/assets/newImage/${images[index]}`}
                    alt={`image-${index}`}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Department_body;
