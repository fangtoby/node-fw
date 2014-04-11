var madefile = require('./makefile.js');
//auto include controller modules
var requireFunc = require('./autoRequire.js');

var handle = require('./controller/handle.js');


function route(route, req, res) {
	var routes = route.split('/');

	//madefile.init(route);
	switch (routes.length) {
		case 0:
			break;
		case 1:
			break;
		case 2:
			var _controller = routes[1];
			var _action = 'index';
			
			var currectController = requireFunc.include(_controller);
			if (typeof currectController == 'object') {
				console.log(typeof currectController[_action]);
				if (typeof currectController[_action] == 'function') {
					return currectController[_action](req, res);
				} else {
					console.log('No request handler found for ' + route);
					return handle.error(res, 'No request handler found for ' + route);
				}
			} else {

			}
			break;
		case 3:
			var _controller = routes[1];
			var _action = routes[2];
			var currectController = requireFunc.include(_controller);

			if (typeof currectController == 'object') {
				console.log(typeof currectController[_action]);
				if (typeof currectController[_action] == 'function') {
					return currectController[_action](req, res);
				} else {
					console.log('No request handler found for ' + route);
					return handle.error(res, 'No request handler found for ' + route);
				}
			} else {

			}
			break;
		case 4:
			//module 
			break;
	}

}

exports.route = route;