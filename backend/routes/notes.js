const express=require('express');
const router=express.Router();
const fetchuser=require('../middleware/fetchuser');
const Note =require('../models/Note')
const { body, validationResult } = require('express-validator');

//Route 1: Get all the Notes using : Get "/api/auth/fetchallnotes"
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try{
  const notes = await Note.find({user: req.user.id});
  res.json(notes);
    } catch (error){
        console.error(error.message);
        res.status[500].send("Internal Server Error ");
    }
})

//Route 2:Add a new node using Notes : Get "/api/auth/addnotes"
router.post('/addnote',fetchuser,[
    body('title','Enter a valid title').isLength({min : 3 }),
    body('description',"Enter a valid description").isLength({min : 3 }),
] , async (req,res)=>{
    try{
    const {title,description,tag}= req.body;
    //If there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
        title,description, tag, user:req.user.id
    })
    const savedNote = await note.save();
    res.json(savedNote);
}
 catch (error){
        console.error(error.message);
        res.status[500].send("Internal Server Error ");
    }
}
  
)

module.exports = router