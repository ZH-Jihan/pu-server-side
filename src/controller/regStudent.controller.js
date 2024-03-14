
const RegStudentList = require("../models/regStudent.model");

module.exports.getAllRegStudent = async (req, res, next) => {
  const allRegStudent = await RegStudentList.find({})
  res.status(200).json({
    status: "Success",
    data: allRegStudent,
  });
};
module.exports.postARegStudent = (req, res, next) => {
  res.send("faculty Add");
};