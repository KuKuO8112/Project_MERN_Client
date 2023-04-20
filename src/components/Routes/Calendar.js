import { useState, useEffect, React } from "react";
import { useNavigate } from "react-router-dom";
import AccountService from "../../services/account.service";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Box } from "@mui/material";

export default function Calendar({ currentUser, setCurrentUser }) {
  let navigate = useNavigate();
  const [accountData, setAccountData] = useState(null);
  const [selectDate, setSelectDate] = useState("");

  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      AccountService.get(_id)
        .then((data) => {
          setAccountData(data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  const dateClickHandler = (e) => {
    let m = e.$M + 1;
    if (m >= 10) {
      setSelectDate(e.$y + "-" + m + "-" + e.$D);
    } else {
      setSelectDate(e.$y + "-" + "0" + m + "-" + e.$D);
    }
  };

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
          className="d-flex flex-column justify-content-center"
          style={{ marginBottom: "5rem" }}
        >
          <div className="m-auto p-2 w-100" style={{ maxWidth: "75rem" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                onChange={dateClickHandler}
                slotProps={{ textField: { width: "50rem" } }}
              />
            </LocalizationProvider>
          </div>
          <div className="d-flex flex-column justify-content-center">
            <div className="m-auto border border-secondary rounded w-50 text-center">
              {selectDate}
            </div>
            <div className="m-auto">
              <table
                className="table border m-2"
                style={{ width: "100vw", maxWidth: "60rem" }}
              >
                <thead>
                  <tr>
                    <th></th>
                    <th>用途/來源</th>
                    <th>說明</th>
                    <th>金額</th>
                    <th>時間</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {accountData
                    .filter((e) => {
                      return e.date === selectDate;
                    })
                    .map((data) => {
                      return (
                        <tr key={data._id}>
                          <th
                            style={
                              data.IncomeOrPay
                                ? { backgroundColor: "lightgreen" }
                                : { backgroundColor: "pink" }
                            }
                          >
                            {data.IncomeOrPay ? "收入" : "支出"}
                          </th>
                          <td>{data.title}</td>
                          <td>{data.description}</td>
                          <td>{data.cost}</td>
                          <td>{data.time}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
