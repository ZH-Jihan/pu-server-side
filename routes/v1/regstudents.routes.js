const express = require("express");

const viewCount = require("../../middelware/viewCount");
const limiter = require("../../middelware/limiter");
const regStudentController = require("../../controller/regStudent.controller");
const routes = express.Router();

routes
  .route("/")
  .get(viewCount,limiter ,regStudentController.getAllRegStudent)
  .post();


module.exports = routes;