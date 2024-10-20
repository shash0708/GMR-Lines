const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const  bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const User = require('../Models/UserSchema');
const fetchuser = require('../middleware/fetchUser')


router.post('/createuser', async (req, res) => {
    let success = false;
    
    // Validate incoming request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
  
    try {
      // Check if a user with the provided AME already exists
      let user = await User.findOne({ AME: req.body.AME });
      if (user) {
        return res.status(400).json({ success, error: "Sorry, a user with this AME number already exists" });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
  
      // Create a new user instance
      user = await User.create({
        AME: req.body.AME,
        password: secPass,
        Name: req.body.Name,
        Location: req.body.Location,
        Designation: req.body.Designation,
        Email: req.body.Email,
        Phone: req.body.Phone,
      });
  
      // Prepare JWT payload
      const data = {
        user: {
          id: user.id,
        },
      };
  
      // Sign and return JWT token
      const authtoken = jwt.sign(data, process.env.JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal error occurred");
    }
  });


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
    
    router.get('/getuser/:ame', fetchuser, async (req, res) => {
      try {
          const ameNumber = req.params.ame; // Get the AME number from the request
          const user = await User.findOne({ AME: ameNumber });
  
          if (!user) {
              return res.status(404).send("User not found");
          }
  
          res.send({ AME: user.AME, Name: user.Name, Designation: user.Designation, Location: user.Location, Email: user.Email, Phone: user.Phone });
      } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal server error occurred");
      }
  });
  
  router.put('/updateuser/:ame', fetchuser, async (req, res) => {
    try {
      const ameNumber = req.params.ame; // Get the AME number from the request
      
      if (!ameNumber) {
        return res.status(400).json({ error: 'AME number is required' });
      }
  
      // Find the user by AME
      const user = await User.findOne({ AME: ameNumber });
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Destructure the fields from the request body, fixing the typo for 'hone'
      const { AME, Name, Designation, Location, Email, Phone } = req.body;
  
      // Create an object with the fields to be updated (only if they exist in the request)
      const updatedFields = {};
      if (AME) updatedFields.AME = AME;
      if (Name) updatedFields.Name = Name;
      if (Designation) updatedFields.Designation = Designation;
      if (Location) updatedFields.Location = Location;
      if (Email) updatedFields.Email = Email;
      if (Phone) updatedFields.Phone = Phone; // Fix the typo from 'hone' to 'Phone'
  
      // Check if there are any additional fields to update
      const additionalFields = [
        'ACType', 'ACRegNo', 'TOM', 'CPU', 'FOT', 'SGH', 'RI', 'MEL', 'TS', 'MOD', 
        'REP', 'INSP', 'Training', 'Perform', 'Supervise', 'CRS_RTS', 'ATA', 'OP', 
        'DU', 'MRR', 'Supervisor'
      ];
  
      additionalFields.forEach(field => {
        if (req.body[field]) updatedFields[field] = req.body[field];
      });
  
      // Update the user with new fields and timestamps
      const updatedUser = await User.findOneAndUpdate(
        { AME: ameNumber }, // Query by AME number
        { $set: updatedFields },
        { new: true, runValidators: true, timestamps: true } // Ensure validators and timestamps are updated
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found for update' });
      }
  
      // Respond with the updated user data
      res.json({ user: updatedUser });
    } catch (error) {
      console.error('Error updating user:', error.message);
      res.status(500).json({ error: 'Server Error' });
    }
  });
  
    
        ///auththenticate a user :post "/api/auth/login"
        // router.post('/login', async (req, res) => {
        
        module.exports = router;