const session = require('express-session');

module.exports =  (req, res, next) => {
	if(!req.body) return res.sendStatus(400);
	let result = {
		url: 'registration',
		err: req.session.valid === 'error' ?
				req.session.valid : 'notError',
		user: undefined
	};
	req.session.destroy();
	res.render('../views/allViews/registration.jade', { reg: result });
};