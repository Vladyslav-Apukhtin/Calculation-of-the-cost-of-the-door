var express = require('express');
var router = express.Router();
var path = require('path');
var session = require('express-session');
const fdb = require('./queries.js');

router.get('/registration', function(req, res, next) {
	if(!req.body) return res.sendStatus(400);
	let result = {};
	result.url = 'registration';
	if (req.session.valid === undefined) {
		result.err = 'notError'
	} else {
		req.session.valid === 'error' ? result.err = req.session.valid : result.err = req.session.valid;
	}
	req.session.valid = null;
	result.user = undefined;
	res.render('../views/allViews/registration.jade', { reg: result });
});

router.post('/authorization', (req, res, next) => {
	if(!req.body) return res.sendStatus(400);

	fdb.addNewHuman(req.body, (result) => {
		if (result.error != undefined) {
			req.session.valid = 'error';
			res.redirect('/registration');
		} else {
			let newResult = {};
			let resObj = result[0]; 
			for (key in resObj) {
				newResult[key] = fdb.ab2str(resObj[key]); 
			}
			req.session.valid = newResult;
			res.redirect('/calculator');
		}
	});
});

router.post('/login', (req, res, next) => {
	if(!req.body) return res.sendStatus(400);
	console.log(req.body);
	if (req.body.Login === 'admin' && req.body.password === '123') {
		let newResult = {
			LOGIN: req.body.Login,
			PASSWORD: 123
		};
		req.session.valid = newResult;
		res.redirect('/cataloges');
	} else {
		fdb.loginHuman(req.body, result => {
			console.log(req.body);
			if (result.length === 0) {
				req.session.valid = 'loginError'
				res.redirect('/registration');
			} else {
				let newResult = {};
				let resObj = result[0]; 
				for (key in resObj) {
					newResult[key] = fdb.ab2str(resObj[key]); 
				}
				console.log(newResult);
				req.session.valid = newResult;
				res.redirect('/calculator');
			} 
		});
	}
});

router.get('/calculator', function(req, res, next) {
	let result = {};
	result.url = 'calculator';
	result.user = req.session.valid;
	res.render('../views/allViews/calculator.jade', { reg: result });
});

router.post('/order', (req, res, next) => {
	if(!req.body) return res.sendStatus(400);
	if(req.body.login === '') return res.send('error');
	fdb.order(req.body, result => {

		res.send(result);
	});
});

router.get('/cataloges', (req, res, next) => {
	if(!req.body) return res.sendStatus(400);
	fdb.allOrders(result => {
		result.url = 'cataloges';
		result.user = req.session.valid;
		console.log(result);
		res.render('../views/allViews/cataloges.jade', {reg: result});
	});
});

module.exports = router;