const API_BASE_URL = "http://localhost:5050/api/invoices";

/**
 * Lấy danh sách hóa đơn với filter, phân trang
 * @param {Object} params - { status, page, limit }
 * @returns {Promise<Object>} - { data, total, page, limit, totalPages }
 */
export async function getInvoices(params = {}) {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Lỗi khi lấy danh sách hóa đơn: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Lỗi trong getInvoices:", error);
    throw error;
  }
}

/**
 * Lấy chi tiết hóa đơn theo ID
 * @param {string} id
 * @returns {Promise<Object>}
 */
export async function getInvoiceById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Lỗi khi lấy chi tiết hóa đơn: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Lỗi trong getInvoiceById:", error);
    throw error;
  }
}

/**
 * Tạo mới hóa đơn
 * @param {Object} data
 * @returns {Promise<Object>}
 */
export async function createInvoice(data) {
  try {
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
  } catch (error) {
    console.error("Lỗi trong createInvoice:", error);
    throw error;
  }
}

/**
 * Cập nhật hóa đơn theo ID
 * @param {string} id
 * @param {Object} data
 * @returns {Promise<Object>}
 */
export async function updateInvoice(id, data) {
  try {
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
  } catch (error) {
    console.error("Lỗi trong updateInvoice:", error);
    throw error;
  }
}

/**
 * Xóa hóa đơn theo ID
 * @param {string} id
 * @returns {Promise<void>}
 */
export async function deleteInvoiceById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Lỗi khi xóa hóa đơn");
    }
  } catch (error) {
    console.error("Lỗi trong deleteInvoiceById:", error);
    throw error;
  }
}
