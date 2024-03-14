const mongoose = require("mongoose");

const classroomScema = mongoose.Schema({
  roomname: {
    type: String,
    default: "Class Room",
  },
  roomnum: {
    type: String,
    unique: true,
    required: [true, "Please Enter Room Num"]
  },
  roominitial: {
    type: String,
    default: "C_Room",
  },
  capacity : {
    type: String,
    required:[true,"Please enter room capacity"]
  }
});

const ClassRoom = mongoose.model("ClassRoom", classroomScema);

module.exports = ClassRoom;
