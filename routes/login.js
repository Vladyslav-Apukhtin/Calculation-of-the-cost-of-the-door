const session = require('express-session');
const fdb = require('./queries.js');


module.exports = (req, res, next) => {
	if(!req.body) return res.sendStatus(400);
	console.log(req.body);
	if (req.body.Login === 'admin' && req.body.password === '123') {
		req.session.valid = {
			LOGIN: req.body.Login
		};
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
};