(function  (argument) {
	// body...
	// alert('Hello');
	setTimeout(function (argument) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET','/handle/index?request=ajax',true);
		xhr.send();
		xhr.onreadystatechange = function(){
			console.log(JSON.parse(xhr.responseText));	
		};
	}, 5000);
})();