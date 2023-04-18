import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";

export default function Register() {
  const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    AuthService.register(username, email, password)
      .then(() => {
        window.alert("註冊成功，將被導向至登入頁面");
        navigate("/login");
      })
      .catch((e) => {
        setMessage(e.response.data);
      });
  };

  return (
    <div
      style={{
        width: "60%",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="card text-center m-3 w-50">
        {message && <div className="alert alert-danger">{message}</div>}
        <div className="card-header">註冊會員</div>
        <div>
          <label className="input-group  mb-1" htmlFor="username">
            <span className="input-group-text">用戶名稱:</span>
            <input
              className="form-control"
              onChange={handleUsername}
              type="text"
              name="username"
            />
          </label>
        </div>
        <div>
          <label className="input-group mt-1 mb-1" htmlFor="email">
            <span className="input-group-text">電子信箱:</span>
            <input
              className="form-control"
              onChange={handleEmail}
              type="text"
              name="email"
            />
          </label>
        </div>
        <div>
          <label className="input-group mt-1 mb-1" htmlFor="password">
            <span className="input-group-text">密碼:</span>
            <input
              className="form-control"
              onChange={handlePassword}
              type="password"
              name="password"
            />
          </label>
        </div>
        <button
          className="btn btn-outline-secondary mt-1"
          onClick={handleRegister}
        >
          註冊會員
        </button>
      </div>
    </div>
  );
}
