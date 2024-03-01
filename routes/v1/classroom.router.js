const express = require("express");
const routes = express.Router();
const classRoomControlar = require("../../controller/classroom.controller");
const verifyToken = require("../../middelware/verifyToken");
const authorization = require("../../middelware/authorization");

routes
  .route("/")
  .get(classRoomControlar.getAllClass)
  .post(
    verifyToken,
    authorization.rolebase("admin"),
    classRoomControlar.postClass
  );

routes
  .route("/:id")
  .get(
    classRoomControlar.getOneClass
  )
  .put(verifyToken, classRoomControlar.updateOneClass)
  .delete(
    verifyToken,
    authorization.rolebase("admin"),
    classRoomControlar.deleteRoom
  );

module.exports = routes;
