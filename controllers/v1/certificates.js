"use strict";

const PresenceModel = require("../../models/presence");

var request = require('request');

module.exports = {
    find: (req, res, cb) => {
        let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (!emailRegex.test(req.params.email)) {
            console.log(req.params);
            cb('invalid email', null, res);
        } else {
            PresenceModel.find({email: req.params.email}, function(err, data){
                res.send(data);
                res.end();
            });
        }
    },
    save: (req, res, cb) => {
        let presenceData = req.body;
        presenceData.forEach((data) => {
            data.presence = data.presence === 'sim';
            let model = new PresenceModel(data);
            model.save( (err, data) => {
                console.log(data);
            });
        });
        cb(null, {status: 'ok'}, res);
        res.end();
    },
    get: (req, res, cb) => {
        PresenceModel.find({}, function(err, data){
            res.send(data);
            res.end();
        });
    },
    delete: (req, res, cb) => {
        PresenceModel.remove({}, function(err, data){
            res.send(data);
            res.end();
        });
    }
};
