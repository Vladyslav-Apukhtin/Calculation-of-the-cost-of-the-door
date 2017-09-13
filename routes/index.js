const express = require('express');

const registration  =  require('./registration.js'),
	  authorization =  require('./authorization'),
	  login         =  require('./login'),
	  calculator    =  require('./calculator'),
	  order         =  require('./order'),
	  cataloges     =  require('./cataloges');

const router = express.Router(); 

router.get('/registration', registration)
	  .post('/authorization', authorization)
	  .post('/login', login)
	  .get('/calculator', calculator)
	  .post('/order', order)
	  .get('/cataloges', cataloges)
	  .get('/*', (req, res, next) => {
	      if(!req.body) return res.sendStatus(400);
		  res.redirect('/registration');
	   });

module.exports = router;