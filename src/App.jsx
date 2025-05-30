import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import App_user from "./user_fontend/App_user";
import Login from "./login/App_login";
import App_doctor from "./doctor_frontend/App_doctor";
import AdminApp from "./admin_dashboard/AdminApp";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Điều hướng root về trang user hoặc trang đăng nhập */}
        <Route path="/" element={<Navigate to="/user" replace />} />
        <Route path="/user" element={<Navigate to="/user/home" replace />} />
        <Route path="/user/*" element={<App_user />} />

        {/* Trang đăng nhập */}
        <Route path="/login/*" element={<Login />} />

        {/* Admin dashboard */}
        {/* Truy cập /admin sẽ redirect sang /admin/dashboard */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        {/* AdminApp xử lý tất cả route con dưới /admin */}
        <Route path="/admin/*" element={<AdminApp />} />

        {/* Fallback 404 */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
