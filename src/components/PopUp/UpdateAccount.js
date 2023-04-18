import { React, useState, useLayoutEffect } from "react";
import AccountService from "../../services/account.service";
import InTitle from "../TitleInput/InTitle";
import OutTitle from "../TitleInput/OutTitle";

export default function UpdateAccount({
  popUp,
  setPopUp,
  updateData,
  setAlertPopUp,
}) {
  let [IncomeOrPay, setIncomeOrPay] = useState(true);
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [cost, setCost] = useState(0);
  let [date, setDate] = useState("");
  let [time, setTime] = useState("");
  let [message, setMessage] = useState("");

  useLayoutEffect(() => {
    setIncomeOrPay(updateData.IncomeOrPay);
    setTitle(updateData.title);
    setDescription(updateData.description);
    setCost(updateData.cost);
    setDate(updateData.date);
    setTime(updateData.time);
  }, [popUp]);

  const handleIn = () => {
    setIncomeOrPay(true);
  };
  const handleOut = () => {
    setIncomeOrPay(false);
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
  const alertHandler = () => {
    setAlertPopUp(true);
  };

  const UpdateHandler = () => {
    AccountService.patch(
      updateData._id,
      title,
      IncomeOrPay,
      description,
      cost,
      date,
      time
    )
      .then(() => {
        alertHandler();
        setPopUp(false);
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  const CancelHandler = () => {
    setPopUp(false);
    setMessage("");
  };

  return popUp ? (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgb(0,0,0,0.7)",
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "1000",
      }}
    >
      <div
        className="position-absolute top-50 start-50 translate-middle"
        style={{ width: "40vw", minWidth: "15rem" }}
      >
        <div className="card">
          <div>
            {message && <div className="alert alert-danger">{message}</div>}
            <label htmlFor="IncomeOrPay">
              <ul className="nav nav-underline">
                <li className="nav-item">
                  <button
                    style={{ margin: "0.5rem" }}
                    className="nav-link fs-4"
                    name="IncomeOrPay"
                    onClick={handleIn}
                  >
                    收入
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    style={{ margin: "0.5rem" }}
                    className="nav-link fs-4"
                    name="IncomeOrPay"
                    onClick={handleOut}
                  >
                    支出
                  </button>
                </li>
              </ul>
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
                value={description}
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
                value={cost}
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
                value={date}
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
                value={time}
              />
            </label>
          </div>
          <button
            style={{ margin: "0.5rem" }}
            className="btn btn-outline-primary"
            onClick={UpdateHandler}
          >
            修改資料
          </button>
          <button
            style={{ margin: "0.5rem" }}
            className="btn btn-outline-danger"
            onClick={CancelHandler}
          >
            取消
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
