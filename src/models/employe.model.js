const mongoose = require("mongoose");

const employeeScema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter Name"]
    },
    id:{
        type:String,
        required:[true, "Please ENter Id"],
        unique:true
    },
    designation:{
        type:String,
        required:[true, "Please ENter Designation"],
    },
    department:{
        type:String,
    },
    imgurl:{
        type:String
    },
    number:{
        type:String,
        required: [true, "Please ENter Number"],
    },
    extntion:{
        type:String,
    },
    cetagory:{
        type:String,
        required: [true, "Please ENter Category"],
    }
})

const Employee = mongoose.model("Employee",employeeScema);

module.exports = Employee;