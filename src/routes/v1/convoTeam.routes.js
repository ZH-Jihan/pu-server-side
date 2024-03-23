const express = require("express");
const routes = express.Router();
const verifyToken = require("../../middelware/verifyToken");
const authorization = require("../../middelware/authorization");
const { postTeamData, getAllTeam } = require("../../controller/convoTeam.controller");

routes
  .route("/")
  .get(verifyToken,getAllTeam)
  .post(
    verifyToken, 
    authorization.rolebase("admin", "editor"), 
    postTeamData
    );

module.exports = routes
