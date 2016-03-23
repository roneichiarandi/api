"use strict";

const EventModel = require("../../models/events");
const AttendanceModel = require("../../models/attendance");

var request = require('request');
var meetup = require('../../config/meetup');


module.exports = {
    rsvp: (req, res, cb) => {
        let event = req.params.event; //recebe o id do evento pela url
        let url = meetup.baseUrl + meetup.urlName + '/events/' + event + '/rsvp' + meetup.key + meetup.sign;

        console.log(url);

        request({
            url: url,
            json: true,
            timeout: 10000
        }, (error, response, body) => {

            var dados = {};
            var participants = [];
            var eventData = body;

            eventData.forEach( (data) => {
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
                meetupId: eventData[0].event.id,
                name: eventData[0].event.name,
                participants: participants
            }

            let model = new EventModel(dados);
            model.save( (err, data) => {
                cb(err, data, res);
                res.end();
            });
        })
    },
    attendance: (req, res, cb) => {
        let event = req.params.event; //recebe o id do evento pela url
        let url = meetup.baseUrl + meetup.urlName + '/events/' + event + '/attendance' + meetup.key + meetup.sign;

        console.log(url)

        request({
            url: url,
            json: true,
            timeout: 10000
        }, (error, response, body) => {

            var eventData = body;
            var participants = [];

            eventData.forEach( (data) => {

                var member = data.member;
                var rsvp = data.rsvp ? data.rsvp.response : 'no';
                var photo = member.photo ? member.photo.thumb : '';
                var participant = {}

                participant = {
                    meetupUserId: member.id,
                    name: member.name,
                    photo: photo,
                    rsvp: rsvp,
                };

                participants.push(participant);
            });

            console.log(participants);
            res.end();
        })
    }
};