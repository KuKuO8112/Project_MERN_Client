import React from "react";

export default function OutTitle({ handleTitle, title }) {
  return (
    <select
      className="form-select form-select-lg fs-4"
      onChange={handleTitle}
      name="title"
      value={title ? title : ""}
    >
      <option value="">用途</option>
      <option value="飲食">飲食</option>
      <option value="交通">交通</option>
      <option value="娛樂">娛樂</option>
      <option value="購物">購物</option>
      <option value="個人">個人</option>
      <option value="醫療">醫療</option>
      <option value="家居">家居</option>
      <option value="家庭">家庭</option>
      <option value="生活">生活</option>
      <option value="學習">學習</option>
    </select>
  );
}
