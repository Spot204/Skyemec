import "../styles/Body.css";
import React, { useState } from "react";
import Background from "../assets/1.webp";

const LoginRegister = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="container">
      <img className="img" src={Background} alt="Background" />
      <div className="border">
        <div className="form-section">
          <h2>Đăng nhập</h2>
          <form>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Mật khẩu" required />
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

export default LoginRegister;
