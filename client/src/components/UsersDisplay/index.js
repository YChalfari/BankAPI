import React from "react";
import UserCard from "../UserCard";
const UsersDisplay = ({ users, handleToggle, handleDelete }) => {
  const renderUsers = () => {
    return users.map((user) => (
      <UserCard
        key={user.passportID}
        user={user}
        handleToggle={handleToggle}
        handleDelete={handleDelete}
      />
    ));
  };
  return <div className="users-display">{renderUsers()}</div>;
};

export default UsersDisplay;
