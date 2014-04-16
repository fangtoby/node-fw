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

	var objectA = {
		aoo: function(argument) {
			// body...
			console.log(this);
			console.log(argument);
		},
		boo: function(argument) {
			// body...
		}
	};
	objectA.eoo = function(argument) {
		// body...
		console.log(this);
	};

	var objectB = {
		coo: function(argument) {
			// 改变函数的执行环境
			objectA.aoo.call(this, argument);
			console.log(argument);
			console.log(this);
			// body...
		},
		doo: function(argument) {
			//实现继承
			//把func内的功能拷贝过来
			func.call(this, 1);
			console.log(this);
		}
	};

	function func(argument) {
		// body...
		this.name = 'honest.lies';
		this.func = function(argument) {
			console.log(argument);
		};
	}

	function funca(argument) {
		// body...
		this.age = 20;
		this.afunc = function(argument) {
			// body...
		};
	}

	function funcc(argument) {
		// body...
		this.attri = 12;
		var funcs = function(argument) {
			// body...
			this.name = 'rgb';
			console.log(typeof this);
		};
		funcs.prototype.extend = function(argument) {
			// body...
			for (var a in argument) {
				this[a] = argument[a];
			}
			console.log(this);
			console.log('hello');
		};
		console.log(funcs.prototype);
		funcs.prototype.extend({
			'a': 23
		});
		funcs();
		return func;
	}
	funcc(2);
	// objectA.prototype.AAA = function(argument) {
	// 	// body...
	// 	for (var m in argument) {
	// 		this[m] = argument[m];
	// 	}
	// };
	console.log(objectA);
	objectB.coo(10);
	objectB.doo(10);
	objectB.func(100);

	function funcb(argument) {
		// body...
		func.call(this);
		funca.call(this);
		console.log(this);
	}
	funcb();

})();