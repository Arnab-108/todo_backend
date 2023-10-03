const mongoose = require("mongoose")

const authSchema = mongoose.Schema({
    name:{type:String , require:true},
    email:{type:String , require:true},
    password:{type:String ,  required:true},
    age:{type:Number}
},{
    versionKey:false
})

const authModel = mongoose.model("auth" , authSchema)

module.exports = {authModel}