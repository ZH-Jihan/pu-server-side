const { signupService, findUserByEmail } = require("../services/user.service");
const { generateToken } = require("../utils/token");
const User = require("../models/user.model");

module.exports.getAllUser = async (req, res, next) => {
  const allUser = await User.find({});
  res.status(200).json({
    status: "Success",
    data: allUser,
  });
};

module.exports.singup = async (req, res) => {
  const newUser = req.body;
  try {
    const user = await User.create({ ...newUser, createby: req.user.id });
    
    res.status(200).json({
      status: "Success",
      message: "Successfully SingUp",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

/**
 * 1. Check if email and password are given
 * 2. Load user with email
 * 3. If not user sent res
 * 4. Compare password
 * 5. If password not correct send res
 * 6. Check if user is active
 * 7. If not active send res
 * 8. Generate token
 * 9. Send user and token
 */

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        error: "Please provide your credentials",
      });
    }

    //..Find User In Database with email..//
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        status: "fail",
        error: "No user found. Please create an account",
      });
    }

    //...User Password hash and database password hash compare ../
    const isPasswordValid = user.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        status: "fail",
        error: "Password is not correct",
      });
    }

    if (user.status != "active") {
      return res.status(401).json({
        status: "fail",
        error: "Your account is not active",
      });
    }
    //..Generate JWT Access Token .../
    const token = generateToken(user);

    res.status(200).json({
      status: "Success",
      message: "Successfully LogedIn",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

//....
//..... When User Get His Personal Info .....//

module.exports.getMe = async (req, res) => {
  try {
    const user = await findUserByEmail(req.user?.email);
    const { password: pwd, demo: pd, ...others } = user.toObject();
    res.status(200).json({
      status: "Success",
      data: others,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

module.exports.getUserById = async (req, res) => {
  const { id } = req.params;
 
  try {
    const user = await User.find({ _id: id });
    
    const { password: pwd, demo: pWd, ...others } = user[0].toObject();
    res.status(200).json({
      status: "Success",
      data: others,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

module.exports.updateUserByAdmin = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      { _id: id },
      { ...updateData, updateby: req.user?.id },
      { new: true }
    );
    const { password: pwd, demo: pWd, ...others } = user.toObject();

    res.status(200).json({
      status: "Successfully Update User"
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

module.exports.logOutUSer = async (req, res) => {
  const user = await findUserByEmail(req.user?.email);

  if (user) {
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    };

    return res
      .status(200)
      .clearCookie("accesToken", options)
      .clearCookie("userInfo", options)
      .json({ status: "logOut Success" });
  }
};

module.exports.changeCurrentPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?.id);
   
    const isPasswordValid = user.comparePassword(oldPassword, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        status: "fail",
        error: "Ole Password is not correct",
      });
    }

    user.password = newPassword;
    user.passwordChangeAt = new Date();
    await user.save({ validateBeforeSave: false });

    return res.status(200).json({
      status: "Password Successfully Changed",
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};
