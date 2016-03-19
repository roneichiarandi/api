const db = require('../config/database');

var EventSchema = new db.Schema({
  meetupId: Number,
  name: { type: String, default: '' },
  participants: { type: db.Schema.Types.Mixed, default: [] },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});


module.exports = db.mongoose.model('Event', EventSchema);