(function(){
	function $(element){
		return new _$(element);
	}
	function _$(element){
		var classSplit = element.split('.');
		var idsSplit = element.split('#');
		this.element = Array();
		this.extend(extendStyle);
		if(idsSplit.length == 2 && idsSplit[0] == ''){
			this.element.push(document.getElementById( idsSplit[1] ));
		}else if(classSplit.length == 2){//tag . class
			var tagName = classSplit[0];
			var className = classSplit[1];
			var classElementPure = [];
			var classElement = document.getElementsByTagName(tagName);
			for (var i = 0; i < classElement.length; i++) {
				if (classElement[i].className == className) {
					classElementPure[classElementPure.length] = classElement[i];
				}
			}
			this.element.push(classElementPure);
		}else{
			this.element.push(document.getElementsByTagName(element));
		}
		for(var child in this.element){
			this.element[child].prototype = _$.prototype;	
		}
		//return this.element;
	}
	_$.prototype.click = function(callback){
		var element = this.element;
		for(var ele in element){
			var el = element[ele];
			(function(el,callback){
				el.addEventListener('click',function(){
						callback();
				});	
			})(el,callback);	
		}
		return this;
	};
	//@todo
	_$.prototype.each = function(callback){
		var element = this.element;
		for(var ele in element){
			var el = element[ele];
			(function(el,callback){
					callback(el);
			})(el,callback);	
		}
	};
	var extendStyle = {
		css:function(styles){
			/*{
				color:'#ddd',
				border:''
			}*/
			var element = this.element;
			if(typeof(styles) != 'string'){
				for(var ele in element){
					var el = element[ele];
					for(var style in styles){
						el.style[style] = styles[style];
					}
				}
			}else{
				for(var ele in element){
					var el = element[ele];
					var style = window.getComputedStyle(el);
					var styleValue = style.getPropertyValue(styles);
					if(styleValue != ''){
						return styleValue;
					}
				}
				
			}
			return this;
		}
	};
	_$.prototype.extend = function(extendFunction){
		for(var item in extendFunction){
			if(typeof(_$.prototype[item]) == 'undefined'){
				_$.prototype[item] = extendFunction[item];
			}	
		}
	};

	window.$ = $;
})();
var circleFrame = {
		circleList:{},
		circleSize:0,
		context:null,
		timer:null,
		init:function(){
				var _this = this;
				_this.timer = null;
				var draw = document.getElementById('draw');
				_this.context = draw.getContext('2d');
				var evenHander = function(e){
					_this.doMouseDown.call(_this,e);	
				};
				draw.addEventListener('mousedown',evenHander,false);
				$('#dw-clear').click(function(){
					_this.context.clearRect(0, 0, 700, 400);
					_this.circleList = {};
					_this.circleSize = 0;
				});
				$('#dw-clear').css({color:'blue'});
				console.log( $('#dw-clear').css('color') );
				$('#dw-stop').click(function(){
					clearInterval(_this.timer);
				});
				$('#dw-start').click(function(){
					_this.draw();
				});
		},
		doMouseDown:function(event){
			var _this = this;
			console.log(this);
			var x = event.pageX;
			var y = event.pageY;
			var canvas = event.target;
			var loc = this.getPointOnCanvas(canvas,x,y);
			_this.circleList[_this.circleSize++] = {
					initSize:20,
					location:loc,
					nowSize:20,
					strokeColor:{
							r:parseInt(255*Math.random()),
							g:parseInt(255*Math.random()),
							b:parseInt(255*Math.random())
						}
				};
			if(_this.timer == null){
				_this.draw();
			}
		},
		getPointOnCanvas:function(canvas,x,y){
			var box = canvas.getBoundingClientRect();
			return {
					x : x-box.left * (canvas.width / box.width),
					y : y-box.top * (canvas.height / box.height)
				};	
		},
		draw:function(){
			var _this = this;
			var context = this.context;
			if (window.setInterval){
				_this.timer = setInterval(function(){
					  var context = _this.context;
					  var circleList = _this.circleList;
					  context.clearRect(0, 0, 700, 400);
					  for(var list in circleList){
							  var items = circleList[list];
							  var color = items['strokeColor'];
							  
							  items['initSize']+=0.5;
							  if(items['initSize'] >= 80){
								  items['initSize'] = 20;	
							  }
							  
							  var opacity =1 - items['initSize']/80;
							  var borderWidth = 2-2*items['initSize']/80;
							  var positon = items['location']
							  //
							  context.beginPath();
							  context.arc(positon.x, positon.y, items['initSize'], 0, Math.PI*2 , true);
							  if(circleList[list]['initSize'] == 21){
								  //context.fillStyle = 'rgba(255,0,0,1)';
							  }else{
								  context.fillStyle = 'rgba(255,255,255,0)';
							  }
							  context.fill();
							  context.lineWidth=borderWidth;
							  context.strokeStyle = 'rgba('+color.r+','+color.g+', '+color.b+','+ opacity +')'
							  context.closePath();
							  context.stroke();
							  //
							  context.beginPath();
							  context.arc(positon.x,positon.y,20,0,Math.PI*2,true);
							  context.fillStyle = 'rgba(255, 255, 255, 0.4)';
							  context.lineWidth = 0.3;
							  context.closePath();
							  context.stroke();
							  //
							  context.beginPath();
							  context.arc(positon.x,positon.y,17,0,Math.PI*2,true);
							  context.fillStyle = 'rgba(255,255,255, 0.3)';
							  context.closePath();
							  context.stroke();
					  }	
				},40);
			}
		},
		pool:function(){
			  console.log(this);
		}
	};
circleFrame.init();