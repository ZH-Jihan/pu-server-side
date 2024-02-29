const Routin = require("../models/routine.model");


module.exports.getAllRoutin = async (req, res, next) => {
  const allRoutin = await Routin.find({});
  res.status(200).json({
    status: "Success",
    data: allRoutin,
  });
};
module.exports.postARoutin = (req, res, next) => {
  console.log(req.body);
};