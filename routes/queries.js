const Firebird = require('node-firebird');
const Promise = require('bluebird');
const dbOptions = require('./dbOptions.js');
var db;

const options = dbOptions.options;


/*------------------------------ UTILITY -------------------------------*/
ab2str = buf => {
	return String.fromCharCode.apply(null, new Uint16Array(buf));
}

/*------------------------------ CONNECT/DISCONNECT -------------------------------*/

connectToDB = dboptions => {
	const def = Promise.defer();

    Firebird.attach(dboptions,
		(err, db) => {
			err ? def.reject(err) : def.resolve(db);
      	}
    );
    return def.promise;	
}

function disconnectFromDB() {
	db.detach(() => {console.log('DATABASE DETACHED')});
};

/*------------------------------ QUERY -------------------------------*/

queryDB = (sql) => {
	const def = Promise.defer();

	connectToDB(options).then(
	  	// success
	  	dbconn => {
	  		console.log('DATABASE CONNECT');
			db = dbconn;
			db.query(sql, (err, rs) => {
				err ? def.reject(err) : def.resolve(rs);
			});
	  	},
	  	// fail
	  	err => {
	    	console.log(err);
	  	});
		return def.promise;
	};


const addNewHumanSql = (surnameName, login, password, telNumber, email) => {
	return`
		INSERT INTO Users (surnameName, login, password, telNumber, e_mail)
   		VALUES ('${surnameName}', '${login}', '${password}', '${telNumber}', '${email}')
   		RETURNING login;
	`
}

const checkNewHumanSql = login => {
	return`
		select *
		from Users
		where login='${login}'; 	
	`
}

addNewHuman = (req, callback) => {
	let addHuman = addNewHumanSql(req.surnameName, req.login, req.password, req.telNumber, req.email);

	queryDB(addHuman)
		.then(
			rs => {
				disconnectFromDB();
				let checkHuman;
				for (key in rs) {
	        		checkHuman = checkNewHumanSql(rs[key]);
				}
	        	return checkHuman;
			})
		.then(checkHuman => queryDB(checkHuman))
		.then(
			rs => {
	        	disconnectFromDB();
	        	console.log('ЛЮДИНА ЗАРЕЄСТРОВАНА!', rs);
				callback(rs);
			})
		.catch(error => {
			disconnectFromDB();
			console.error(error);
			callback({error:error});
		});
}

checkLogin = (login, password) => {
	return `
		select * 
		from Users
		where login = '${login}' and password = '${password}';
	`
}

checkOrder = order => {
	let insert = "";
	let value = "";
	for (key in order) {
		insert += key + ', ';
		value += `'${order[key]}', `;
	}
	return `
		INSERT INTO Orders(${insert.substr(0, insert.length - 2)})
		VALUES (${value.substr(0, value.length - 2)})
		RETURNING id;
	`
}

checkOrders = () => {
	return `
		select *
		from Users, Orders
		where Users.login = Orders.login;
	`
}

loginHuman = (req, callback) => {
	let checkLoginHuman = checkLogin(req.Login, req.password);
	queryDB(checkLoginHuman)
		.then(
			rs => {
				disconnectFromDB();
	        	console.log('ЛЮДИНА ПРОВІРЕНА!', rs);
				callback(rs);
			})
		.catch(error => {
			disconnectFromDB();
			console.error(error);
			callback({error:error});
		});
}

order = (req, callback) => {
	let checkOrderHuman = checkOrder(req);
	queryDB(checkOrderHuman)
		.then(
			rs => {
				disconnectFromDB();
	        	console.log('ЗАМОВЛЕННЯ ПЕРЕВІРЕНЕ!', rs);
				callback(rs);
			})
		.catch(error => {
			disconnectFromDB();
			console.error(error);
			callback({error:error});
		});
}

allOrders = (callback) => {
	let checkAllOrders = checkOrders();
	queryDB(checkAllOrders)
		.then(
			rs => {
				disconnectFromDB();
	        	console.log('ЗАМОВЛЕННЯ ПЕРЕВІРЕНЕ!');
				callback(rs);
			})
		.catch(error => {
			disconnectFromDB();
			console.error(error);
			callback({error:error});
		});
}

module.exports = {
	addNewHuman: addNewHuman,
	ab2str: ab2str,
	loginHuman: loginHuman,
	order: order,
	allOrders: allOrders
}