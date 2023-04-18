import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";

export default function Login({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      let response = await AuthService.login(email, password);
      localStorage.setItem("user", JSON.stringify(response.data));
      setCurrentUser(AuthService.getCurrentUser());
      navigate("/profile");
    } catch (e) {
      setMessage(e.response.data);
    }
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
      <div className="card text-center  m-3 w-50">
        {message && <div className="alert alert-danger">{message}</div>}
        <div className="card-header">登入會員</div>
        <div>
          <label className="input-group  mb-1" htmlFor="email">
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
          className="btn btn-outline-secondary mt-1 "
          onClick={handleLogin}
        >
          登入系統
        </button>
      </div>
    </div>
  );
}
