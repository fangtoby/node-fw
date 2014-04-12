var madefile = require('./makefile.js');
//auto include controller modules
var requireFunc = require('./autoRequire.js');

var handle = require('./controller/handle.js');


function route(route, req, res) {
	var routes = route.split('/');
	//madefile.init(route);
	var defaultController = 'daily';

	var _controller = defaultController;
	var _action = 'index';

	switch (routes.length) {
		case 0:
			break;
		case 1:
			break;
		case 2:
			if (routes[1] != '') {
				_controller = routes[1];
			}
			break;
		case 3:
			_controller = routes[1];
			_action = routes[2] ? routes[2] : 'index';
			break;
		case 4:
			//module 
			break;
	}
	var currectController = requireFunc.include(_controller);

	if (typeof currectController == 'object') {
		if (typeof currectController[_action] == 'function') {
			return currectController[_action](req, res);
		} else {
			return handle.error(res, 'No request handler found for ' + route);
		}
	} else {
		return handle.error(res, 'Controller not init. ' + route);
	}

}

exports.route = route;