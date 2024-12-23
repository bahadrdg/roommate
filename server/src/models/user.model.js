const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name :{type:String, trim:true, required:true},
    lastname :{type:String, trim:true, required:true},
    email :{type:String, trim:true, required:true},
    password :{type:String, trim:true, required:true},
    phone :{type:String, trim:true, required:true},
    address :{type:String},
    image:{type:String, default:"https://cdn-icons-png.flaticon.com/512/6596/6596121.png"},
    date :{type:Date, default:Date.now},
    status :{type:Boolean, default:true},

})

const User = mongoose.model("User", userSchema);
module.exports = User;