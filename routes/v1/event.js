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
};

router.route('/').post( (req, res) => {
  _events.save(req, res, cb);
});

router.route('/').get( (req, res) => {
  _events.get(req, res, cb);
});

router.route('/').delete( (req, res) => {
  _events.delete(req, res, cb);
});

router.route('/:event_id').get((req, res) => {
  _events.find(req, res, cb);
});

module.exports = router;
