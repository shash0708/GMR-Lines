const express=  require('express');

const app = express();

ap.use(express.json())

PORT=5000


app.use('/',(req,res)=>{
    res.send('Hello World')
})


app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})


