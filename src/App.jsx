import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import App_user from "./user_fontend/App_user";
import Login from "./login/App_login";
import App_doctor from "./doctor_frontend/App_doctor";
import AdminApp from "./admin_dashboard/AdminApp";

const App = () => {
  // Kiểm tra xem đã đăng nhập chưa
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Routes>
        {/* Default: chuyển đến user landing page */}
        <Route path="/" element={<Navigate to="/user" replace />} />
        <Route path="/user/*" element={<App_user />} />

        {/* Trang đăng nhập */}
        <Route
          path="/login/*"
          element={
            user?.role === "admin" ? (
              <Navigate to="/admin/dashboard" replace />
            ) : user?.role === "doctor" ? (
              <Navigate to="/doctor/drprofile" replace />
            ) : (
              <Login />
            )
          }
        />

        {/* Doctor: nếu chưa login thì chặn (hoặc dùng ProtectedRoute riêng nếu cần) */}
        <Route path="/doctor/*" element={user?.role === "doctor" ? <App_doctor /> : <Navigate to="/login" />} />

        {/* Admin */}
        <Route path="/admin/*" element={user?.role === "admin" ? <AdminApp /> : <Navigate to="/login" />} />

        {/* Fallback */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
