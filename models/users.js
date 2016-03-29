const db = require('../config/database');

const UserSchema = new db.Schema({
  name: { type: String, default: '' },
  email: { type: String, default: ''},
  meetup_userid: { type: String, default: ''},
  meetup_userurl: { type: String, default: ''},
  events: { type: db.Schema.Types.Mixed, default: [] },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = db.mongoose.model('User', UserSchema);