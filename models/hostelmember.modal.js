const mongoose = require("mongoose");

const hostelmemberScema = mongoose.Schema({
    id:{
        type: String,
        required: [true,"Plese Input Id"],
        unique: true,
    },
    name:{
        type : String,
        default: "Not Found"
    },
    joinDate:{
        type:String,
        required:[true,"Please Select Date"]

    },
    number:{
        type:String,

    },
    flate:String,
    room:String,
    bad:String,
    department:String,
    batch:String,
    semester:String,

});

const HostelMember = mongoose.model("HostelMember",hostelmemberScema);

module.exports = HostelMember;