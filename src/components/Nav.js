import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import AlertPop from "./PopUp/AlertPop";

export default function Nav({ currentUser, setCurrentUser }) {
  let [alertPopUp, setAlertPopUp] = useState(false);
  const handleLogout = () => {
    setAlertPopUp(true);
    AuthService.logout();
    setCurrentUser(null);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid m-auto">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {!currentUser && (
              <li className="nav-item">
                <Link className="nav-link fs-2" to="/">
                  首頁
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link className="nav-link fs-2" to="/profile">
                  個人頁面
                </Link>
              </li>
            )}
            {!currentUser && (
              <li className="nav-item">
                <Link className="nav-link fs-2" to="/register">
                  註冊會員
                </Link>
              </li>
            )}
            {!currentUser && (
              <li className="nav-item">
                <Link className="nav-link fs-2" to="/login">
                  會員登入
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link className="nav-link fs-2" to="/calendar">
                  月曆
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link className="nav-link fs-2" to="/account">
                  資料列表
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link className="nav-link fs-2" to="/postAccount">
                  新增資料
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link className="nav-link fs-2" onClick={handleLogout} to="/">
                  登出
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      <AlertPop
        alertText={"已登出"}
        alertPopUp={alertPopUp}
        setAlertPopUp={setAlertPopUp}
      ></AlertPop>
    </nav>
  );
}
