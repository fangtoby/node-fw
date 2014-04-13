 var fs = require('fs');

 exports.init = function(route) {
 	var controller = route.split('/');
 	if (controller.length > 2) {
 		var controllerName = controller[1];
 		var path = 'controller/' + controllerName + '.js';
 		if (!fs.existsSync(path)) {
 			var tempPath = 'controller/temple.js';
 			var content = fs.readFileSync(tempPath, 'utf-8');
 			fs.writeFileSync(path, content, 'utf-8');
 		}

 		var _basicView = ['view', '_view', '_item', 'menu', 'form', 'model', 'start', 'index', 'upload'];
 		var _viewPathSeq = 'view/';
 		var _suffix = '.html';

 		var _viewFieldPath = _viewPathSeq + controllerName;
 		var createView = false;

 		if (fs.existsSync(_viewFieldPath)) {
 			createView = true;
 		} else {
 			if (fs.mkdirSync(_viewFieldPath, '0777')) {
 				createView = true;
 			}
 		}
 		if (createView) {
 			for (var i = 0; i < _basicView.length; i++) {
 				var filePath = _viewFieldPath + '/' + _basicView[i] + _suffix;
 				if (!fs.existsSync(filePath)) {
 					var fd = fs.openSync(filePath, 'w', '0777');
 					fs.closeSync(fd);
 				}
 			}
 		}

 	}
 }