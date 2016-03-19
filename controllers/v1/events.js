"use strict";
var attendance = require('../../rsvp.json');
var EventModel = require("../../models/events");

const request = require('request');
const meetup = require('../../config/meetup');

var msg = '';

module.exports = {
	create: function(req, res, cb) {
		let event = req.body; //recebe o id do evento pela url

		request({
			url: meetup.baseUrl + meetup.urlName + '/events/' + event + '/attendance' + meetup.key + meetup.sign,
	        json: true,
	        timeout: 10000
		}, (error, response, body) => {

			console.log(response)
			var dados = {};
			var participants = [];

			attendance.forEach( (data) => {
				var member = data.member;
				var participant = {}

				participant = {
					mermberId: member.id,
					name: member.name,
					photo: member.photo,
					rsvp: data.response,
					present: 'no'
				};

				participants.push(participant);

			} );

			dados = {
				meetupId: attendance[0].event.id,
				name: attendance[0].event.name,
				participants: participants
			}

			var model = new EventModel(dados);
			model.save(function (err, data) {
				cb(err, data, res);
				res.end();
			});
		})
	},
	retrieve: function(req, res, cb) {
		var query = {};
		Beer.find(query, function (err, data) {
			cb(err, data, res);
			res.end();
		});
	},
	findOne: function(req, res, cb){
		var id = req.params.id;
		var query = { _id: id };

		Beer.findOne(query, function (err, data) {
			cb(err, data, res);
			res.end();
		});
	}
};

// module.exportes = _beer;