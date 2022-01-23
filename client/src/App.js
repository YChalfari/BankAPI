import React, { useState, createContext } from "react";
import axios from "axios";
import UsersDisplay from "./components/UsersDisplay";
import Form from "./components/Form";
import "./App.css";
export const UserContext = createContext();
const URI = (() => {
  if (process.env.NODE_ENV === "production") {
    return "/api";
  } else {
    return "http://localhost:5000/api";
  }
})();
const App = () => {
  const [users, setUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isTransfering, setIsTransfering] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [message, setMessage] = useState("");

  const getUsers = async () => {
    setIsLoading((prev) => !prev);
    const users = await axios.get(`${URI}/users`);
    setUsers(users.data.results);
    setIsLoading((prev) => !prev);
  };
  const handleCreate = async (user) => {
    const newUser = {
      name: user.name,
      cash: user.cash,
      credit: user.credit,
      passportID: user.passportid,
    };
    console.log(newUser);
    setIsLoading((prev) => !prev);
    const res = await axios.post(`${URI}/users`, newUser);
    resetState();
  };
  const resetState = () => {
    getUsers();
    setIsLoading((prev) => !prev);
    setSelectedUser(null);
    setIsCreating(false);
    setIsUpdating(false);
    setIsTransfering(false);
    setIsWithdrawing(false);
  };
  const handleToggle = (type, id) => {
    switch (type) {
      case "create":
        setIsCreating(!isCreating);
        break;
      case "update":
        setIsUpdating(!isUpdating);
        break;
      case "withdraw":
        setIsWithdrawing(!isWithdrawing);
        break;
      case "transfer":
        setIsTransfering(!isTransfering);
        break;
      default:
        return;
    }
    setSelectedUser(id);
  };
  const handleUpdate = async (user) => {
    const newUser = {
      // id: selectedUser._id,
      name: user.name || selectedUser.name,
      cash: user.cash,
      credit: user.credit,
      passportID: user.passportid || selectedUser.passportID,
    };
    setIsLoading((prev) => !prev);
    try {
      const res = await axios.patch(`${URI}/update`, newUser);
      setMessage("User updated successfully");
      resetState();
    } catch (error) {
      resetState();
    }
  };
  const handleDelete = async (id) => {
    try {
      setIsLoading((prev) => !prev);
      const res = await axios.delete(`${URI}/delete/${id}`);
      setMessage("User deleted successfully");
      resetState();
    } catch (e) {
      resetState();
      setMessage(e.message);
    }
  };
  const handleTransfer = async (id, amount, recipient) => {};
  return (
    <div>
      <h2 className="app-title">Hello Bank Manager</h2>
      {isLoading ? (
        <h2>LOADING...</h2>
      ) : (
        <>
          <button onClick={getUsers}>Get all Users</button>
          <button
            onClick={() => {
              setIsCreating(!isCreating);
            }}
          >
            Add a user
          </button>
          {message.length > 0 && <h3 className="message">{message}</h3>}
          {isUpdating && (
            <Form
              handleSubmit={handleUpdate}
              text={`Update ${selectedUser.name}`}
              inputs={[
                { name: "Name", type: "text", defaultValue: selectedUser.name },
                { name: "Cash", type: "text", defaultValue: selectedUser.cash },
                {
                  name: "Credit",
                  type: "text",
                  defaultValue: selectedUser.credit,
                },
                {
                  name: "PassportID",
                  type: "text",
                  defaultValue: selectedUser.passportID,
                },
              ]}
            />
          )}
          {isCreating && (
            <Form
              handleSubmit={handleCreate}
              text={"Create User"}
              inputs={[
                { name: "Name", type: "text" },
                { name: "Cash", type: "text" },
                { name: "Credit", type: "text" },
                { name: "PassportID", type: "text" },
              ]}
            />
          )}
          {users && (
            <UsersDisplay
              users={users}
              handleToggle={handleToggle}
              handleDelete={handleDelete}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
