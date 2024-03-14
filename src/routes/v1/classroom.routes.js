const express = require("express");
const routes = express.Router();
const classRoomControlar = require("../../controller/classroom.controller");
const verifyToken = require("../../middelware/verifyToken");
const authorization = require("../../middelware/authorization");

routes
  .route("/")
  .get(verifyToken, classRoomControlar.getAllClass)
  .post(
    verifyToken,
    authorization.rolebase("admin", "editor"),
    classRoomControlar.postClass
  );

routes
  .route("/:id")
  .get(verifyToken,classRoomControlar.getOneClass)
  .put(
    verifyToken,
    authorization.rolebase("admin", "editor"),
    classRoomControlar.updateOneClass
  )
  .delete(
    verifyToken,
    authorization.rolebase("admin"),
    classRoomControlar.deleteRoom
  );

module.exports = routes;
