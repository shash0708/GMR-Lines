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
ACRegNo: { type: String, required: true },
  TOM: { type: String, required: true },
  CPU: { type: String, required: true, maxlength: 1000000 },
  FOT: { type: String, required: true },
  SGH: { type: String, required: true },
  RI: { type: String, required: true },
  MEL: { type: String, required: true },
  TS: { type: String, required: true },
  MOD: { type: String, required: true },
  REP: { type: String, required: true },
  INSP: { type: String, required: true },
  Training: { type: String, required: true },
  Perform: { type: String, required: true },
  Supervise: { type: String, required: true },
  CRS_RTS: { type: String, required: true },
  TOA: { type: String, required: true },
  C: { type: String, required: true },
  DU: { type: String, required: true },
  Supervisor: { type: String, required: true }
}, { timestamps: true });

// Create and export the model
module.exports = mongoose.model('Log', logSchema);
