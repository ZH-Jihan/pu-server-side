const express = require("express");
const userController = require("../../controller/user.controller");
const verifyToken = require("../../middelware/verifyToken");
const authorization = require("../../middelware/authorization");
const routers = express.Router();

routers.route("/").get(userController.getAllUser);

routers
  .route("/singup")
  .post(verifyToken, authorization.rolebase("admin"), userController.singup);

routers.route("/login").post(userController.login);

routers.route("/current").get(verifyToken, userController.getMe);

routers
  .route("/:id")
  .get(userController.getUserById)
  .put(
    verifyToken,
    authorization.rolebase("admin"),
    userController.updateUserByAdmin
  );

routers.route("/logout").post(userController.logOutUSer);

routers
  .route("/changepassword")
  .post(verifyToken, userController.changeCurrentPassword);

module.exports = routers;
