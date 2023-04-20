import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccountService from "../../services/account.service";
import UpdateAccount from "../PopUp/UpdateAccount";
import DeleteAlert from "../PopUp/DeleteAlert";
import AlertPop from "../PopUp/AlertPop";
import Filter from "../Filter/Filter";
import Loading from "../PopUp/Loading";

export default function Account({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState(null);
  const [popUp, setPopUp] = useState(false);
  const [alertPopUp, setAlertPopUp] = useState(false);
  const [updateData, setUpdateData] = useState("");
  const [deleteData, setDeleteData] = useState("");
  const [filterIncomeOrPay, setFilterIncomeOrPay] = useState("");
  const [filterTitle, setFilterTitle] = useState("");
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [minCostRange, setMinCostRange] = useState(0);
  const [maxCostRange, setMaxCostRange] = useState(100000);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [loadingPopUp, setLoadingPopUp] = useState(false);

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
  }, [alertPopUp]);

  const handleReset = () => {
    setFilterIncomeOrPay("");
    setFilterTitle("");
    setMinCostRange(0);
    setMaxCostRange(100000);
    setMinDate("");
    setMaxDate("");
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

  const updateHandler = (account) => {
    setUpdateData(account);
    setPopUp(true);
  };
  const deleteDataHandler = (account) => {
    setDeleteData(account);
    setDeletePopUp(true);
  };

  const deleteHandler = async (id) => {
    setLoadingPopUp(true);
    try {
      let message = await AccountService.delete(id);
      let _id = currentUser.user._id;
      AccountService.get(_id)
        .then((data) => {
          setAccountData(data.data);
          setDeletePopUp(false);
          setLoadingPopUp(false);
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
      {!accountData && (
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
            <p className="m-4 text-secondary" style={{ fontSize: "2rem" }}>
              資料讀取中(或render伺服器喚醒中)
            </p>
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
          <Filter
            handleIn={handleIn}
            handleOut={handleOut}
            filterIncomeOrPay={filterIncomeOrPay}
            handleTitleFilter={handleTitleFilter}
            filterTitle={filterTitle}
            minCostRange={minCostRange}
            setMinCostRange={setMinCostRange}
            maxCostRange={maxCostRange}
            setMaxCostRange={setMaxCostRange}
            minDate={minDate}
            setMinDate={setMinDate}
            maxDate={maxDate}
            setMaxDate={setMaxDate}
            handleReset={handleReset}
          />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              margin: "auto",
              marginBottom: "3rem",
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
              .filter((e) => {
                if (minDate == "" && maxDate == "") return e;
                if (maxDate == "" && e.date >= minDate) return e;
                if (minDate == "" && e.date <= maxDate) return e;
                if (e.date >= minDate && e.date <= maxDate) return e;
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
                    <div
                      className="card-header"
                      style={
                        account.IncomeOrPay //控制收支顏色
                          ? { backgroundColor: "lightgreen" }
                          : { backgroundColor: "pink" }
                      }
                    >
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
      />
      <AlertPop
        ifNavigate={"/account"}
        alertText={"資料修改成功"}
        alertPopUp={alertPopUp}
        setAlertPopUp={setAlertPopUp}
      />
      <Loading loadingPopUp={loadingPopUp} />
    </>
  );
}
