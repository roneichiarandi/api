"use strict";

const UserModel = require("../../models/users");

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
    }
};
