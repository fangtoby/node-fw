var fs = require('fs');

exports.include = function(controller) {
	if (controller == '') {
		return false;
	}
	var controllerPath = './controller/';
	/*
	var files = fs.readdirSync(controllerPath);
	files.forEach(function(item) {
		var tmpPath = controllerPath + item;
		var controllerName = item.split('.');
		var path = './' + tmpPath;
		autoInclude[controllerName[0]] = require(path);
	});
	*/
	var filePath = controllerPath + controller + '.js';
	//fs 的相对路径是全局的
	if (fs.existsSync(filePath)) {
		//require 的路径是相对于这个文件的
		return require('.' + filePath);
	} else {
		return false;
	}
}