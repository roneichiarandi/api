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
    find: (req, res, cb) => {
        CertificateModel.find({_id: req.params.event_id }, function(err, data){
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
    generate: (req, res, cb) => {
        let certificateData = {
            _event: req.body.event_id,
            _user: req.body.user_id,
            emmited: false
        };
        let certificateService = require('../../services/certificate');
        let model = new CertificateModel(certificateData);
        let cbGenerate = function(id) {
            cb(null, {status: 'ok', id: id }, res);

            let certificate = CertificateModel.findOne({_id: id}, function(err, data) {
                certificateService.generate(data);
            });
        };

        model.save(function(err, data) {
            if (err && err.code === 11000) {
                let findData = {
                    _event: req.body.event_id,
                    _user: req.body.user_id
                };
                
                CertificateModel.findOne(findData, function(err, data){
                    if (err) {
                        cb(err, null, res);
                        return false;
                    }

                    cbGenerate(data._id);
                });
                return false;
            }

            if (err) {
                cb(err, null, res);
                return false;
            }

            cbGenerate(data._id);
            res.end();
        });
    }
};
