const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");

router.get("/api/users/:id", UserController.getUser);
router.get("/api/users", UserController.getUsers);
router.post("/api/users", UserController.addUser);
router.patch("/api/deposit/:id", UserController.deposit);
router.patch("/api/update", UserController.updateUser);
router.patch("/api/credit/:id", UserController.setCredit);
router.patch("/api/withdraw/:id", UserController.withdraw);
router.patch("/api/transfer/:id", UserController.transfer);
router.delete("/api/delete/:id", UserController.delete);
module.exports = router;
