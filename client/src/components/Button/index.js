import React from "react";
import "./button.css";
const Button = ({ type, text, onClick, icon, color, bgColor, disable }) => {
  return (
    <button
      disable={disable && true}
      onClick={onClick}
      className={type === "image" ? "img-btn" : `btn ${bgColor}`}
    >
      {type === "image" ? (
        <>
          <i className={icon} style={{ color: `${color}` }}></i>
          {/* <p className="img-btn-text">{text}</p> */}
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
