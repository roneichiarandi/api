const db = require('../config/database');

const CertificateSchema = new db.Schema({
  _event: {type:Number, ref: 'Event'},
  _user: {type: Number, ref: 'User'},
  emmited: {type: Boolean, default: false},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = db.mongoose.model('Certificate', CertificateSchema);