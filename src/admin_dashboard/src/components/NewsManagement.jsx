import React, { useState } from "react";
import "../styles/NewsManagement.css";

const initialNews = [
  {
    id: 1,
    title: "Ưu đãi giảm 20% khám sức khỏe tổng quát",
    category: "Ưu đãi",
    content: "Chương trình ưu đãi đặc biệt cho khách hàng đặt lịch trước...",
  },
  {
    id: 2,
    title: "Sự kiện tầm soát ung thư miễn phí",
    category: "Sự kiện",
    content: "Chúng tôi tổ chức sự kiện tầm soát ung thư miễn phí trong tháng 6...",
  },
];

const categories = ["Ưu đãi", "Sự kiện"];

const NewsManagement = () => {
  const [newsList, setNewsList] = useState(initialNews);
  const [editNews, setEditNews] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: categories[0],
    content: "",
  });

  const resetForm = () => setFormData({ title: "", category: categories[0], content: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdate = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Vui lòng nhập đầy đủ tiêu đề và nội dung tin tức.");
      return;
    }

    if (editNews) {
      setNewsList((prev) =>
        prev.map((item) =>
          item.id === editNews.id ? { ...item, ...formData } : item
        )
      );
      setEditNews(null);
    } else {
      const newItem = {
        id: newsList.length + 1,
        ...formData,
      };
      setNewsList((prev) => [...prev, newItem]);
    }
    resetForm();
  };

  const handleEdit = (news) => {
    setEditNews(news);
    setFormData({
      title: news.title,
      category: news.category,
      content: news.content,
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa tin tức này?")) {
      setNewsList((prev) => prev.filter((item) => item.id !== id));
      if (editNews && editNews.id === id) {
        setEditNews(null);
        resetForm();
      }
    }
  };

  return (
    <div className="NewsManagement-container">
      <h2>Quản lý tin tức & ưu đãi</h2>

      <div className="NewsManagement-form">
        <input
          type="text"
          name="title"
          placeholder="Tiêu đề"
          value={formData.title}
          onChange={handleInputChange}
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <textarea
          name="content"
          placeholder="Nội dung"
          value={formData.content}
          onChange={handleInputChange}
          rows={5}
        />

        <div className="NewsManagement-buttons">
          <button onClick={handleAddOrUpdate}>
            {editNews ? "Cập nhật" : "Thêm mới"}
          </button>
          {editNews && (
            <button
              className="btn-cancel"
              onClick={() => {
                setEditNews(null);
                resetForm();
              }}
            >
              Hủy
            </button>
          )}
        </div>
      </div>

      <table className="NewsManagement-table" border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tiêu đề</th>
            <th>Loại tin</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {newsList.map((news) => (
            <tr key={news.id}>
              <td>{news.id}</td>
              <td>{news.title}</td>
              <td>{news.category}</td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() => handleEdit(news)}
                >
                  Sửa
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(news.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
          {newsList.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: 20 }}>
                Chưa có tin tức nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NewsManagement;
