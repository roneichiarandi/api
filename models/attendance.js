const db = require('../config/database');

const AttendanceSchema = new db.Schema({
  meetupUserId: Number,
  name: String,
  email: String,
  photo: String,
  rsvp: { type: String, default: 'no' },
  present: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});


module.exports = db.mongoose.model('Attendance', AttendanceSchema);