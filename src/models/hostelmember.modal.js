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
    localguardian:{
        type:String,
        default: "Not Entry"
    },
    localguardiannumber:{
        type:String,
        default: "Not Entry"
    },
    father:{
        type:String,
        default: "Not Entry"
    },
    fathernumber:{
        type:String,
        default: "Not Entry"
    },
    mother:{
        type:String,
        default: "Not Entry"
    },
    mothernumber:{
        type:String,
        default: "Not Entry"
    },
    avatar: {
        type: {
            public_id: String,
            url: String //cloudinary url
        }
    },
    department:String,
    batch:String,
    semester:String,
    createby:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    isDeleted: { type: Boolean, default: false },
    deleteby:{
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