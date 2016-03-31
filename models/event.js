const db = require('../config/database');

const EventSchema = new db.Schema({
  meetup_id: Number,
  name: { type: String, default: '' },
  participants: { type: db.Schema.Types.Mixed, default: [] },
  certificate_description: { type: String, default: '' },
  certificate_date_text: {type: String, default: ''},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});


module.exports = db.mongoose.model('Event', EventSchema);