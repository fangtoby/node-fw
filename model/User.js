// 用法
// var User = require('./model/User.js');
// var model = new User();
// model.tableName = 'document';
// model.findAll(function(error,result){
// 	console.log(result);
// });

var baseModel = require('../extends/model.js');
module.exports = function() {
	//私有属性于方法
	if(typeof arguments[0] == 'string'){
		this.tableName =  arguments[0];
	}else{
		this.tableName = 'user';
	}

	this.tabList = {
		1:'all',
		2:'unique',
		3:'list'
	};
	this.sort = function(argument) {
		// body...
	}

}
//共有属性于方法，继承至model.js
module.exports.prototype = baseModel;