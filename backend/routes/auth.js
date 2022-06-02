const express=require('express');
const router=express.Router();
const User =require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser');
const JWT_Secret = "Akarshisagoodboy";
// Route 1: Create a User using : Post "/api/auth/createuser".Doesn't require auth
router.post('/createuser',[
    body('email','Enter a valid name').isEmail(),
    body('name',"Enter a valid email").isLength({min : 3 }),
    body('password',"Password should be of atleast 5 characters").isLength({min : 5}),
],async (req,res)=>{
    let success = false;
    //If there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    

    try{
 // Check if an email exists already
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({success,error:"Sorry a user with this email already exists"})
    }

    const salt=await bcrypt.genSalt(10);
    const secPass= await bcrypt.hash(req.body.password, salt);
    //Create a new user
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
   const data ={
       user:{
           id:user.id,
       }
   }
     const authToken= jwt.sign(data,JWT_Secret);
     success= true;
    res.json({success,authToken})
  // res.json(user);
    }
    catch (error){
        console.error(error.message);
        res.status[500].send("Internal Server Error ");
    }
})

//Route 2: Authenticate the user using : POST "/api/auth/login" No login required
router.post('/login',[
    body('email','Enter a valid name').isEmail(),
    body('password','Password cannot  be blank').exists(),
],async (req,res)=>{
    let success = false;
    //If there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password}=req.body;
    try{
        let user=await User.findOne({email:email});
        if(!user){
            return res.status(400).json({error: "Please try to login with correct credentials"});  
        }
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            success=false;
            return res.status(400).json({success ,error: "Please try to login with correct credentials"});  
        }
        const data = {
           user :{
               id:user.id
           }
        }
        const authtoken = jwt.sign(data,JWT_Secret)
        success=true;
        res.json({success,authtoken})
    }
    catch(error){
        console.error(error.message);
        res.status[500].send("Internal Server Error ");
    }

})

//Route 3 : It gives details of the logged in user details using: Post "/api/auth/getuser" .Login required here we have to send jwt token here
router.post('/getuser',fetchuser,async (req,res)=>{
try {
    userId=req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user);
}
catch(error){
    console.error(error.message);
        res.status[500].send("Internal Server Error ");
}
})

module.exports = router