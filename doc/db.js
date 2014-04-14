//mysql数据库普通链接模式

var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '******',
	database: 'test',
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
	if (err) throw err;

	console.log('The solution is: ', rows[0].solution);
});

connection.end();

//mysql数据库链接池

/**
 * @author wuguojian@163.com
 * @des MySql基本操作
 * API: 	https://github.com/felixge/node-mysql
 */

var mysql = require('mysql');

var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'apple',
	database: 'test',
	debug: false,
});

var insert = function(connection) {
	var data = {
		account: 'Tony',
		password: '123456'
	};
	connection.query('INSERT INTO user SET ?', data, function(err, result) {
		console.log('ID : ' + result.insertId);
	});
};

var update = function(connection) {
	var data = ['Update', 1];
	connection.query('UPDATE user SET account = ? WHERE id = ?', data, function(err, result) {});
};

var select = function(connection) {
	connection.query('SELECT * FROM user', function(err, result) {
		result.forEach(function(user) {
			console.log(user.id + ':' + user.account + ':' + user.password);
		});
	});
};

pool.getConnection(function(err, connection) {
	select(connection);
	//update(connection);
	//select(connection);
});

console.log('mysql is start!');