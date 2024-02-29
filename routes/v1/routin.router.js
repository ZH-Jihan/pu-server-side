const express = require("express");
const routinControler = require("../../controller/routin.controller");
const routes = express.Router();

routes
  .route("/")
  .get(routinControler.getAllRoutin)
  .post(routinControler.postARoutin)

module.exports = routes;
