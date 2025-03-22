const mongoose = require('mongoose');

// Define the schema
const logSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Ensure this matches the name of your user model
  },
  dateTime: {
    type: String, // Use String to store formatted date and time
    required: true,
  },
  ATC: {
    type: Map,
    of: String,
    default: {},
  },
  Location: { type: String, required: true },
  ACTtype: { type: String, required: true },
  ACRegNo: { type: String, required: true },
  TOM: { type: String},
  CPU: { type: String, maxlength: 1000000 },
  FOT: { type: String },
  SGH: { type: String },
  RI: { type: String },
  MEL: { type: String },
  TS: { type: String },
  MOD: { type: String },
  REP: { type: String },
  INSP: { type: String },
  Training: { type: String },
  Perform: { type: String },
  Supervise: { type: String },
  CRS_RTS: { type: String },
  ATA: { type: String, required: true },
  OP: { type: String, required: true },
  DU: { type: String, required: true },
  MRR: { type: String, required: true },
  Supervisor: { type: String, required: true }
}, { timestamps: true });



// mongoose.connection.once('open', async () => {
//   try {
//     await mongoose.connection.collection('logs').dropIndex('Id_1');
//     console.log('Successfully dropped Id index');
//   } catch (err) {
//     // Index might not exist, which is fine
//     console.log('Index might not exist:', err.message);
//   }
// });

// Create and export the model
module.exports = mongoose.model('Log', logSchema);
