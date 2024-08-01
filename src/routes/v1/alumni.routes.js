const express = require("express");
const routes = express.Router();
const alumniControlar = require("../../controller/alumni.controller.js");
const verifyToken = require("../../middelware/verifyToken");
const authorization = require("../../middelware/authorization");

routes
  .route("/")
  .get(verifyToken, alumniControlar.getAllAlumni)
  .post(
    verifyToken,
    authorization.rolebase("admin", "editor"),
    alumniControlar.addAllumni
  );

module.exports = routes;