var timer = null;

function draw(id){
		var canvas = document.getElementById(id);
		if (canvas == null)
			 return false;
		var context = canvas.getContext("2d");
		var lineNumber = 1;
		timer = setInterval(function(){
			if(lineNumber++ == 30){
				 clearInterval(timer);
			}
			 context.clearRect(0, 0, 700, 400);
			 context.fillStyle = "#EEEEFF";
			 context.fillRect(0, 0, 400, 300);
			 var n = 0;
			 var dx = 150;
			 var dy = 150;
			 var s = 100;
			 context.beginPath();
			 context.fillStyle = 'rgb(100,255,100)';
			 context.strokeStyle = 'rgb(0,0,100)';
			 var x = Math.sin(0);
			 var y = Math.cos(0);
			 var dig = Math.PI / 15 * 17;
			 for (var i = 0; i < lineNumber; i++) {
				 var x = Math.sin(i * dig);
				 var y = Math.cos(i * dig);
				 context.lineTo(dx + x * s, dy + y * s);
			 }
			 //context.closePath();
			 //context.fill();
			 context.stroke();
		},100);
 }
 
 draw('draw');