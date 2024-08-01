const express = require("express");
const verifyToken = require("../../middelware/verifyToken");
const memberControler = require("../../controller/hostelmember.controller");
const authorization = require("../../middelware/authorization");
const routes = express.Router();
const upload = require("../../middelware/multer")

routes
  .route("/")
  .get(
    verifyToken,
    memberControler.getAllMember
  )
  .post(
    verifyToken,
    upload.single("avatar"),
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
    upload.fields([
      {
          name: "avatar",
          maxCount: 1
      }
  ]),
    authorization.rolebase("admin", "editor"),
    memberControler.editMember
  )
  .delete(
    verifyToken,
    authorization.rolebase("admin", "editor"),
    memberControler.delete
  )

module.exports = routes;
