const express = require("express");

const viewCount = require("../../middelware/viewCount");
const verifyToken = require("../../middelware/verifyToken");
const authorization = require("../../middelware/authorization");
const stdnaffprogramController = require("../../controller/stndaffprogram.controller.js");
const routes = express.Router();

routes
  .route("/")
  .get(verifyToken,stdnaffprogramController.getAll)
  .post(verifyToken,authorization.rolebase("admin", "editor"),stdnaffprogramController.addProgramData);


module.exports = routes;