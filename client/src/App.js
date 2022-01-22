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
  console.log(URI);
  const [users, setUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isTransfering, setIsTransfering] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [message, setMessage] = useState("");

  const handleCreate = async (user) => {
    const newUser = {
      name: user.name,
      cash: user.cash,
      credit: user.credit,
      passportID: user.passportid,
    };
    console.log(newUser);
    const res = await axios.post(`${URI}/users`, newUser);
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
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${URI}/delete/${id}`);
      const data = await axios.get(`${URI}/users`);
      setUsers(data.data.results);
      setMessage("User deleted successfully");
    } catch (e) {
      setMessage(e.message);
    }
  };
  return (
    <div>
      <h2 className="app-title">Hello Bank Manager</h2>
      <button
        onClick={async () => {
          const users = await axios.get(`${URI}/users`);
          setUsers(users.data.results);
        }}
      >
        Get all Users
      </button>
      <button
        onClick={() => {
          setIsCreating(!isCreating);
        }}
      >
        Add a user
      </button>
      {message.length > 0 && <h3 className="message">{message}</h3>}
      <UserContext.Provider
        value={{
          setIsLoading,
          setIsCreating,
          setIsUpdating,
        }}
      >
        {users && (
          <UsersDisplay
            users={users}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
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
        {isUpdating && (
          <Form
            text={"Update User"}
            inputs={[
              { name: "Name", type: "text" },
              { name: "Cash", type: "text" },
              { name: "Credit", type: "text" },
              { name: "PassportID", type: "text" },
            ]}
          />
        )}
      </UserContext.Provider>
    </div>
  );
};

export default App;
