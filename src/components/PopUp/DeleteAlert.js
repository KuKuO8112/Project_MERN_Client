import React from "react";

export default function DeleteAlert({
  deleteHandler,
  deletePopUp,
  setDeletePopUp,
  deleteData,
}) {
  const cancelDelete = () => {
    setDeletePopUp(false);
  };

  return deletePopUp ? (
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
      <div className="position-absolute top-50 start-50 translate-middle">
        <div
          className="card text-center"
          style={{
            width: "33%",
            minWidth: "15rem",
            margin: "0.1rem",
          }}
          key={deleteData._id}
        >
          <div className="card-header">
            {deleteData.IncomeOrPay ? "收入" : "支出"}
          </div>
          <div>
            <p style={{ margin: "0.8rem" }} className="card-title">
              {deleteData.IncomeOrPay ? "來源" : "用途"}：{deleteData.title}
            </p>
            <p style={{ margin: "0.8rem" }} className="card-text">
              說明：{deleteData.description}
            </p>
            <p style={{ margin: "0.8rem" }} className="card-text">
              金額：{deleteData.cost}
            </p>
            <p className="card-text">
              {deleteData.date + " " + deleteData.time}
            </p>
          </div>
          <div className="card-footer text-body-secondary">
            <button
              style={{ margin: "0.5rem" }}
              className="btn btn-outline-danger"
              onClick={() => {
                deleteHandler(deleteData._id);
              }}
            >
              刪除
            </button>
            <button
              style={{ margin: "0.5rem" }}
              className="btn btn-outline-secondary"
              onClick={cancelDelete}
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
