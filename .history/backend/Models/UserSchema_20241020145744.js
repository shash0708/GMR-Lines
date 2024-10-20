const mongoose = require('mongoose')


const UserSchema= mongoose.Schema({

    AME: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      Name: {
        type: String,
        required: true,
      },
      Location: {
        type: String,
        required: true,
      },
      Designation: {
        type: String,
        required: true,
      },
      Email: {
        type: String,
        required: true,
        unique: true,
      },
      Phone: {
        type: String,
        required: true,
      },
    });
})

module.exports = mongoose.model('User', UserSchema);
