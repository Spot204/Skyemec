const API_BASE_URL = "http://localhost:5050/api/news";

/**
 * Lấy danh sách tất cả tin tức
 * @returns {Promise<Array>} mảng tin tức
 */
export async function fetchNewsList() {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Lỗi khi lấy danh sách tin tức: ${errorText}`);
  }
  return response.json();
}

/**
 * Thêm mới tin tức
 * @param {Object} data - dữ liệu tin tức { name, headers, notes, images }
 * @returns {Promise<Object>} tin tức mới tạo
 */
export async function createNews(data) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const text = await response.text();
  let result;
  try {
    result = JSON.parse(text);
  } catch {
    throw new Error(`Lỗi không parse được JSON khi tạo tin tức: ${text}`);
  }
  if (!response.ok) {
    throw new Error(result.message || "Thêm tin tức thất bại");
  }
  return result.news;
}

/**
 * Cập nhật tin tức theo ID
 * @param {string} id - ID tin tức
 * @param {Object} data - dữ liệu cập nhật { name, headers, notes, images }
 * @returns {Promise<Object>} tin tức đã cập nhật
 */
export async function updateNews(id, data) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const text = await response.text();
  let result;
  try {
    result = JSON.parse(text);
  } catch {
    throw new Error(`Lỗi không parse được JSON khi cập nhật tin tức: ${text}`);
  }
  if (!response.ok) {
    throw new Error(result.message || "Cập nhật tin tức thất bại");
  }
  return result.news;
}

/**
 * Xóa tin tức theo ID
 * @param {string} id - ID của tin tức cần xóa
 * @returns {Promise<void>}
 */
export async function deleteNews(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
  const text = await response.text();
  let result;
  try {
    result = JSON.parse(text);
  } catch {
    throw new Error(`Lỗi không parse được JSON khi xóa tin tức: ${text}`);
  }
  if (!response.ok) {
    throw new Error(result.message || "Xóa tin tức thất bại");
  }
}
