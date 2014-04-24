// JavaScript Document
function getElementByClass(tagName,className){
	var classElementPure = [];
	var classElement = document.getElementsByTagName(tagName);
	for (var i = 0; i < classElement.length; i++) {
		if (classElement[i].className == className) {
			classElementPure[classElementPure.length] = classElement[i];
		}
	}
	return classElementPure;
}
function getElementById(idName){
	var element = document.getElementById(idName);
	return element;
}
(function(){
		window.onload = function() {
				//sub menu
				var itOpoElement = getElementByClass('a','it-opo');
				if(itOpoElement.length){
					for(var ele in itOpoElement){
						currentElement = itOpoElement[ele];
						(function(currentElement){
							if(currentElement.addEventListener){
								currentElement.addEventListener('click',function(){
										var obj = this.nextElementSibling;
										if(obj.style.display == 'block'){
											obj.style.display = 'none';
										}else{
											obj.style.display = 'block';	
										}
										return false;
								});
							}
						})(currentElement);	
					}
				}
				//show more
				var showMoreElement = getElementByClass('div','cr-cc-more');
				if(showMoreElement.length){
					for(var ele in showMoreElement){
						currentElement = showMoreElement[ele];
						(function(currentElement){
							if(currentElement.addEventListener){
								currentElement.addEventListener('click',function(){
										var obj = this.previousElementSibling.childNodes;
										console.log(obj);
										console.log('....');
										for(var child in obj){
											var cl = obj[child];
											if(cl.className == 'cc-document'){
												if(cl.style['height'] == 'auto'){
													cl.style['height'] = '150px';
												}else{
													cl.style['height'] = 'auto';
												}
											}
										}
										return false;
								});
							}
						})(currentElement);	
					}
				}
				
		}
})(window,undefined);
