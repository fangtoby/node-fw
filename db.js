var mysql = require('mysql').createConnection({
	'host': '192.168.1.108',
	'user': 'root',
	'password': 'root',
	'database': 'financialmanagement'
});

var self = this;

function init(callback) {
	// body...
	mysql.query('use financialmanagement', function(error, results) {
		if (error) {
			console.log(error);
		} else {
			console.log('connection mysql success.');
		}
		callback(error);
	});
}

function add(sql, callback) {
	// body...
	this.init(function(error) {
		if (!error) {
			mysql.query(sql, function(error, result) {
				// body...
				callback(error, result);
			})
			console.log(sql);
		} else {
			console.log(error);
		}
	});

	return self;
}

function sel(sql, callback) {
	this.init(function(error) {
		if (!error) {
			mysql.query(sql, function(error, results, fields) {
				callback(error, results, fields);
			});
		} else {
			console.log(error);
		}
	});
}

function find(sql, callback) {
	this.init(function(error) {
		if (!error) {
			mysql.query(sql, function(error, results, fields) {
				callback(error, results, fields);
			});
		} else {
			console.log(error);
		}
	});
	return self;
}

function del(sql) {
	// body...
}


function upd(sql) {
	// body...
}

exports.init = init;
exports.upd = upd;
exports.sel = sel;
exports.add = add;
exports.del = del;
exports.find = find;