function index (req,res) {
	// body...
	res.writeHead(200, {
 				'Content-Type': 'text/html'
 			});
 			res.write('received upload:\n\n');
 			res.end();
}
function view (argument) {
	// body...
}
function menu (argument) {
	// body...
}
function form (argument) {
	// body...
}
function source (argument) {
	// body...
}
function item (argument) {
	// body...
}

exports.index = index;
exports.view = view;
exports.menu= menu;
exports.form = form;
exports.source = source;
exports.item = item;
