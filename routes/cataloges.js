const session = require('express-session');
const fdb = require('./queries.js');

module.exports = (req, res, next) => {
	if (!req.body) return res.sendStatus(400);
	
	if (req.session.valid === undefined) { 	
		res.redirect('/registration'); 
	} else {
		fdb.allOrders(result => {
			result.url = 'cataloges';
			result.user = req.session.valid;
			res.render('../views/allViews/cataloges.jade', {reg: result});
		});
	}
};