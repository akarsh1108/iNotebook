const jwt = require('jsonwebtoken');
const JWT_Secret = "Akarshisagoodboy";
const fetchuser =(req,res,next)=>{
   //Get the user from the jwt token and add id to req object
   const token = req.header('auth-token');
   if(!token){
       res.status(401).send({error:"Please authenticate usind a valid token"})
   }
  

   try{
       const data=jwt.verify(token,JWT_Secret);
       req.user=data.user;
   }catch(error){
    res.status(401).send({error:"Please authenticate usind a valid token"})
   }
   next();
}

module.exports=fetchuser;