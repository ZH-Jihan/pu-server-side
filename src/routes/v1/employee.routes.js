const express = require("express");
const routes = express.Router();
const verifyToken = require("../../middelware/verifyToken");
const authorization = require("../../middelware/authorization");
const EmployeeControler = require("../../controller/employee.controller");

routes
.route("/")
.get(verifyToken,EmployeeControler.getAllEmployee)
.post(verifyToken,authorization.rolebase("admin","editor"),EmployeeControler.postEmployee)

routes
.route("/:id")
.get(verifyToken,EmployeeControler.getOneEmployee)
.put(verifyToken,authorization.rolebase("admin","editor"),EmployeeControler.updateEmployee)
.delete(verifyToken,authorization.rolebase("admin"),EmployeeControler.deleteEmployee)

module.exports = routes;