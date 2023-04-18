import React from "react";
import { useNavigate } from "react-router-dom";

export default function AlertPop({
  alertText,
  alertPopUp,
  setAlertPopUp,
  ifNavigate,
}) {
  const navigate = useNavigate();
  const checkHandler = () => {
    if (ifNavigate) {
      navigate("/account");
    } else {
      setAlertPopUp(false);
    }
  };

  return alertPopUp ? (
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
        style={{ width: "40vw" }}
      >
        <div class="card text-center">
          <div class="card-body">
            <p class="card-text text-secondary">{alertText}</p>
            <button
              className="btn btn-outline-secondary"
              onClick={checkHandler}
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
