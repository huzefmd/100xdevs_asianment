const express = require ("express")
const router =express.Router()
const jwt =require("jsonwebtoken")
const {authenticationjwt,SECRET} =require("../midleware/user")
const {User} =require("../db")


router.post('/signup',async(req,res)=>{
    const {username,password}=req.body;
    try {
        const user=await User.findOne({username});
        if(user){
            return res.status(403).json({message:"user alredy exists"})
        }
        const newUser= new User({username,password})
        await newUser.save();
        const token=jwt.sign({userId:newUser._id},SECRET,{expiresIn:'1h'})
        res.json({message:"user created succesfully",token})
        
    } catch (error) {
        res.status(500).json({
            message:"error creating User",error
        })
    }
})

router.post('/signin',async(req,res)=>{
    const {username,password}=req.body;
    try {
        const user=await User.findOne({username});
        if(user){
            const token=jwt.sign({userId:newUser._id},SECRET,{expiresIn:'1h'})
            
            res.json({message:"user created succesfully",token})
        }
        else{
            res.status(403).json({message:"invalid username and passwor"})
        }        
    } catch (error) {
        res.status(500).json({
            message:"error creating User",error
        })
    }
});


module.exports= router