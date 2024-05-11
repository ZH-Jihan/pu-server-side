const Stdnaffprogram = require("../models/stdnaffprogram.model");


module.exports.addProgramData = async(req,res,next) => {
    const data = req.body
    try {
        const programData = await Stdnaffprogram.create(data);
        res.status(200).json({
            status: "Successfully created  ",
            programData
          });
    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports.getAll = async(req,res,next) => {
    
    try {
        const programData = await Stdnaffprogram.find({});
        res.status(200).json({
            status: "Successfully load data ",
            programData
          });
    } catch (error) {
        res.status(500).send(error);
    }
}