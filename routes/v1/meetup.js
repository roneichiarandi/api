"use strict";

const express = require('express');
const router = express.Router();
const meetup = require('../../config/meetup');
const request = require('request');


router.get('/attendance/:event', (req, res, next) => {

	const event = req.params.event;

	request({
		url: meetup.baseUrl + meetup.urlName + '/events/' + event + '/attendance' + meetup.key + meetup.sign,
        json: true,
        timeout: 10000
	}, (error, response, body) => {
		res.send(body);
	})
})

module.exports = router;
