const { builtinModules } = require("module");
// const { withdraw } = require("../controllers/user.controller");
const User = require("../models/user.model");

const getUsers = async function (query) {
  try {
    const users = await User.find(query);
    return users;
  } catch (e) {
    throw Error(e.message);
  }
};

const addUser = async function (body) {
  try {
    const user = new User(body);
    console.log(user);
    const addedUser = await user.save();
    return addedUser;
  } catch (e) {
    throw Error(e.message);
  }
};

const updateUser = async function (body) {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { passportID: body.passportID },
      body,
      { new: true, runValidators: true }
    );
    return updatedUser;
  } catch (e) {
    throw Error(e.message);
  }
};
const deleteUser = async function (id) {
  try {
    const res = await User.remove({ passportID: id });
    return res;
  } catch (e) {
    throw Error(e.message);
  }
};
const getUser = async function (id) {
  console.log(id);
  try {
    const user = await User.findOne({ passportID: id });
    if (!user) {
      throw Error("User not found");
    }
    return user;
  } catch (e) {
    throw Error("Can't find user with that passport id");
  }
};
const depositToUser = async function (id, amount) {
  try {
    const depositResults = await User.findOneAndUpdate(
      { passportID: id },
      { $inc: { cash: amount } },
      { new: true }
    );
    return depositResults;
  } catch (e) {
    return { message: e };
  }
};
const setCredit = async function (id, amount) {
  try {
    const creditResults = await User.findOneAndUpdate(
      { passportID: id },
      { credit: amount },
      { new: true }
    );
    return creditResults;
  } catch (e) {
    return { message: e };
  }
};

const withdraw = async function (id, amount) {
  try {
    const user = await getUser(id);
    if (amount > user.cash + user.credit) {
      //controller  is not catching this error
      throw Error("Not enough funds");
    }
    user.cash -= amount;
    const withdrawResults = await user.save();
    return withdrawResults;
  } catch (e) {
    throw Error("Not enough funds");
  }
};

const transfer = async function (id, recipientID, amount) {
  try {
    const user = await getUser(id);
    console.log(user);
    const recipient = await getUser(recipientID);

    if (user && recipient) {
      const withdrawResults = await withdraw(id, amount);
      const depositResults = await depositToUser(recipientID, amount);
      return { withdrawResults, depositResults };
    }
  } catch (e) {
    throw Error(e.message);
  }
};

module.exports = {
  addUser,
  transfer,
  withdraw,
  getUser,
  getUsers,
  setCredit,
  depositToUser,
  deleteUser,
  updateUser,
};
