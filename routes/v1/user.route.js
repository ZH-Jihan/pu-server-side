const express = require("express");
const userController = require("../../controller/user.controller");
const verifyToken = require("../../middelware/verifyToken");
const authorization = require("../../middelware/authorization");
const router = express.Router();

router.get("/", userController.getAllUser);

router.post(
  "/singup",
  // verifyToken,
  // authorization.rolebase("admin"),
  userController.singup
);

router.post("/login", userController.login);

router.get("/me", verifyToken, userController.getMe);

router.post("/logout", verifyToken, userController.logOutUSer);
router.post(
  "/changepassword",
  verifyToken,
  userController.changeCurrentPassword
);

module.exports = router;
