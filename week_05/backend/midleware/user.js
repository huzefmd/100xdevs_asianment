const jwt=reqire("jsonwebtoken")
const SECRET=process.env.SECRET||'secret000'

const authenticationjwt=(req,res,nxt)=>{
    const authHeaders=req.headers.authorization;
    if(authHeaders){
        const token=authHeaders.split(" ")[1];
        jwt.verify(token,SECRET,(err,user)=>{
            if(err){
                res.status(403).json({
                    message:
                    'forbiden :invalid token'
                })
            }
            req.use=user.userid
            nxt()   
        })
    }
    else{
        res.status(401).json({
            message:"unathorized : no token provided"
        })
    }
};
module.exports={
    authenticationjwt,
    SECRET
}