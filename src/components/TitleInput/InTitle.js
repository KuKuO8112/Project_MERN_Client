import React from "react";

export default function InTitle({ handleTitle, title }) {
  return (
    <select
      className="form-select form-select-lg fs-4"
      onChange={handleTitle}
      name="title"
      value={title ? title : ""}
    >
      <option value="">來源</option>
      <option value="薪水">薪水</option>
      <option value="獎金">獎金</option>
      <option value="投資">投資</option>
      <option value="還款">還款</option>
      <option value="利息">利息</option>
    </select>
  );
}
