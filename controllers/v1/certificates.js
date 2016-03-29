"use strict";

const CertificateModel = require("../../models/certificate");
const EventModel = require("../../models/event");
const UserModel = require("../../models/user");

var request = require('request');

module.exports = {
    get: (req, res, cb) => {
        CertificateModel.find({}, function(err, data){
            res.send(data);
            res.end();
        });
    },
    delete: (req, res, cb) => {
        CertificateModel.remove({}, function(err, data){
            res.send(data);
            res.end();
        });
    },
    create: (req, res, cb) => {
        let certificateData = {
            _event: req.body.event_id,
            _user: req.body.user_id,
            emmited: false
        };
        let model = new CertificateModel(certificateData);
        model.save(function(err, data) {
            if (err && err.code === 11000) {
                let findData = {
                    _event: req.body.event_id,
                    _user: req.body.user_id
                };

                CertificateModel.findOne(findData, function(err, data){
                    cb(err, data, res);
                });
                return false;
            }

            if (err) {
                cb(err, null, res);
                return false;
            }

            cb(null, {status: 'ok'}, res);
            res.end();
        });
    }
};
