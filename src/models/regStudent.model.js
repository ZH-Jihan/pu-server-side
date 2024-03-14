const  mongoose= require("mongoose");

const regStudentScema = mongoose.Schema({
name: String,
ar: String,
status :String,
programCode :String,
contactNum :String,
semCode :String,
semesterName :String,
description:String,
address :String
})

const RegStudentList = mongoose.model('RegStudentList', regStudentScema)

module.exports = RegStudentList;