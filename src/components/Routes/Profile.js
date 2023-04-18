import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile({ currentUser, setCurrentUser }) {
  let navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      {!currentUser && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            width: "60%",
            margin: "auto",
          }}
        >
          <div
            className="mt-5"
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <p className="m-4 text-secondary" style={{ fontSize: "4rem" }}>
              請先登入
            </p>
          </div>
          <div
            className="m-4"
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <button
              className=" btn btn-outline-secondary"
              style={{ width: "25rem" }}
              onClick={handleTakeToLogin}
            >
              返回登入頁面
            </button>
          </div>
        </div>
      )}
      {currentUser && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            width: "80%",
            margin: "auto",
            marginTop: "2rem",
            maxWidth: "30rem",
          }}
        >
          <div className="card text-center" style={{ width: "100%" }}>
            <div className="card-header" style={{ width: "100%" }}>
              個人資料
            </div>
            <div className="card-body" style={{ width: "100%" }}>
              <h5 className="card-title">姓名:{currentUser.user.username}</h5>

              <p className="card-text">ID:{currentUser.user._id}</p>
              <p className="card-text">電子信箱:{currentUser.user.email}</p>
            </div>
            <div
              className="card-footer text-body-secondary"
              style={{ width: "100%" }}
            >
              註冊時間:{currentUser.user.date}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
