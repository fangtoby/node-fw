var madefile = require('./makefile.js');
var requireFunc = require('./autoRequire.js');
var access = require('./extends/log.js');


function route(route, req, res) {
	var routes = route.split('/');
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
	if (_controller == 'css' || _controller == 'javascript') {
		res.render(_controller, _action);
		return;
	}
	//get ip address
	var ipAddr = req.headers['x-forwarded-for'];
	if (ipAddr) {
		var list = ipAddr.split(',');
		ipAddr = list[list.length - 1];
	} else {
		ipAddr = req.connection.remoteAddress;
	}
	//add log
	if (res.config.log.status) {
		var logData = {
			'ip': ipAddr,
			'Date': new Date(),
			'user-agent': req.headers['user-agent'],
		}
		access(logData);
	}
	//
	res.action = _action;
	res.controller = _controller;
	//auto make file
	madefile.init(route);
	//
	//load correct controller && action
	var currectController = requireFunc.include(_controller);
	if (typeof currectController == 'object') {
		if (typeof currectController[_action] == 'function') {
			currectController.res = res;
			currectController.req = req;
			currectController[_action]();
			//return currectController[_action](req, res);
		} else {
			return res.render('error', 'No request handler found for ' + route);
		}
	} else {
		return res.render('error','Controller not init. ' + route);
	}

}

exports.route = route;