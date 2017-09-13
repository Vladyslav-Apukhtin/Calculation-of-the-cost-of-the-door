const session = require('express-session');

module.exports = (req, res, next) => {
	if(!req.body) return res.sendStatus(400);
	let result = {
		url: 'calculator',
		user: req.session.valid
	};
	req.session.valid === undefined ?
		res.redirect('/registration') : 
			res.render('../views/allViews/calculator.jade', { reg: result });
};