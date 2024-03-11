const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs')


const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,
            required:[true,"Name is required"],
        },
        email:{
            type:String,
            validate:[validator.isEmail, "Provide valid Email"],
            trim:true,
            lowercase:true,
            unique:true,
            required:[true,"Email address is required"],
        },
        password:{
            type:String,
            required: [true,"Password is required"],
            // validate:{
            //     validator:(value)=>
            //     validator.isStrongPassword(value,{
            //         minLength : 6,
            //         // minLowercase:3,
            //         // minNumber:1,
            //         // minUppercase:1,
            //         // minSymbols:1,
            //     }),
            //     message: "Password {VALUE} is not strong enough",
            // },
        },
        demo: String,
        confirmPassword:{
            type: String,
            required:[true,"Please confirm your password"],
            // validate:{
            //     validator:function(value){
            //         return value === this.password;
            //     },
            //     massage:"Passwords don't match!",
            // },
        },
        role:{
            type: String,
            enum:["user","management","editor","admin"],
            default:"user",
        },
        status:{
            type:String,
            default:"active",
            enum:["active","inactive","blocked"],
        },
        permission:{
            type: Array,
            required:[true, "Please Provied permission for this user"],
        },
        createby:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        // updateby:{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref:"User"
        // },
        passwordChangeAt: Date,
    },
    {
        timestamps:true,
    }
);

userSchema.pre("save",function(next){
    const password = this.password;
    const hashPassword = bcrypt.hashSync(password);
    
    this.password = hashPassword;
    this.confirmPassword = undefined;
    next();
});

userSchema.methods.comparePassword = function (password,hash) {
    const isPasswordValid = bcrypt.compareSync(password,hash);
    return isPasswordValid
}
const User = mongoose.model("User",userSchema);

module.exports = User;