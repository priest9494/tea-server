const express = require('express');
const fs = require('fs');

const router = express.Router();

// Get tea tree
router.get('/teaTree', async (req, res) => {
	fs.readFile('tea.json', (err, data) => {
        if (err) throw err;
        let teaTree = JSON.parse(data);

        res.send(teaTree);
    });

})

module.exports = router;