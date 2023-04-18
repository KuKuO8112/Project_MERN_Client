import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccountService from "../../services/account.service";
import InTitle from "../TitleInput/InTitle";
import OutTitle from "../TitleInput/OutTitle";
import AlertPop from "../PopUp/AlertPop";

export default function PostAccount({ currentUser, setCurrentUser }) {
  let [IncomeOrPay, setIncomeOrPay] = useState(true);
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [cost, setCost] = useState(0);
  let [date, setDate] = useState(null);
  let [time, setTime] = useState("");
  let [message, setMessage] = useState("");
  let [alertPopUp, setAlertPopUp] = useState(false);
  const navigate = useNavigate();

  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const handleIn = () => {
    setIncomeOrPay(true);
    setTitle("");
  };
  const handleOut = () => {
    setIncomeOrPay(false);
    setTitle("");
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleCost = (e) => {
    setCost(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleTime = (e) => {
    setTime(e.target.value);
  };

  const postAccount = () => {
    AccountService.post(title, IncomeOrPay, description, cost, date, time)
      .then(() => {
        setAlertPopUp(true);
      })
      .catch((error) => {
        setMessage(error.response.data);
      });
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
          className="w-100 m-auto p-2"
          style={{
            maxWidth: "50rem",
          }}
        >
          <div className="card w-100">
            <div>
              {message && <div className="alert alert-danger">{message}</div>}
              <label htmlFor="IncomeOrPay">
                <label className="input-group" htmlFor="IncomeOrPay">
                  <button
                    className="input-group-text fs-4 btn btn-outline-secondary"
                    name="IncomeOrPay"
                    onClick={handleIn}
                  >
                    收入
                  </button>
                  <button
                    className="input-group-text fs-4 btn btn-outline-secondary"
                    name="IncomeOrPay"
                    onClick={handleOut}
                  >
                    支出
                  </button>
                </label>
              </label>
            </div>
            <div>
              {IncomeOrPay ? (
                <InTitle handleTitle={handleTitle} title={title} />
              ) : (
                <OutTitle handleTitle={handleTitle} title={title} />
              )}
            </div>
            <div>
              <label className="input-group" htmlFor="description">
                <span className="input-group-text fs-4">說明</span>
                <input
                  className="form-control"
                  onChange={handleDescription}
                  type="text"
                  name="description"
                />
              </label>
            </div>
            <div>
              <label className="input-group" htmlFor="cost">
                <span className="input-group-text fs-4">金額</span>
                <input
                  className="form-control"
                  onChange={handleCost}
                  defaultValue={0}
                  type="number"
                  name="cost"
                />
              </label>
            </div>
            <div>
              <label className="input-group" htmlFor="date">
                <span className="input-group-text fs-4">日期</span>
                <input
                  className="form-control"
                  onChange={handleDate}
                  type="date"
                  name="date"
                />
              </label>
            </div>
            <div>
              <label className="input-group" htmlFor="time">
                <span className="input-group-text fs-4">時間</span>
                <input
                  className="form-control"
                  onChange={handleTime}
                  type="time"
                  name="time"
                />
              </label>
            </div>
            <button className="btn btn-outline-secondary" onClick={postAccount}>
              新增資料
            </button>
          </div>
          <AlertPop
            ifNavigate={"/account"}
            alertText={"資料新增成功"}
            alertPopUp={alertPopUp}
            setAlertPopUp={setAlertPopUp}
          ></AlertPop>
        </div>
      )}
    </>
  );
}
