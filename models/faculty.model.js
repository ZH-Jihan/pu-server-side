const mongoose = require("mongoose");

const facultyScema = mongoose.Schema({
  imgurl: String,
  name: {
    type: String,
    required: [true, "Please Input Your name"],
  },
  initialname: {
    type: String,
    required: [true, "Please Input Your Initial Name"],
    unique: true
  },
  id: {
    type: String,
    required: [true, "Please Input Your ID"],
    unique: true
  },
  pnumber: {
    type: String,
    required:[true, "Please Input Phone Number"]
  },
  email: {
    type: String,
    default: ""
  },
  roomnumber: {
    type: String,
    
  },
  designation: {
    type:String,
    default: "Lecturer"
  },
  dipartment: {
    type:String,
    default:"Reg"
  },
  description: String,
  university: String,
  doj: String,
  dob: String,
  maritstatus: String,
  jobtype: String,
  status: {
    type:String,
    default: "Active"
  },
  sex: String,
});

const Faculty = mongoose.model("Faculty", facultyScema);

module.exports = Faculty;
