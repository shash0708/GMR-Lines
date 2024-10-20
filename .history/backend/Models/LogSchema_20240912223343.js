const mongoose = require('mongoose');

// Define the schema
const logSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Ensure this matches the name of your user model
  },
  Location: { type: String, required: true },
  ACTtype: { type: String, required: true },
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
  ATA: { type: String, required: true },
  OP: { type: String, required: true },
  DU: { type: String, required: true },
  MRR: { type: String, required: true },
  Supervisor: { type: String, required: true },
  // Automatically set fields for date and time
  customDate: { type: Date, default: Date.now }, // Automatically sets the current date and time
}, { timestamps: true });

// Create and export the model
module.exports = mongoose.model('Log', logSchema);
