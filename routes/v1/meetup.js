"use strict";

const express = require('express');
const router = express.Router();


var _events = require('../../controllers/v1/events');

var cb = function(err, data, res) {
  var msg = '';
  if (err) {
    msg = {error: err};
  }
  else {
    msg = data;
  }
  // console.log(msg);
  res.json(msg);
}

// 226163759
router.get('/rsvp/:event', (req, res) => {
	_events.create(req, res, cb);
});

module.exports = router;
