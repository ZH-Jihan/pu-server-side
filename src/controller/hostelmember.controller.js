const HostelMember = require("../models/hostelmember.modal");
const { uploadOnCloudinary, deleteOnCloudinary } = require("../utils/cloudinary");

module.exports.getAllMember = async (req, res, next) => {
  try {
    const allMember = await HostelMember.find({}).sort({
      flate: 1,
      room: 1,
      bad: 1,
    });
    res.send(allMember);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.getOneMember = async (req, res, next) => {
  const { id } = req.params;
  try {
    const oneMember = await HostelMember.find({ _id: id });
    res.status(200).json({
      status: "Success",
      data: oneMember,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

module.exports.postMember = async (req, res, next) => {
  
  
  const member = req.body;
  // console.log(member);
  // const avatarLocalPath = req.files
  // const avatar = await uploadOnCloudinary(avatarLocalPath).catch((error) =>
  //   console.log(error)
  // );
  try {
    const newMember = await HostelMember.create({
      ...member,
      createby: req.user.id,
      // avatar: {
      //   public_id: avatar.public_id,
      //   url: avatar.secure_url,
      // },
    });
    res.status(200).json({
      status: "Success",
      data: newMember,
    });
  } catch (error) {
    res.send(error);
  }
};

module.exports.editMember = async (req, res, next) => {
  const member = req.body;
  const { id } = req.params;
  // const avatarLocalPath = req.files?.avatar[0]?.path;
  // console.log(avatarLocalPath);
  // const avatar = await uploadOnCloudinary(avatarLocalPath)
  
  try {
    const user = await HostelMember.findById({_id:id}).select("avatar");
    // const avatarToDelete = user.avatar.public_id;
    const editmember = await HostelMember.findByIdAndUpdate(
      id,
      {
          $set:{
            ...member,
          //   avatar: {
          //     public_id: avatar.public_id,
          //     url: avatar.secure_url
          // },
          updateby:req.user.id
        }
      },
      { new: true }
    );
    // console.log(editmember );
    
  //   if (avatarToDelete && editmember.avatar.public_id) {
  //     await deleteOnCloudinary(avatarToDelete);
  // }

    res.status(200).json({
      status: "Successfully Update Member",
      data: editmember,
    });
  } catch (error) {
    res.send(error);
  }
};

module.exports.delete = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedDocument = await HostelMember.findByIdAndUpdate(
      id,
      { $set: { isDeleted: true, deleteby: req.user?.id } },
      { new: true }
    );

    if (!deletedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.json({
      message: "Document deleted successfully",
      deletedDocument,
    });
  } catch (error) {
    console.error("Error soft-deleting document", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.backmember = async (req,res) => {
  const { id } = req.params;
  try {
    const backMember = await HostelMember.findByIdAndUpdate(
      id,
      { $set: { isDeleted: false, updateby: req.user?.id } },
      { new: true }
    );
    res.json({
      message: "Document deleted successfully",
      backMember,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}