"use strict";

const PresenceModel = require("../../models/presence");

var request = require('request');

module.exports = {
    save: (req, res, cb) => {
        let presenceData = req.body;
        presenceData.forEach((data) => {
            data.presence = data.presence === 'sim';
            let model = new PresenceModel(data);
            model.save( (err, data) => {
                cb(err, data, res);
                res.end();
            });
        });
    },
    get: (req, res, cb) => {
        PresenceModel.find({name:"Allan%"}, function(err, data){
            res.send(data);
            res.end();
        });
    }
};
