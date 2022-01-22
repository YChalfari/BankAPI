import React, { useState, useEffect } from "react";
import "./input.css";
const Input = ({ type, name, onChange }) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    (() => {
      onChange(name, value);
    })();
  }, [value]);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className="input-wrap">
      <label htmlFor={name.toLowerCase()}>{name}</label>
      <input
        className="login-input"
        onChange={handleChange}
        type={type}
        minLength={type === "password" ? "6" : ""}
        name={name.toLowerCase()}
        value={value}
      />
    </div>
  );
};

export default Input;
