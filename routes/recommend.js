const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const recommend = require('../services/hybrid');

const jsonParser = bodyParser.json();

router.post('/recommend', jsonParser, async (req, res) => {
	res.send(recommend(req.body.basket, req.body.avoidList)).status(200);
});

module.exports = router;