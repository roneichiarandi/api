const db = require('../config/database');

const PresenceSchema = new db.Schema({
  name: { type: String, default: '' },
  presence: { type: Boolean, default: false },
  email: { type: String, default: ''},
  meetup_userid: { type: String, default: ''},
  meetup_userurl: { type: String, default: ''},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = db.mongoose.model('Presence', PresenceSchema);