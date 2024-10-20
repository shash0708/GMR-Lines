var jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


const fetchuser =(req,res,next)=>{

  
    // Log the token to check if it's received correctly
const token = req.header('auth-token');
console.log('Received auth-token:', token);

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