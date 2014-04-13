// body...
// alert('Hello');
// (function() {
// 	setTimeout(function() {
// 		var xhr = new XMLHttpRequest();
// 		xhr.open('GET', '/handle/index?request=ajax', true);
// 		xhr.send();
// 		xhr.onreadystatechange = function() {
// 			if (xhr.status == 200 && xhr.readyState == 4) {
// 				console.log(xhr.responseText);
// 				var data = JSON.parse(xhr.responseText);
// 				console.log(data);
// 			}
// 		};
// 	}, 5000);
// })();