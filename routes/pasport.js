// const LocalStrategy   = require('passport-local').Strategy;
// const Firebird = require('node-firebird');
// const dbOptions = require('./dbOptions.js');

// module.exports = passport => {
// 	passport.serializeUser((user, done) => {
// 		done(null, user.id);
//     });
//     passport.deserializeUser(function(id, done) {
// 		connection.query("select * from users where id = "+id,function(err,rows){	
// 			done(err, rows[0]);
// 		});
// 	 });
// };