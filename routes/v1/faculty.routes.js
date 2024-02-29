const express = require("express");
const facultyController = require("../../controller/faculty.controller");
const viewCount = require("../../middelware/viewCount");
const limiter = require("../../middelware/limiter");
const verifyToken = require("../../middelware/verifyToken");
const authorization = require("../../middelware/authorization");
const routes = express.Router();

routes
  .route("/")
  .get(facultyController.getAllFaculty)
  .post(verifyToken,authorization.rolebase("admin"),facultyController.postAFaculty);
routes
  .route("/:id")
  .get(viewCount,limiter ,verifyToken,facultyController.getOneFaculty)
  .put(verifyToken,authorization.rolebase("admin"),facultyController.updateOneFaculty)
  .delete(verifyToken,authorization.rolebase("admin"),facultyController.deleteOneFaculty)


module.exports = routes; 