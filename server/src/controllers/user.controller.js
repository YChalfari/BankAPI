const {
  addUser,
  transfer,
  withdraw,
  getUser,
  getUsers,
  setCredit,
  depositToUser,
  deleteUser,
} = require("../services/user.services");

exports.getUsers = async (req, res) => {
  //validate params and queries
  console.log("in controller");
  let query = req.query || {};
  try {
    const users = await getUsers(query);
    return res.status(200).send({ results: users });
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const addedUser = await addUser(req.body);
    return res.status(201).send({ results: addedUser });
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    return res.status(200).send({ results: user });
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
};

exports.delete = async (req, res) => {
  try {
    deleteUser(req.params.id);
  } catch (e) {
    res.status(404).send({ message: e.message });
  }
};

exports.deposit = async (req, res) => {
  //check req.body
  console.log(req.body, req.params);
  try {
    if (req.body.amount < 0) throw Error("deposit amount cannot be negative");
    const depositResults = await depositToUser(req.params.id, req.body.amount);
    res.status(200).send({ results: depositResults });
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
};

exports.setCredit = async (req, res) => {
  try {
    if (req.body.amount < 0) throw Error("credit amount cannot be negative");
    const creditResults = await setCredit(req.params.id, req.body.amount);
    res.status(200).send({ results: creditResults });
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
};
exports.withdraw = async (req, res) => {
  try {
    if (req.body.amount < 0) throw Error("withdraw amount cannot be negative");
    const withdrawResults = await withdraw(req.params.id, req.body.amount);
    res.status(200).send({ results: withdrawResults });
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
};
exports.transfer = async (req, res) => {
  try {
    console.log("transfer controller");
    if (req.body.amount < 0) throw Error("withdraw amount cannot be negative");
    const transferResults = await transfer(
      req.params.id,
      req.body.recipientID,
      req.body.amount
    );
    res.status(200).send({ results: transferResults });
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
};
