const Faculty = require("../models/faculty.model");

module.exports.getAllFaculty = async (req, res, next) => {
  const allFaculty = await Faculty.find({});
  res.send(allFaculty);
};
module.exports.getOneFaculty = async (req, res, next) => {
  const {id} = req.params;
  const oneFaculty = await Faculty.find({_id:id});
  res.status(200).json({
    status: "Success",
    data: oneFaculty,
  });
};

module.exports.updateOneFaculty = async (req, res, next) => {

  const {id} = req.params;
  const data = req.body;
  try {
    const faculty = await Faculty.findByIdAndUpdate(id, {...data,updateby:req.user.id}, { new: true });
    res.send(faculty);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

module.exports.postAFaculty = async (req, res, next) => {
  const newFaculty = req.body;
  try {
    const faculty =   await Faculty.create({...newFaculty,createby: req.user.id});
    res.send(faculty);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

module.exports.deleteOneFaculty = async (req, res, next) => {
  const {id} = req.params;
  try {
    const faculty = await Faculty.findByIdAndDelete(id)
    res.send(faculty);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
