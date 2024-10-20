const mongoose = require('mongoose');

// Define the schema
const logSchema = new mongoose.Schema({
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User', // Ensure this matches the name of your user model
  },
  // Id: { 
  //   type: Number, 
  //   required: true, 
  // },
  Location: { type: String, required: true },
ACType: { type: String, required: true },
ACType: { type: String, required: true },
  Wo: { type: String, required: true },
  Mt: { type: String, required: true, maxlength: 1000000 },
  TOM: { type: String, required: true },
  TOA: { type: String, required: true },
  C: { type: String, required: true },
  DU: { type: String, required: true },
  Supervisor: { type: String, required: true }
}, { timestamps: true });

// Create and export the model
module.exports = mongoose.model('Log', logSchema);
