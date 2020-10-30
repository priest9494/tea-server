const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const recommend = require('../services/paramsService');

const jsonParser = bodyParser.json();

router.post('/params', jsonParser, async (req, res) => {
	res.send(recommend(req.body.color, req.body.priceRange, req.body.weightRange, req.body.leafRange, req.body.inaccurate)).status(200);
});

module.exports = router;