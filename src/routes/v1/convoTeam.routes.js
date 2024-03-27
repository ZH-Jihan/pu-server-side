const express = require("express");
const routes = express.Router();
const verifyToken = require("../../middelware/verifyToken");
const authorization = require("../../middelware/authorization");
const { postTeamData, getAllTeam, getOneTeam } = require("../../controller/convoTeam.controller");

routes
  .route("/")
  .get(verifyToken,getAllTeam)
  .post(
    verifyToken, 
    authorization.rolebase("admin", "editor"), 
    postTeamData
    );

routes
.route("/:id")
.get(verifyToken,getOneTeam)

module.exports = routes
