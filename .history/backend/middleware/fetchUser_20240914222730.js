var jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


const fetchuser =(req,res,next)=>{

    const token = req.header('auth-token'); // Extract the token from the headers
  
    // Log the token to check if it's received correctly
    console.log('Received auth-token:', token);
const token = req.header('auth-token');
if(!token) return res.status(401).send({error:"please authenticate using a valid token"})

try {
    
    const data= jwt.verify(token,JWT_SECRET);
req.user = data; // Attach decoded user info (e.g., user ID) to request

next();
} catch (error) {
   res.status(401).send({error:"please authenticate using a valid token"})

}






}





module.exports = fetchuser;