var fs = require('fs');

function error(res, error) {
	res.writeHead(500, {
		"Content-Type": "text/plain"
	});
	res.write(error + "\n");
	res.end();
}

function plain(res, param) {
	res.writeHead(200, {
		"Content-Type": "text/plain"
	});
	res.write(JSON.stringify(param));
	res.end();
}

function write(res, content) {
	res.writeHead(200, {
		"Content-Type": "text/html"
	});
	res.write(content);
	res.end();
}

function source(res, content, type) {
	// body...
	res.writeHead(200, {
		'Content-Type': 'text/' + type
	});
	res.write(content);
	res.end();
}

function images(res, content) {
	res.writeHead(200, {
		"Content-Type": "images/jpg"
	});
	res.write(content, 'binary');
	res.end();
}

function icon(res, content) {
	res.writeHead(200, {
		'Content-Type': 'image/x-icon'
	});
	res.write(content, 'binary');
	res.end();
	return;
}

function renderPartial(pathfile, param) {
	if (fs.existsSync(pathfile)) {
		var file = fs.readFileSync(pathfile, 'utf-8');
		var clearFile = file.replace(/\t|\n/g, '');
		var tagFile = clearFile.replace(/<%=(.*?)%>/g, function() {
			if (typeof param[arguments[1]] != 'undefined') {
				return param[arguments[1]];
			} else {
				return '';
			}
		});
		return tagFile;
	} else {
		console.log(pathfile + " not exist");
	}
}
module.exports = function() {
	//css,script request response
	var self = this;
	if (arguments[0] == 'favicon.ico') {
		var iconPath = "./" + arguments[0];
		if (fs.existsSync(iconPath)) {
			var file = fs.readFileSync(iconPath, 'binary');
			icon(self, file);
		} else {
			console.log('ico file dose not exist in ' + iconPath);
		}
	}
	if (arguments[0] == 'css' || arguments[0] == 'javascript') {
		var scriptPath = './public/' + arguments[0] + '/' + arguments[1];
		if (fs.existsSync(scriptPath)) {
			var content = fs.readFileSync(scriptPath, 'utf-8');
			source(this, content, arguments[0]);
		} else {
			error(this, scriptPath + 'file does not exist.');
		}
		return;
	}
	var action = typeof arguments[0] == 'String' ? arguments[0] : this.action;

	var htmlPath = './view/' + this.controller + '/' + action + '.html';
	var param = {};

	if (typeof arguments[1] == 'object') {
		param = arguments[1];
	}
	if (this.param['request'] == 'ajax') {
		plain(this, param);
		return;
	}
	if (arguments[0] == 'images') {
		images(this, param['file'])
		return;
	}
	if (arguments[0] == 'error') {
		error(this, arguments[1]);
	}
	if (fs.existsSync(htmlPath)) {
		var content;
		if(this.cacheView){
			content = this.cacheView;
		}else{
			content = fs.readFileSync(htmlPath, 'utf-8');
		}
		
		var content = content.replace(/\t|\n/g, '');
		var tag = this.config.viewCodeTag;
		//replace param
		content = content.replace(/<%=(.*?)%>/g, function() {
			if (typeof param[arguments[1]] != 'undefined') {
				return param[arguments[1]];
			} else {
				return 'undefined';
			}
		});
		//run script
		var content = content.replace(tag, function() {
			var result = eval('(' + 'function(){' + arguments[1] + '}' + ')')();
			if (typeof result != 'undefined') {
				return result;
			} else {
				return '';
			}
		});
		//add view layouts
		if ((typeof arguments[2] == 'undefined') || arguments[2] == '') {
			var layouts = './view/layouts/' + this.config.viewLayouts;
			content = renderPartial(layouts, {
				'title': 'my app',
				'content': content
			});
		}
		write(this, content);
	} else {
		error(this, htmlPath + 'file does not exist.');
	}

}