const session = require('express-session');
const fdb = require('./queries.js');

module.exports = (req, res, next) => {
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
};