const express = require("express")
const {todoModel} = require("../Models/todo.model")
const {auth} = require("../Middleware/auth.middleware")
const todoRouter = express.Router()


todoRouter.use(auth)

todoRouter.post("/add", async(req,res)=>{
    try {
        const data = new todoModel(req.body)
        await data.save()
        res.status(200).send({msg:"New Todo Added!" , todo:data})
    } catch (error) {
        res.status(400).send({err:error})
    }
})

todoRouter.get("/" , async(req,res)=>{
    try {
        const todos = await todoModel.find({ userId: req.body.userId });
        res.status(200).send({ todos });
      } catch (error) {
        res.status(400).send({ error: error.message });
      }
})

todoRouter.get('/:id',async(req,res)=>{
    const {id}=req.params;
    try {
        const data=await todoModel.findOne({_id:id});
        res.send(data);
    } catch (error) {
        res.send({"msg":error.message});
    }
})

todoRouter.patch("/:id", async(req,res)=>{
    const {id} = req.params
    const user = await todoModel.findOne({_id:id})
    try {
        if(req.body.userId !== user.userId){
            res.status(400).send({err:"Something went wrong!"})
        }
        else{
            await todoModel.findByIdAndUpdate({_id:id},req.body)
            res.status(200).send({msg:`${id} is updated`})
        }
    } catch (error) {
        res.status(400).send({err:error})
    }
})

todoRouter.delete("/:id", async(req,res)=>{
    const {id} = req.params
    const user = await todoModel.findOne({_id:id})
    try {
        if(req.body.userId !== user.userId){
            res.status(400).send({err:"Something went wrong!"})
        }
        else{
            await todoModel.findByIdAndDelete({_id:id})
            res.status(200).send({msg:`${id} is deleted`})
        }
    } catch (error) {
        res.status(400).send({err:error})
    }
})

module.exports = {todoRouter}