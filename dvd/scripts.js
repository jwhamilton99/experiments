var canvas;
var x = 400;
var y = 300;
var xSpeed = 1.5;
var ySpeed = 1.5;

var r;
var g;
var b;

var logo;

function randomizeColor() {
	r = Math.floor(Math.random()*150)+100;
	g = Math.floor(Math.random()*150)+100;
	b = Math.floor(Math.random()*150)+100;
}

window.onload = function() {
	canvas = document.getElementById("mainCanvas");
	
	x = Math.floor(Math.random()*(canvas.width-160));
	y = Math.floor(Math.random()*(canvas.height-120));
	
	logo = new Image();
	logo.src = "logo.png";
	
	randomizeColor();
	refresh();
}

function refresh() {
	var c = canvas.getContext("2d");
	
	c.save();
	
	c.clearRect(0,0,canvas.width,canvas.height);

	if(x < 0 || x > canvas.width-160) {
		randomizeColor();
		xSpeed*=-1;
	}
	if(y < 0 || y > canvas.height-120) {
		randomizeColor();
		ySpeed*=-1;
	}

	x+=xSpeed;
	y+=ySpeed;
	
	c.fillStyle = "rgba("+r+","+g+","+b+",1)";
	c.fillRect(x,y,160,120);
	
	c.globalCompositeOperation = "destination-atop";
	
	
	c.drawImage(logo, x, y, 160, 120);
	
	
	c.fillStyle = "black";
	c.fillRect(0,0,canvas.width,canvas.height);
	
	c.restore();

	setTimeout(function(){refresh();}, 10);
}

