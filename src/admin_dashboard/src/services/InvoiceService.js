const API_BASE_URL = "http://localhost:5050/api/invoices";

/**
 * Lấy danh sách hóa đơn với filter, phân trang
 * @param {Object} params - { status, page, limit }
 * @returns {Promise<Object>} - { data, total, page, limit, totalPages }
 */
export async function getInvoices(params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const url = `${API_BASE_URL}${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Lỗi khi lấy danh sách hóa đơn");
  }
  return response.json();
}

/**
 * Lấy chi tiết hóa đơn theo ID
 * @param {string} id
 * @returns {Promise<Object>}
 */
export async function getInvoiceById(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Lỗi khi lấy chi tiết hóa đơn");
  }
  return response.json();
}

/**
 * Tạo mới hóa đơn
 * @param {Object} data
 * @returns {Promise<Object>}
 */
export async function createInvoice(data) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Lỗi khi tạo hóa đơn");
  }
  return response.json();
}

/**
 * Cập nhật hóa đơn theo ID
 * @param {string} id
 * @param {Object} data
 * @returns {Promise<Object>}
 */
export async function updateInvoice(id, data) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Lỗi khi cập nhật hóa đơn");
  }
  return response.json();
}

/**
 * Xóa hóa đơn theo ID
 * @param {string} id
 * @returns {Promise<void>}
 */
export async function deleteInvoiceById(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Lỗi khi xóa hóa đơn");
  }
}
