 var fs = require('fs');

 exports.init = function(route) {
 	var controller = route.split('/');
 	if (controller.length > 2) {
 		var controllerName = controller[1];
 		var path = 'controller/' + controllerName + '.js';
 		fs.exists(path, function(exist) {
 			if (!exist) {
 				fs.open(path, 'w', '0777');
 				fs.close(path, function(success) {

 				});
 			}
 		});
 		var _basicView = ['view', '_view', '_item', 'menu', 'form', 'model','start', 'index','upload'];
 		var _viewPathSeq = 'view/';
 		var _suffix = '.html';

 		var _viewFieldPath = _viewPathSeq + controllerName;

 		fs.exists(_viewFieldPath, function(exist) {
 			var createView = false;
 			if (!exist) {
 				fs.mkdir(_viewFieldPath, '0777', function(status) {
 					if (status) {
 						createView = true;
 					}
 				});
 			} else {
 				createView = true;
 			}
 			if (createView) {
 				for (var i = 0; i < _basicView.length; i++) {
 					var filePath = _viewFieldPath + '/' + _basicView[i] + _suffix;
 					if (!fs.existsSync(filePath)) {
 						fs.open(filePath, 'w', '0777');
 					}
 				}
 			}
 		});

 	}
 }