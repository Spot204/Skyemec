import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useEffect } from "react";
import App_user from "./user_fontend/App_user";
import Login from "./login/App_login";
import App_doctor from "./doctor_frontend/App_doctor";
import AdminApp from "./admin_dashboard/AdminApp";

// Hàm lấy user từ localStorage
const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

const App = () => {
  const user = getUser();

  return (
    <Router>
      <Routes>
        {/* Mặc định: redirect tới trang user */}
        <Route path="/" element={<Navigate to="/user" replace />} />

        {/* Trang user luôn public */}
        <Route path="/user/*" element={<App_user />} />

        {/* Trang đăng nhập: nếu đã login thì redirect theo role */}
        <Route path="/login/*" element={<Login />} />

        {/* Doctor route: yêu cầu đăng nhập đúng role */}
        <Route
          path="/doctor/*"
          element={
            user?.role === "doctor" ? (
              <App_doctor />
            ) : (
              <Navigate to="/login/login" replace />
            )
          }
        />

        {/* Admin route: yêu cầu đăng nhập đúng role */}
        <Route
          path="/admin/*"
          element={
            user?.role === "admin" ? (
              <AdminApp />
            ) : (
              <Navigate to="/login/login" replace />
            )
          }
        />

        {/* 404 fallback */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
