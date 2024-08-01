const { default: mongoose } = require("mongoose");


const alumniScema = mongoose.Schema({
country:String,
name:String,
department:String,
session:String,
idNo: String,
about:String
})

const Alumni = mongoose.model("Alumni",alumniScema)

module.exports = Alumni;