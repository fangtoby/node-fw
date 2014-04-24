var db = require('../extends/db.js');

module.exports = {
	tableName: '',
	items: {
		//columnsName : value
	},
	columns: {
		/*
		{ 	
			Field: 'updatetime',
		    Type: 'timestamp',
		    Null: 'NO',
		    Key: '',
		    Default: 'CURRENT_TIMESTAMP',
		    Extra: 'on update CURRENT_TIMESTAMP' 
		    }
		*/
	},
	init: function(tableName) {
		if (typeof tableName == 'string') {
			this.tableName = tableName;
			return this;
		} else {
			throw new Error('init func param tableName must be a string .');
		}
	},
	setItems: function(items) {
		// items { name : values }
		this.items = items;
		return this;
	},
	getColumns: function(callback) {
		var sql = 'desc ' + this.tableName;
		db.find(sql, function(error, result) {
			callback(error, result);
		})
	},
	findAll: function(callback) {
		db.find('select * from ' + this.tableName, function(error, result) {
			callback(error, result);
		});
		return this;
	},
	findByPK: function(id, callback) {
		var self = this;
		self.getColumns(function(error, result) {
			for (var items in result) {
				if (result[items]['Key'] == 'PRI') {
					var pri = result[items]['Field'];
					var attr = {};
					attr[pri] = id;
					self.findByAttribute(attr, function(error, result) {
						callback(error, result);
					});
				}
			}
		});
	},
	findBySql: function(sql, callback) {
		db.find(sql, function(error, result) {
			callback(error, result);
		});
	},
	findByAttribute: function(attr, callback) {
		var whereString = this.getAndString(attr);
		var sql = 'select * from ' + this.tableName + ' where ' + whereString;
		this.findBySql(sql, function(error, result) {
			callback(error, result);
		});
	},
	save: function(callback) { //init table ,setItems
		var source = this.items;
		var dataString = this.getJoinString(source);
		var sql = 'insert into ' + this.tableName + '(' + dataString.columnstring + ') ' + 'values(' + dataString.valuestring + ')';

		db.add(sql, function(error, result) {
			callback(error, result);
		});
		return this;
	},
	deleteByAttribute: function(attr, callback) {
		var whereString = this.getAndString(attr);
		var sql = 'delete from ' + this.tableName + ' where ' + whereString;
		db.delete(sql, function(error, result) {
			callback(error, result);
		});
		return this;
	},
	getAndString: function(attr) {
		var stritem = [];
		if (typeof attr == 'object') {
			for (var i in attr) {
				if (typeof attr[i] == 'string') {
					stritem.push(i + ' = "' + attr[i] + '"');
				} else {
					stritem.push(i + " = " + attr[i]);
				}
			}
			var andString = stritem.join(' and ');
			return andString;
		} else {
			throw new Error('getAndString func must give a object.')
		}
	},
	getJoinString: function(source) {
		var columnstring = '',
			valuestring = '',
			columnsArr = [],
			valuesArr = [];
		for (var col in source) {
			columnsArr.push(col);
			if (typeof source[col] == 'string') {
				valuesArr.push('"' + source[col] + '"');
			} else {
				valuesArr.push(source[col]);
			}
		}
		return {
			columnstring: columnsArr.join(','),
			valuestring: valuesArr.join(',')
		};
	}
};