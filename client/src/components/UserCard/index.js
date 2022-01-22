import React, { useContext } from "react";

import "./usercard.css";

const UserCard = ({ user, handleToggle, handleDelete }) => {
  const renderUser = () => {
    return Object.entries(user).map(([key, value], i) => (
      <div className="card-line" key={i}>
        <p>
          <strong>{key}:</strong>{" "}
        </p>{" "}
        <p> {value}</p>
      </div>
    ));
  };
  const onDelete = () => {
    handleDelete(user.passportID);
  };
  return (
    <div className="user-card">
      <h3 className="user-card-title">{user.name}</h3>
      {renderUser()}
      <button
        onClick={() => {
          handleToggle("update");
        }}
      >
        Update
      </button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default UserCard;
