var mysql = require('mysql');
var config = require('../main/config.js');

var pool = mysql.createPool(config.db.main);

module.exports = {
	init: function(callback) {
		pool.getConnection(function(error, connection) {
			connection.query('use km', function(error, results) {
				callback(error);
			});
		});

	},
	add: function(sql, callback) {
		pool.getConnection(function(error, connection) {
			connection.query(sql, function(error, results) {
				callback(error, results);
				connection.release();
			});
		});
	},
	sel: function(sql, callback) {
		pool.getConnection(function(error, connection) {
			connection.query(sql, function(error, results, fields) {
				callback(error, results, fields);
			});
		});
	},
	find: function(sql, callback) {
		pool.getConnection(function(error, connection) {
			connection.query(sql, function(error, results, fields) {
				callback(error, results, fields);
				connection.release();
			});
		});
	},
	delete: function(sql, callback) {
		pool.getConnection(function(error, connection) {
			connection.query(sql, function(error, results) {
				callback(error, results);
				connection.release();
			});
		});
	},
	update: function(sql, callback) {
		pool.getConnection(function(error, connection) {
			connection.query(sql, function(error, results) {
				callback(error, results);
				connection.release();
			});
		});
	},
};