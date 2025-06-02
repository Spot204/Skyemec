import React, { useState, useEffect } from "react";
import "../styles/NewsManagement.css";
import { fetchNewsList, createNews, updateNews, deleteNews } from "../services/NewsService";

const NewsManagement = () => {
  const [newsList, setNewsList] = useState([]);
  const [editNewsId, setEditNewsId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [headers, setHeaders] = useState([""]);
  const [notes, setNotes] = useState([""]);
  const [images, setImages] = useState([""]);

  // Load danh sách tin tức
  const loadNews = async () => {
    setLoading(true);
    try {
      const data = await fetchNewsList();
      setNewsList(data);
    } catch (error) {
      alert("Lỗi khi tải danh sách tin tức");
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadNews();
  }, []);

  // Reset form
  const resetForm = () => {
    setName("");
    setHeaders([""]);
    setNotes([""]);
    setImages([""]);
    setEditNewsId(null);
  };

  // Load dữ liệu lên form khi sửa
  const handleEdit = (news) => {
    setEditNewsId(news._id);
    setName(news.name || "");
    setHeaders(news.headers && news.headers.length > 0 ? news.headers : [""]);
    setNotes(news.notes && news.notes.length > 0 ? news.notes : [""]);
    setImages(news.images && news.images.length > 0 ? news.images : [""]);
  };

  // Xử lý thay đổi phần tử trong mảng
  const handleArrayChange = (setter, index, value) => {
    setter(prev => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  // Thêm phần tử mảng
  const handleAddArrayItem = (setter) => {
    setter(prev => [...prev, ""]);
  };

  // Xóa phần tử mảng
  const handleRemoveArrayItem = (setter, index) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  // Gửi form thêm hoặc cập nhật
  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("Tên (name) không được để trống");
      return;
    }

    setLoading(true);
    const dataToSend = {
      name: name.trim(),
      headers: headers.filter(h => h.trim() !== ""),
      notes: notes.filter(n => n.trim() !== ""),
      images: images.filter(i => i.trim() !== ""),
    };

    try {
      if (editNewsId) {
        await updateNews(editNewsId, dataToSend);
        alert("Cập nhật thành công");
      } else {
        await createNews(dataToSend);
        alert("Thêm mới thành công");
      }
      resetForm();
      await loadNews();
    } catch (error) {
      alert("Lỗi khi lưu tin tức");
      console.error(error);
    }
    setLoading(false);
  };

  // Xóa tin tức
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa tin tức này?")) {
      setLoading(true);
      try {
        await deleteNews(id);
        alert("Xóa thành công");
        if (editNewsId === id) resetForm();
        await loadNews();
      } catch (error) {
        alert("Lỗi khi xóa tin tức");
        console.error(error);
      }
      setLoading(false);
    }
  };

  // Mở/đóng chi tiết tin tức
  const toggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="NewsManagement-container">
      <h2>Quản lý tin tức & ưu đãi</h2>

      {/* Form thêm/sửa */}
      <div className="NewsManagement-form">
        <label>
          Tên (Name):
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={loading}
            placeholder="Tên tin tức"
          />
        </label>

        <label>
          Headers:
          {headers.map((header, i) => (
            <div key={i} style={{ marginBottom: 4 }}>
              <input
                type="text"
                value={header}
                onChange={e => handleArrayChange(setHeaders, i, e.target.value)}
                disabled={loading}
                placeholder={`Header #${i + 1}`}
              />
              <button
                type="button"
                onClick={() => handleRemoveArrayItem(setHeaders, i)}
                disabled={loading}
                aria-label="Xóa header"
              >
                ❌
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddArrayItem(setHeaders)}
            disabled={loading}
          >
            ➕ Thêm Header
          </button>
        </label>

        <label>
          Notes:
          {notes.map((note, i) => (
            <div key={i} style={{ marginBottom: 4 }}>
              <textarea
                rows={3}
                value={note}
                onChange={e => handleArrayChange(setNotes, i, e.target.value)}
                disabled={loading}
                placeholder={`Note #${i + 1}`}
              />
              <button
                type="button"
                onClick={() => handleRemoveArrayItem(setNotes, i)}
                disabled={loading}
                aria-label="Xóa note"
              >
                ❌
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddArrayItem(setNotes)}
            disabled={loading}
          >
            ➕ Thêm Note
          </button>
        </label>

        <label>
          Images (đường dẫn ảnh):
          {images.map((img, i) => (
            <div key={i} style={{ marginBottom: 4 }}>
              <input
                type="text"
                value={img}
                onChange={e => handleArrayChange(setImages, i, e.target.value)}
                disabled={loading}
                placeholder={`Image URL #${i + 1}`}
              />
              <button
                type="button"
                onClick={() => handleRemoveArrayItem(setImages, i)}
                disabled={loading}
                aria-label="Xóa ảnh"
              >
                ❌
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddArrayItem(setImages)}
            disabled={loading}
          >
            ➕ Thêm Image
          </button>
        </label>

        <div className="NewsManagement-buttons" style={{ marginTop: 10 }}>
          <button onClick={handleSubmit} disabled={loading}>
            {editNewsId ? "Cập nhật" : "Thêm mới"}
          </button>
          {editNewsId && (
            <button onClick={resetForm} disabled={loading} style={{ marginLeft: 10 }}>
              Hủy
            </button>
          )}
        </div>
      </div>

      {/* Danh sách tin tức */}
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <table className="NewsManagement-table" border="1" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {newsList.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "center", padding: 20 }}>
                  Chưa có tin tức nào.
                </td>
              </tr>
            ) : (
              newsList.map(news => (
                <React.Fragment key={news._id}>
                  <tr>
                    <td>{news._id}</td>
                    <td>{news.name}</td>
                    <td>
                      <button onClick={() => handleEdit(news)} disabled={loading}>
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(news._id)}
                        disabled={loading}
                        style={{ marginLeft: 5 }}
                      >
                        Xóa
                      </button>
                      <button
                        onClick={() => toggleExpand(news._id)}
                        style={{ marginLeft: 5 }}
                      >
                        {expandedId === news._id ? "Ẩn chi tiết" : "Chi tiết"}
                      </button>
                    </td>
                  </tr>
                  {expandedId === news._id && (
                    <tr>
                      <td colSpan="3" style={{ backgroundColor: "#f9f9f9", padding: "10px 15px" }}>
                        <div>
                          <strong>Headers:</strong>
                          <ul>
                            {news.headers?.map((h, i) => (
                              <li key={i}>{h}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <strong>Notes:</strong>
                          <ul>
                            {news.notes?.map((n, i) => (
                              <li key={i}>{n}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <strong>Images:</strong>
                          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                            {news.images?.map((img, i) => (
                              <img
                                key={i}
                                src={img}
                                alt={`img-${i}`}
                                style={{ maxWidth: 100, borderRadius: 6 }}
                              />
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default NewsManagement;
