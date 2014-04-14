var mysql = require('mysql');

var pool = mysql.createPool({
	'host': '192.168.1.108',
	'user': 'root',
	'password': 'root',
	'database': 'financialmanagement',
	debug: false,
});
module.exports = {
	init: function(callback) {
		// body...
		pool.getConnection(function(error, connection) {
			connection.query('use financialmanagement', function(error, results) {
				if (error) {
					callback(error);
				} else {
					console.log('connection mysql success.');
				}
			});
		});

	},
	add: function(sql, callback) {
		// body...
		pool.getConnection(function(error, connection) {
			if (!error) {
				connection.query(sql, function(error, results) {
					callback(error, results);
					connection.release();
				});
			} else {
				console.log(error);
			}
		});
	},
	sel: function(sql, callback) {
		pool.getConnection(function(error, connection) {
			if (!error) {
				connection.query(sql, function(error, results, fields) {
					callback(error, results, fields);
				});
			} else {
				console.log(error);
			}
		});
	},
	find: function(sql, callback) {
		pool.getConnection(function(error, connection) {
			if (!error) {
				connection.query(sql, function(error, results, fields) {
					callback(error, results, fields);
					connection.release();
				});
			} else {
				console.log(error);
			}
		});
	},
	del: function(sql) {
		// body...
	},
	upd: function(sql) {
		// body...
	},
};