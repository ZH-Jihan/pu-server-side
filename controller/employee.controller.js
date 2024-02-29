const Employee = require("../models/employe.model");

module.exports.getAllEmployee = async (req, res, next) => {
  
    const employee = await Employee.find({}).sort({cetagory:1,name:1});
    res.status(200).json({
        status : "Success",
        data: employee
    });
};

module.exports.getOneEmployee = async (req, res, next) => {
  const {id} = req.params;
    const employee = await Employee.find({_id:id});
    res.status(200).json({
        status : "Success",
        data: employee
    });
};

module.exports.postEmployee = async (req, res, next) => {
    const newEmployee = req.body;
  try {
    const employee = new Employee(newEmployee);
    await employee.save();
    res.send(employee);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

module.exports.updateEmployee = async (req, res, next) => {
    const {id} = req.params;
    const data = req.body;
  try {
    const employee = await Employee.findByIdAndUpdate(id,data,{ new: true });
    res.send(employee);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

module.exports.deleteEmployee = async(req,res,next)=>{
    const {id} = req.params;
    const employe = await Employee.findByIdAndDelete(id);
    res.send(employe);
}
