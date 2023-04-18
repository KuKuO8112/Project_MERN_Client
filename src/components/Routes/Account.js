import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccountService from "../../services/account.service";
import UpdateAccount from "../PopUp/UpdateAccount";
import InTitle from "../TitleInput/InTitle";
import OutTitle from "../TitleInput/OutTitle";
import DeleteAlert from "../PopUp/DeleteAlert";
import AlertPop from "../PopUp/AlertPop";

export default function Account({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState(null);
  let [popUp, setPopUp] = useState(false);
  let [alertPopUp, setAlertPopUp] = useState(false);
  let [updateData, setUpdateData] = useState("");
  let [deleteData, setDeleteData] = useState("");
  let [filterIncomeOrPay, setFilterIncomeOrPay] = useState("");
  let [filterTitle, setFilterTitle] = useState("");
  let [deletePopUp, setDeletePopUp] = useState(false);
  let [minCostRange, setMinCostRange] = useState(0);
  let [maxCostRange, setMaxCostRange] = useState(100000);

  const handleTakeToLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      AccountService.get(_id)
        .then((data) => {
          setAccountData(data.data);
          setFilterTitle("");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  const handleReset = () => {
    setFilterIncomeOrPay("");
    setFilterTitle("");
    setMinCostRange(0);
    setMaxCostRange(100000);
  };
  const handleIn = () => {
    setFilterIncomeOrPay(true);
    setFilterTitle("");
  };
  const handleOut = () => {
    setFilterIncomeOrPay(false);
    setFilterTitle("");
  };
  const handleTitleFilter = (e) => {
    setFilterTitle(e.target.value);
  };
  const minCostRangeHandler = (e) => {
    setMinCostRange(e.target.value);
  };
  const maxCostRangeHandler = (e) => {
    setMaxCostRange(e.target.value);
  };

  const updateHandler = (account) => {
    setUpdateData(account);
    setPopUp(true);
  };
  const deleteDataHandler = (account) => {
    setDeleteData(account);
    setDeletePopUp(true);
  };

  const deleteHandler = async (id) => {
    try {
      let message = await AccountService.delete(id);
      let _id = currentUser.user._id;
      AccountService.get(_id)
        .then((data) => {
          setAccountData(data.data);
          setDeletePopUp(false);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
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
      {currentUser && accountData && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            width: "100%",
            maxWidth: "80rem",
            margin: "auto",
          }}
        >
          <div className="w-100 m-2">
            <div className="input-group">
              <button
                className="btn btn-outline-secondary fs-5"
                style={{ margin: "0.5rem" }}
                name="IncomeOrPay"
                onClick={handleIn}
              >
                收入
              </button>
              <button
                className="btn btn-outline-secondary fs-5"
                style={{ margin: "0.5rem" }}
                name="IncomeOrPay"
                onClick={handleOut}
              >
                支出
              </button>
              {filterIncomeOrPay === true ? (
                <InTitle handleTitle={handleTitleFilter} title={filterTitle} />
              ) : filterIncomeOrPay === false ? (
                <OutTitle handleTitle={handleTitleFilter} title={filterTitle} />
              ) : (
                ""
              )}
            </div>
            <label className="input-group" htmlFor="costRange">
              <span className="input-group-text fs-5">金額範圍:</span>
              <input
                className="form-control"
                type="number"
                name="costRange"
                value={minCostRange}
                onChange={minCostRangeHandler}
              />
              <span className="input-group-text fs-5">~</span>
              <input
                className="form-control"
                type="number"
                name="costRange"
                value={maxCostRange}
                onChange={maxCostRangeHandler}
              />
            </label>
            <button
              className="btn btn-secondary fs-5"
              style={{ margin: "0.5rem" }}
              onClick={handleReset}
            >
              重製篩選
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              margin: "auto",
              width: "100%",
              justifyContent: "center",
            }}
          >
            {accountData
              .filter((e) => {
                // 篩選收入或支出
                return filterIncomeOrPay === ""
                  ? e
                  : filterIncomeOrPay === true
                  ? e.IncomeOrPay === true
                  : e.IncomeOrPay === false;
              })
              //篩選來源和用途
              .filter((e) => {
                return filterTitle === "" ? e : e.title === filterTitle;
              })
              .filter((e) => {
                if (e.cost >= minCostRange && e.cost <= maxCostRange) return e;
              })
              .map((account) => {
                return (
                  <div
                    style={{
                      width: "20%",
                      boxSizing: "border-box",
                      minWidth: "15rem",
                    }}
                    className="card text-center mt-2 mb-2 m-1"
                    key={account._id}
                  >
                    <div className="card-header">
                      {account.IncomeOrPay ? "收入" : "支出"}
                    </div>
                    <div>
                      <p style={{ margin: "0.8rem" }} className="card-title">
                        {account.IncomeOrPay ? "來源" : "用途"}：{account.title}
                      </p>
                      <p style={{ margin: "0.8rem" }} className="card-text">
                        說明：{account.description}
                      </p>
                      <p style={{ margin: "0.8rem" }} className="card-text">
                        金額：{account.cost}
                      </p>
                      <button
                        style={{ margin: "0.5rem" }}
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          updateHandler(account);
                        }}
                      >
                        修改
                      </button>
                      <button
                        style={{ margin: "0.5rem" }}
                        className="btn btn-outline-danger"
                        onClick={() => {
                          deleteDataHandler(account);
                        }}
                      >
                        刪除
                      </button>
                    </div>
                    <div className="card-footer text-body-secondary">
                      <p className="card-text">
                        {account.date + " " + account.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            <i
              className="m-1"
              style={{
                width: "20%",
                minWidth: "15rem",
                boxSizing: "border-box",
              }}
            ></i>
            <i
              className="m-1"
              style={{
                width: "20%",
                minWidth: "15rem",
                boxSizing: "border-box",
              }}
            ></i>
            <i
              className="m-1"
              style={{
                width: "20%",
                minWidth: "15rem",
                boxSizing: "border-box",
              }}
            ></i>
          </div>
        </div>
      )}
      {/* 彈出更新畫面 */}
      <UpdateAccount
        popUp={popUp}
        setPopUp={setPopUp}
        updateData={updateData}
        setAlertPopUp={setAlertPopUp}
      />
      {/* 彈出確認是否刪除畫面 */}
      <DeleteAlert
        deleteHandler={deleteHandler}
        deletePopUp={deletePopUp}
        setDeletePopUp={setDeletePopUp}
        deleteData={deleteData}
      ></DeleteAlert>
      <AlertPop
        ifNavigate={"/account"}
        alertText={"資料修改成功"}
        alertPopUp={alertPopUp}
        setAlertPopUp={setAlertPopUp}
      ></AlertPop>
    </>
  );
}
