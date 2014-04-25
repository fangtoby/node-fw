// Model.init('user').findByPK(1, function(error, result) {
// 	if (error) {
// 		throw new Error(error);
// 	} else {
// 		console.log(result);
// 	}
// });

var db = require('../extends/db.js');

module.exports = {
	//表名，该model里面的大部分方法的实现需要
	//指定一个目标表，都会从这里取得，如果使用
	//特定模型里面的this.tableName可以重设该
	//属性的值，也可以直接设置：
	//Model.tableName = 'newTableName';
	//Model.init(newTableName);
	tableName: '',
	//当前数据model的检索id，可以
	//用来指定删除与更新该id对应的
	//数据库条目。
	position: {
		//id : 23
	},
	//设定需要更新的列名对应的数据
	//相应的函数，需要此属性已添加
	//或更新数据库
	items: {
		//columnsName : value
	},
	//指定表里面相应的列属性列表
	//以用来检验上述items的属性
	//值是否正确
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
	updateByAttribute: function(where, attr, callback) {
		// body...
		var org = arguments.length;
		var whereString;
		var dataString;
		switch (org) {
			case 2:
				whereString = this.getAndString(this.items);
				break;
			case 3:
				whereString = this.getAndString(where);
				break;
		}
		dataString = this.getEqualString(attr);
		var sql = 'update ' + this.tableName + ' set ' + dataString + ' where ' + whereString;
		db.update(sql, function(error, result) {
			callback(error, result);
		});
		return this;
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
	},
	getEqualString: function(attr) {
		var equalString = [];
		for (var item in attr) {
			if (typeof attr[item] == 'string') {
				equalString.push(item + '=' + '"' + attr[item] + '"');
			} else {
				equalString.push(item + '=' + attr[item]);
			}
		}
		return equalString.join(',');
	}
};