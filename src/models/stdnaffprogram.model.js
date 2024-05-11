const mongoose = require('mongoose');

const stdnaffprogramScema = mongoose.Schema({
    programName: {
        type:String,
        unique:true,
        required:true
    },
    date: String,
    roomNumber: String,
    trainerName: String,
    present:String,
    costing:String,
    createby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
      },
      deleteby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
      },
      updateby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
      }
},
{
    timestamps:true,
  }
)

const Stdnaffprogram = mongoose.model("Stdnaffprogram", stdnaffprogramScema)

module.exports = Stdnaffprogram;