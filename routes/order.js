const express = require('express');
const router = express.Router();
const session = require('express-session');
const fdb = require('./queries.js');

router.post('/order', (req, res, next) => {
	if (!req.body) return res.sendStatus(400);
	if (req.body.login === '') return res.send('error');
	fdb.order(req.body, result => {
		res.send(result);
	});
});

module.exports = router;