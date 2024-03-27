const ConvocationTeam = require("../models/convocationTeam.model")


module.exports.postTeamData = async (req,res) =>{
  const data = req.body
  
  try {
    const team = await ConvocationTeam.create({...data,createby:req.user.id})
    res.send(team)
  } catch (error) {
    res.send(error)
  }
}

module.exports.getAllTeam = async (req,res) =>{
  try {
    const team = await ConvocationTeam.find({})
    res.send(team)
  } catch (error) {
    res.send(error)
  }
}

module.exports.getOneTeam = async (req,res) =>{
  const {id} = req.params;
  try {
    const team = await ConvocationTeam.findOne({_id : id});
    res.send(team)
  } catch (error) {
    res.send(error)
  }
}