const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const jsonParser = bodyParser.json();

const collabService = require('../services/collabService');

router.post('/collab', jsonParser, async (req, res) => {
	res.send(collabService.getRecommends(req.body.basket)).status(200);
});

module.exports = router;