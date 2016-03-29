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
        let certificateData = req.body;

        
    }
};
