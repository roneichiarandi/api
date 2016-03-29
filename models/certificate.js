const db = require('../config/database');

const CertificateSchema = new db.Schema({
  _event: {type: db.mongoose.Schema.Types.ObjectId, ref: 'Event'},
  _user: {type:  db.mongoose.Schema.Types.ObjectId, ref: 'User'},
  emmited: {type: Boolean, default: false},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

CertificateSchema.index({_event: 1, _user: 1}, {unique: true});

module.exports = db.mongoose.model('Certificate', CertificateSchema);