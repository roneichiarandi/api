"use strict";

const express = require('express');
const router = express.Router();

var _certificate = require('../../controllers/v1/certificates');

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

router.route('/save').post( (req, res) => {
  _certificate.save(req, res, cb);
});

router.route('/').get( (req, res) => {
  _certificate.get(req, res, cb);
});

module.exports = router;
