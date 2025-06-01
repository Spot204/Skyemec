import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import App_user from "./user_fontend/App_user";
import Login from "./login/App_login";
import App_doctor from "./doctor_frontend/App_doctor";
// Nếu có App_admin và App_doctor thì import thêm:
// import App_admin from "./admin_dashboard/App_admin";
// import App_doctor from "./doctor_frontend/App_doctor";

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

        {/* Nếu có admin dashboard thì bỏ comment dòng dưới */}
        {/* <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} /> */}

        {/* Nếu có doctor dashboard thì bỏ comment dòng dưới */}
        <Route path="/" element={<Navigate to="/doctor" replace />} />
        <Route
          path="/doctor"
          element={<Navigate to="/doctor/drhome" replace />}
        />
        <Route path="/doctor/*" element={<App_doctor />} />

        {/* Trang bác sĩ */}

        {/* Nếu có admin dashboard */}
        {/* <Route path="/admin/*" element={<App_admin />} /> */}

        {/* Nếu có doctor dashboard */}
        {/* <Route path="/doctor/*" element={<App_doctor />} /> */}

        {/* 404 fallback */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
