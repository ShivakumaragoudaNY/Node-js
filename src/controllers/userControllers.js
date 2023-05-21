const express = require("express");
const { verifyToken } = require("../middleWares");
const {
  addUser,
  getuser,
  updateUser,
  getExistingUser,
} = require("../models/userModels");
const router = express.Router();

const addUserdata = (req, res, next) => {
  addUser(req)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};
const getUsersData = (req, res, next) => {
  getuser()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};
const updateUserdata = (req, res, next) => {
  updateUser(true, req)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};
const getExistingUserData = (req, res, next) => {
  getExistingUser(req)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};
router.post("/signup", addUserdata);
router.get("/getusers", getUsersData);
router.patch("/updateUser", verifyToken, updateUserdata);
router.get("/login", getExistingUserData);
module.exports = router;
