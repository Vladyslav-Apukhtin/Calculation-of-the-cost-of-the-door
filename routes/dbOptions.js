var path = require('path');

const options = {
	host: '127.0.0.1',
	database: 'D:/test/work/diplom_2017/db/change/USERSORDERS.FDB',
	port: 3050,
	user: 'SYSDBA',
	password: 'masterkey',
	lowercase_keys: false, // set to true to lowercase keys
	role: null,			   // default
	pageSize: 4096		   // default when creating database
};

module.exports = {
	options: options
} 