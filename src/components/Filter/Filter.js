import React from "react";
import InTitle from "../TitleInput/InTitle";
import OutTitle from "../TitleInput/OutTitle";

export default function Filter({
  handleIn,
  handleOut,
  filterIncomeOrPay,
  handleTitleFilter,
  filterTitle,
  minCostRange,
  setMinCostRange,
  maxCostRange,
  setMaxCostRange,
  minDate,
  setMinDate,
  maxDate,
  setMaxDate,
  handleReset,
}) {
  const minCostRangeHandler = (e) => {
    setMinCostRange(e.target.value);
  };
  const maxCostRangeHandler = (e) => {
    setMaxCostRange(e.target.value);
  };

  const minDateHandler = (e) => {
    setMinDate(e.target.value);
  };
  const maxDateHandler = (e) => {
    setMaxDate(e.target.value);
  };

  return (
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
      <label className="input-group" htmlFor="costRange">
        <span className="input-group-text fs-5">日期範圍:</span>
        <input
          className="form-control"
          type="date"
          max={maxDate}
          name="costRange"
          value={minDate}
          onChange={minDateHandler}
        />
        <span className="input-group-text fs-5">~</span>
        <input
          className="form-control"
          type="date"
          min={minDate}
          name="costRange"
          value={maxDate}
          onChange={maxDateHandler}
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
  );
}
