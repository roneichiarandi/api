"use strict";

const express = require('express');
const router = express.Router();

var _events = require('../../controllers/v1/events');

var cb = function (err, data, res) {
  var msg = '';
  if (err) {
    msg = {error: err};
  }
  else {
    msg = data;
  }
  res.json(msg);
}

// 226163759
router.route('/rsvp/:event').get( (req, res) => {
  _events.rsvp(req, res, cb);
});

router.get('/attendance/:event', (req, res) => {
  _events.attendance(req, res, cb);
});

module.exports = router;
