const path = require('path');

module.exports = {
	host: '127.0.0.1',
	database: `${path.dirname(__dirname).split(path.sep).join('/')}/db/change/USERSORDERS.FDB`,
	port: 3050,
	user: 'SYSDBA',
	password: 'masterkey',
	lowercase_keys: false,
	role: null,
	pageSize: 4096
} 