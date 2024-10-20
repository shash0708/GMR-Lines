const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const  bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const User = require('../Models/UserSchema');
const fetchuser = require('../middleware/fetchUser')





router.post('/login',async(req,res)=>{
      let success= false;
    
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
    
        const {AME,password} = req.body;

    try{
        let user = await User.findOne({AME});
        if(!user){
            success= false;
    
            return res.status(400).json({error:"Please try login with correct credentials"})
        }
    
        const passwordCompare =await  bcrypt.compare(password,user.password);
        if(!passwordCompare){
            success= false;
            return res.status(400).json({success,error:'Please try login with correct credentials'})
        }
    
        const data = {
            user:{
                id:user.id,
        
            }
        }
    
    const authtoken = jwt.sign(data,process.env.JWT_SECRET);
    success= true;
    
    res.json({ success, authtoken })
    }catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error occured")
    }
    
    });
    
    router.get('/getuser', fetchuser, async (req, res) => {
        try {
            const userId = req.user.id; // Get the userId from the authenticated user's request
            const user = await User.findById(userId).select('AME'); // Find user by ID and include ameNumber
    
            if (!user) {
                return res.status(404).send("User not found");
            }
    
            res.send({ AME: user.AME }); // Send AME number in response
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error occurred");
        }
    });
    
        ///auththenticate a user :post "/api/auth/login"
        // router.post('/login', async (req, res) => {
        
        module.exports = router;