var fs = require('fs');
module.exports = {
	path: '',
	cacheStatus: false,
	cacheObject: {
		//path:content
	},
	addToCache: function(path) {
		var self = this;
		var stat = fs.lstatSync(path);
		if (!stat.isDirectory()) {
			this.cacheObject[path] = fs.readFileSync(path, 'utf-8');
		} else {
			var files = fs.readdirSync(path);
			files.forEach(function(file) {
				var pathName = path + '/' + file;
				self.addToCache(pathName);
			});
		}
	},
	getFromCache: function(path) {
		if (fs.existsSync(path)) {
			if (this.cacheObject[path] != 'undefined') {
				return this.cacheObject[path];
			} else {
				this.addToCache(path);
			}
		} else {
			console.log(path + ' file dones not exist. can\'t be cache');
			return false;
		}
	},
	start: function() {
		// body...
		this.cacheStatus = true;
		var path = arguments[0];
		this.path = path;
		this.addToCache(path);
		return this;
	},
	clear: function(argument) {
		// body...
		this.cacheObject = {};
	},
	reflush: function() {
		this.addToCache(this.path)
	}
};