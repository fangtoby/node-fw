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
	if(fs.existsSync(filePath)){
		return require(filePath);
	}else{
		return false;
	}
}