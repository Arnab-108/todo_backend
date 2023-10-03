const express = require("express")
const {authModel} = require("../Models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const authRouter = express.Router()

authRouter.post("/signup",async(req,res)=>{
    const {name,email,password,age} = req.body
    const user1 = await authModel.findOne({email:email})

    if(user1){
        res.status(200).send({msg:"User already exists! Please login!"})
    }
    else{
        try {
            bcrypt.hash(password , 5 ,async(err,hash)=>{
                const data = authModel({name,email,password:hash,age})
                data.save()
                res.status(200).send({msg:"A new User is Added" , user:req.body})
            })
        } catch (error) {
            res.send(404).send({err:error})
        }
    }
})

authRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await authModel.findOne({email:email})
        // console.log(user.password)
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    let token = jwt.sign({user_Id:user._id , user: user.name},"todo",{
                        expiresIn:"7d"
                    })
                    console.log(token)
                    res.status(200).send({success:true , msg:"Login Successfull!" , token:token , user:user})
                }
                else{
                    res.status(400).send({err:"Provide the correct password!"})
                }
            })
        }
        else{
            res.status(400).send({msg:"Please provide an emailId and password!"})
        }
    } catch (error) {
        res.status(400).send({err:error})
    }
})

module.exports={authRouter}