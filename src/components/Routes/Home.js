import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    AuthService.getTestAPI();
    if (localStorage.getItem("user")) navigate("/profile");
  }, []);

  return (
    <main>
      <div className="container py-4">
        <div className="mb-4">
          <div className="h-100 p-5 text-white bg-dark rounded-3">
            <h1 className="display-5 fw-bold">學習系統</h1>
            <p className="fs-4">
              本系統使用 React.js 作為前端框架，Node.js、MongoDB作為後端服務器。
            </p>
            <p>
              <a
                className="link-light link-underline-opacity-0 link-underline-opacity-75-hover"
                target="blank"
                href="https://github.com/KuKuO8112/Project_MERN_Client"
              >
                Github前端
              </a>
            </p>
            <p>
              <a
                className="link-light link-underline-opacity-0 link-underline-opacity-75-hover"
                target="blank"
                href="https://github.com/KuKuO8112/Project_MERN_Server"
              >
                Github後端
              </a>
            </p>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-5 bg-light border rounded-3">
              <h2>如已註冊帳戶，登入並開始使用。</h2>
              <Link
                style={{ marginTop: "2rem" }}
                className="btn btn-outline-secondary"
                type="button"
                to={"/Login"}
              >
                登入並馬上開始
              </Link>
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-5 bg-light border rounded-3">
              <h2>如果您是第一次來到這，註冊一個帳戶並開始使用。</h2>
              <Link
                style={{ marginTop: "2rem" }}
                className="btn btn-outline-secondary"
                type="button"
                to={"/register"}
              >
                註冊一個新帳戶
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
