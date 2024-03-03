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
    seat:String,
    department:String,
    batch:String,
    semester:String,
    createby:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    updateby:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},
{
    timestamps:true
}
);

const HostelMember = mongoose.model("HostelMember",hostelmemberScema);

module.exports = HostelMember;