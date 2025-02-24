const express=require("express")
const cors =require('cors')
const todoRouter=require("./routes/todo")
const userRouter=require("./routes/user")
const {Connection}=require("./db")
require('dotenv').config()
const app=express()
app.use(cors)
app.use(express.json)
app.use('/todo',todoRouter)
app.use('/user',userRouter)
Connection().then(()=>{
    const PORT =process.env.PORT||3000
    app.listen(PORT,()=>{console.log(`server is running on port ${PORT}`)})
});