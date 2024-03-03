const express = require("express");
const verifyToken = require("../../middelware/verifyToken");
const memberControler = require("../../controller/hostelmember.controller");
const authorization = require("../../middelware/authorization");
const routes = express.Router();

routes
  .route("/")
  .get(
    verifyToken,
    memberControler.getAllMember
  )
  .post(
    verifyToken,
    authorization.rolebase("admin", "editor"),
    memberControler.postMember
  );

routes
  .route("/:id")
  .get(
    verifyToken,
    memberControler.getOneMember
  )
  .put(
    verifyToken,
    authorization.rolebase("admin", "editor"),
    memberControler.editMember
  );

module.exports = routes;
