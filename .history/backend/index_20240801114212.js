const express = require('express')
const app = express()   
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const cors = require('cors');
app.use(cors())
app.use(bodyParser.json());
app.use(express.json())

require('dotenv').config();
const uri = ""
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Database Connected");
}).catch((e) => {
    console.log(e);
    console.log("Database Can't Be Connected");
});



app.get('/', (req, res) => {
    res.send('Hello World');
  });
  app.use('/getlogs',require('./Logs/logs'))
  app.use('/getlogId',require('./Logs/logs'))

  
  app.use('/logs',require('./Logs/logs'))
  
  app.use('/delete',require('./Logs/logs'))
  
  app.use('/Bulkdelete',require('./Logs/logs'))

  app.use('/update',require('./Logs/logs'))

  app.use('/api',require('./Auth/Auth'))
  
  

  

  app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});

