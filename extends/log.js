var fs = require('fs');
module.exports = function(argument) {
	//arguments[0] req.headers
	//arguments[1] errorPath
	//arguments[2] error name
	if (typeof arguments[0] != 'undefined') {
		headers = arguments[0];
		console.log(headers);
		var errorLogPath = './log/access.log';
		if (!fs.existsSync(errorLogPath)) {
			fs.open(errorLogPath, 'w', '0777');
		}
		if (fs.appendFileSync(errorLogPath, JSON.stringify(headers))) {
			console.log('add access log success.');
		}
	} else {
		console.log('log error.');
	}
}