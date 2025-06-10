import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import Background from "../assets/1.webp";
import Logo from "../assets/Skyemec.png";
import { login } from "../sevices/LoginSevice";

const Login = () => {
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert("Vui lòng nhập đầy đủ username và mật khẩu.");
      return;
    }

    setLoading(true);
    try {
      const result = await login(username.trim(), password.trim());
      const { user } = result;

      console.log("User info from API:", user);

      if (!user || !user.role) {
        alert("Không lấy được thông tin vai trò người dùng.");
        setLoading(false);
        return;
      }

      const role = user.role.toLowerCase().trim();

      // Lưu user vào localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // Điều hướng theo role
      if (role === "admin") {
        navigate("/admin/users");
      } else if (role === "doctor") {
        localStorage.setItem("doctorId", user._id);
        navigate("/doctor");
      } else {
        alert("Vai trò không hợp lệ!");
      }

      // Reload trang để cập nhật app state
      window.location.reload();
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      alert("Lỗi đăng nhập: " + (error.message || "Vui lòng thử lại"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <img className="img" src={Background} alt="Background" />
      <img
        className="logo"
        src={Logo}
        alt="Logo"
        onClick={() => navigate("/user/home")}
        style={{ cursor: "pointer" }}
      />
      <div className="border">
        <div className="form-section">
          <h2>Đăng nhập</h2>
          <form onSubmit={handleLogin} className="main-login-form">
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <div className="save-password">
              <input
                type="checkbox"
                id="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                disabled={loading}
              />
              <label htmlFor="checkbox">Lưu mật khẩu</label>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
