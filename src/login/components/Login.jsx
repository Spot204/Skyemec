// src/components/Login.jsx
import "../styles/Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../assets/1.webp";
import { login } from "../sevices/LoginSevice"; // đường dẫn cần đúng

const Login = () => {
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const result = await login(username, password); // gọi API
      const { token, user } = result;

      // Lưu token + user vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Đăng nhập thành công!");

      // Chuyển hướng theo role
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "doctor") {
        navigate("/doctor/drprofile");
      } else {
        alert("Vai trò không hợp lệ!");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      alert("Lỗi đăng nhập: " + (error.message || "Vui lòng thử lại"));
    }
  };

  return (
    <div className="login-container">
      <img className="img" src={Background} alt="Background" />
      <div className="border">
        <div className="form-section">
          <h2>Đăng nhập</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="save-password">
              <input
                type="checkbox"
                id="checkbox"
                checked={isChecked}
                onChange={handleChange}
              />
              <label htmlFor="checkbox">Lưu mật khẩu</label>
            </div>
            <button type="submit">Đăng nhập</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
