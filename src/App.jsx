
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import App_user from "./user_fontend/App_user";
// Nếu có App_admin và App_doctor thì import thêm:
// import App_admin from "./admin_dashboard/App_admin";
// import App_doctor from "./doctor_frontend/App_doctor";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Điều hướng root về trang user hoặc trang đăng nhập */}
        <Route path="/" element={<Navigate to="/user" replace />} />

        {/* User frontend */}
        <Route path="/user/*" element={<App_user />} />

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
