const Alumni = require("../models/alumni.model");

module.exports.getAllAlumni = async (req, res, next) => {
  
    try {
      const allAlumni = await Alumni.find({});
      res.send(allAlumni);
    } catch (error) {
      res.status(500).send(error);
    }
  };
module.exports.addAllumni = async (req, res, next) => {
  const alumni = req.body;
  try {
    const newalumni = await Alumni.create(alumni);
    res.status(200).json({
      status: "Successfully created classroom ",
      alumni:newalumni
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
  };