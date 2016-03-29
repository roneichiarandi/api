"use strict";

const UserModel = require("../../models/user");

module.exports = {
    save: (req, res, cb) => {
        let userData = req.body;
        userData.forEach((data) => {
            let model = new UserModel(data);
            model.save( (err, data) => {
                console.log(data);
            });
        });
        cb(null, {status: 'ok'}, res);
        res.end();
    },
    get: (req, res, cb) => {
        UserModel.find({}, function(err, data){
            res.send(data);
            res.end();
        });
    },
    delete: (req, res, cb) => {
        UserModel.remove({}, function(err, data){
            res.send(data);
            res.end();
        });
    },
    presence: (req, res, cb) => {
        UserModel.update(
            {_id: req.params.user_id},
            {$push:{events: req.body.event_id}},
            function (err, data) {
                if (err) {
                    cb(err, null, res);
                    return false;
                }
                res.send(data);
                res.end();
            }
        );
    },
    find: (req, res, cb) => {
        UserModel.findOne({_id: req.params.user_id}, function (err, data) {
            if (err) {
                cb(err, null, res);
                return false;
            }
            res.send(data);
            res.end();
        });
    }
};
