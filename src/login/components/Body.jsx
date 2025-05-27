import "../styles/Body.css";
import React, { useState } from "react";
import Background from "../assets/1.webp";
import axios from "axios";

const Login = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      alert("Đăng nhập thành công! Token: " + response.data.token);
    } catch (error) {
      alert("Lỗi đăng nhập: " + error.response.data.message);
    }
  };

  return (
    <div className="container">
      <img className="img" src={Background} alt="Background" />
      <div className="border">
        <div className="form-section">
          <h2>Đăng nhập</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              required
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
