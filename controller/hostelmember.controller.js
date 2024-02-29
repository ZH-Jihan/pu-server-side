const HostelMember = require("../models/hostelmember.modal")

module.exports.getAllMember = async (req,res,next) =>{
    try{
        const allMember = await  HostelMember.find({}).sort({flate:1,room:1,bad:1})
        res.send(allMember)
      }
      catch (error) {
        
        res.status(500).send(error);
      }
}

module.exports.getOneMember = async (req,res,next) =>{
  const {id} = req.params;
    try{
        const oneMember = await  HostelMember.find({_id : id})
        res.send(oneMember)
      }
      catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
}

module.exports.postMember = async (req,res,next) =>{
    const member = req.body;
    try{
        const newMember = new HostelMember(member)
        await newMember.save()
        res.send(newMember)
      }
      catch (error) {
        res.send(error);
      }
}

module.exports.editMember = async (req,res,next) =>{
    const member = req.body;
    const {id} = req.params;
    try{
        const editmember = await  HostelMember.findByIdAndUpdate( id,member,{new:true})

        res.send(editmember)
      }
      catch (error) {
        res.send(error);
      }
}