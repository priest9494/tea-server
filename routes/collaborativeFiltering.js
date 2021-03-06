const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const jsonParser = bodyParser.json();

const recommend = require('../services/collabService');

router.post('/collab', jsonParser, async (req, res) => {
	console.log('avoid list:');
	console.log(req.body.avoidList);
	res.send(recommend(req.body.basket, req.body.avoidList)).status(200);
});

module.exports = router;