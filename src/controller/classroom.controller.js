const ClassRoom = require("../models/classroom.model");

module.exports.getAllClass = async (req, res, next) => {
  const classRoom = await ClassRoom.find({}).sort({roomnum:1});
  res.status(200).json({
    status: "Success",
    data: classRoom,
  });
};

module.exports.getOneClass = async (req, res, next) => {
  const {id} = req.params;
  const classRoom = await ClassRoom.find({_id:id});
  res.status(200).json({
    status: "Success",
    data: classRoom,
  });
};

module.exports.updateOneClass = async (req, res, next) => {
  const {id} = req.params;
  const data = req.body;
  try{
    const classRoom = await ClassRoom.findByIdAndUpdate(id, data, { new: true });
    res.send(classRoom)
  }
  catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

module.exports.deleteRoom = async (req, res, next) => {
  const {id} = req.params;
  try{
    const classRoom = await ClassRoom.findByIdAndDelete(id);
    res.send(classRoom)
  }
  catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

module.exports.postClass = async (req, res, next) => {
  const classroom = req.body;
  try {
    const classRoom = new ClassRoom(classroom);
    await classRoom.save();
    res.send(classRoom)
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
