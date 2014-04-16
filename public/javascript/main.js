// body...
(function() {
	window.onload = function() {
		var click = document.getElementById('click');
		if (click) {
			if (click.addEventListener) {
				click.addEventListener('click', function() {
					var xhr = new XMLHttpRequest();
					xhr.open('GET', '/handle/index?request=ajax', true);
					xhr.send();
					xhr.onreadystatechange = function() {
						if (xhr.status == 200 && xhr.readyState == 4) {
							console.log(xhr.responseText);
							var classElementPure = [];
							var classElement = document.getElementsByTagName('div');
							for (var i = 0; i < classElement.length; i++) {
								if (classElement[i].className == 'divitem') {
									classElementPure[classElementPure.length] = classElement[i];
								}
							}
							var newInfor = document.createElement('div');
							newInfor.setAttribute('class', 'divitem');
							var innserTml = document.createElement('div');
							innserTml.setAttribute('class', 'innerdiv');
							innserTml.innerHTML = xhr.responseText;
							newInfor.appendChild(innserTml);

							if (classElementPure.length) {
								document.getElementById('infor').insertBefore(newInfor, classElementPure[0]);
							} else {
								console.log(newInfor);
								document.getElementById('infor').appendChild(newInfor);
							}
							var data = JSON.parse(xhr.responseText);
							console.log(data);
						}
					};
				});
			} else if (click.attachEvent) {
				console.log('click');
			}
		}
	}
})(window, undefined);

(function() {

})();