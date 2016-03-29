"use strict";

const express = require('express');
const router = express.Router();

var _user = require('../../controllers/v1/user');

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

router.route('/').get( (req, res) => {
  _user.get(req, res, cb);
});

router.route('/:user_id').get((req, res) => {
  _user.find(req, res, cb);
});

router.route('/save').post( (req, res) => {
  _user.save(req, res, cb);
});

router.route('/').delete( (req, res) => {
  _user.delete(req, res, cb);
});

router.route('/:user_id/presence').post((req, res) => {
  _user.presence(req, res, cb);
});

router.route('/:user_id/presence/:event_id').get((req, res) => {
  _user.hasPresence(req, res, cb);
});

module.exports = router;
