const moongose=require("moongose")
require("dotenv").config()


const Connection=async()=>{
    try {
        await moongose.connect(process.env.MONGO_URI)
        console.log('connection succesfull')
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

const schema=moongose.schema;
const objectid=moongose.objectid;

const username=new schema({
    username:String,
    password:String
});

const todoschema=new schema({
    userid:objectid,
    title:String,
    compleated:Boolean
})

const user=moongose.model('user',usename)
const todo=moongose.model('todo',todoschema)


module.exports={
    Connection,
    user,
    todo
}