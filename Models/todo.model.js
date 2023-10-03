const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
    userId:{type:String , required:true},
    user:{type:String , required:true},
    title:{type:String , required:true},
    description:{type:String , required:true},
    completed:{type:Boolean , default:false}
}, {
    timestamps: true,
    versionKey: false,
})

const todoModel = mongoose.model("Todo" , todoSchema)

module.exports = {todoModel}