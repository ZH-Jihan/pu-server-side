const { default: mongoose } = require("mongoose");


const convocationTeamSchema = mongoose.Schema({
    teamName :String,
    teamLeader : String,
    teamSecretary : String,
    teamMember:{
        type:Array
    },
    createby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
      },
},
{
    timestamps:true
})

const ConvocationTeam = mongoose.model("ConvocationTeam",convocationTeamSchema)

module.exports = ConvocationTeam;