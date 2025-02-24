const express = require('express')
const router=express.Router()
const{Todo}=require("../db")
const {authenticationjwt}=require('../midleware/user')


router.use(authenticationjwt)
 router.post("/",async(req,res)=>{
    const createPayload=req.body;
    console.log(req.userId)
    if(!createPayload.title){
        return res.status(400).json({msg:"you sent the wrong inputs"})
    }
    try {
        const newTodo=await Todo.create({
            title:createPayload.title,
            completed:false,
            userId:req.userId
        });
        res.status(201).json({msg:"todo created",todo:newTodo})
    } catch (error) {
        res.status(500).json({msg:"eror creating todo",error:error.message})
        
    }
 });


 router.get('/',async(req,res)=>{
    try {
        const todos= await Todo.find({userId :req.userId})
        res.json({
            todos:todos
        })

    } catch (error) {
        res.status(500).json({msg:"error fetching  todos",error:error.message})   
    }
 });

router.put('/:id', async(req,res)=>{
    const {id}= req.params
    const updatePayload=req.body
    if(typeof updatePayload .completed==="undefined"){
        return res.status(400).json({msg:"you must provided complete status"})
    }
    try {
        const result= await Todo.updateOne(
            {_id:id},
            {completed:updatePayload.completed}
        );
        res.json({
            msg:"todo marked as completed"
        });
    } catch (error) {
        res.status(500).json({msg:"error updating todo",error:error.message})
        
    }
});


module.exports=router