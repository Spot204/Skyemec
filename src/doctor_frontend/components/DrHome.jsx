import "../styles/DrHome.css";
import topimage from "../assets/Docimage1.jpg";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const DrHome = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5050/api/news/tintucyte")
      .then((res) => setArticles(res.data))
      .catch((err) => console.error(err));
  }, []);

  console.log(articles);

  return (
    <div className="drhome-cover">
      <div className="drhome-top-text">
        <a>Xin chào bác sĩ!</a>
      </div>
      <img className="drhome-top-img" src={topimage} alt="topimage" />
      <div className="drhome-container">
        <h2>Tin tức y tế</h2>
        <div className="drhome-line"></div>
        <div className="drnews-list">
          <div className="drhome-grid">
            {articles.map((article, idx) => (
              <a
                key={idx}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="drhome-card"
              >
                {article.enclosure?.url && (
                  <img src={article.enclosure.url} alt={article.title} />
                )}
                <h4>{article.title}</h4>
                <p>{article.contentSnippet}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrHome;
