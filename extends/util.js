var os = require('os');

function getIpAddress() {
	var ifaces = os.networkInterfaces();
	var localIpAddress = '';

	for (var dev in ifaces) {
		var alias = 0;
		ifaces[dev].forEach(function(details) {
			if (details.family == 'IPv4') {
				if (dev == 'en1') {
					localIpAddress = details.address;
				}
				console.log(dev + (alias ? ':' + alias : ''), details.address);
				++alias;
			}
		});
	}
	return localIpAddress;
}

exports.getIpAddress = getIpAddress;