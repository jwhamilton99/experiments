var canvas;
var game;
var gridStep = 20;
var moveLocked = false;

function setup() {
	canvas = document.getElementById("mainCanvas");
	game = new Game();
	
	window.onkeydown = function(e) {
		if(!moveLocked) {
			switch(e.code) {
				case "ArrowUp":
					this.game.snake.setSpeed(0,-1);
					break;
				case "ArrowDown":
					this.game.snake.setSpeed(0,1);
					break;
				case "ArrowLeft":
					this.game.snake.setSpeed(-1,0);
					break;
				case "ArrowRight":
					this.game.snake.setSpeed(1,0);
					break;
					
			}
			moveLocked = true;
		}
	}
}

class Food {
	constructor() {
		this.generateNewPos();
	}
	
	generateNewPos() {
		this.xPos = Math.floor(Math.random()*(canvas.width/gridStep))*gridStep;
		this.yPos = Math.floor(Math.random()*(canvas.height/gridStep))*gridStep;
		console.log(this.xPos, this.yPos);
	}
}

class Block {
	constructor(x, y) {
		this.xPos = x;
		this.yPos = y;
	}
	
	setPos(x,y) {
		this.xPos = x;
		this.yPos = y;
	}
}

class Snake {
	constructor() {
		this.xPos = 0;
		this.yPos = 0;
		this.xSpeed = 1;
		this.ySpeed = 0;
		this.dead = false;
		
		var b = new Block(this.xPos, this.yPos)
		
		this.blocks = [b];
	}
	
	setSpeed(x, y) {
		if((this.xSpeed != -x && this.ySpeed != -y) || this.blocks.length == 1) {
			this.xSpeed = x;
			this.ySpeed = y;
		}
	}
	
	addNewBlock() {
		this.blocks.push(new Block(this.xPos, this.yPos));
	}
	
	update() {
		this.xPos = ((this.xPos+=(this.xSpeed*gridStep))%canvas.width);
		this.yPos = ((this.yPos+=(this.ySpeed*gridStep))%canvas.height);
		if(this.xPos < 0) {
			this.xPos = canvas.width-gridStep;
		}
		if(this.yPos < 0) {
			this.yPos = canvas.height-gridStep;
		}
		
		for(var i = this.blocks.length-1; i > 0; i--) {
			if(this.blocks[i].xPos == this.xPos && this.blocks[i].yPos == this.yPos) {
				this.dead = true;
			}
			var b = this.blocks[i-1];
			this.blocks[i].setPos(b.xPos, b.yPos);
		}
		
		this.blocks[0].setPos(this.xPos, this.yPos);
	}
}

class Game {
	constructor() {
		this.snake = new Snake();
		this.food = new Food();
		this.score = 0;
		
		this.update();
	}
	
	update() {
		moveLocked = false;
		this.snake.update();
		this.draw();
		
		if(this.snake.xPos == this.food.xPos && this.snake.yPos == this.food.yPos) {
			this.score++;
			this.snake.addNewBlock();
			this.food.generateNewPos();
		}
		
		var me = this;
		if(!this.snake.dead) {
			setTimeout(function(){me.update()}, 100);
		}
	}
	
	draw() {
		var c = canvas.getContext("2d");
		c.clearRect(0,0,canvas.width, canvas.height);
		
		
		
		//draw food
		c.fillStyle = "red";
		c.fillRect(this.food.xPos, this.food.yPos, gridStep, gridStep);
		
		//draw snake
		c.fillStyle = "black";
		for(var i = 0; i < this.snake.blocks.length; i++) {
			c.fillRect(this.snake.blocks[i].xPos, this.snake.blocks[i].yPos, gridStep, gridStep);
		}
		// c.fillRect(this.snake.xPos, this.snake.yPos, gridStep, gridStep);
		
		//draw score
		c.font = "20px Arial";
		c.textAlign = "right";
		c.fillText("Score: "+this.score, canvas.width, 30);
		
		//draw dead if needed
		if(this.snake.dead) {
			c.textAlign = "center";
			c.fillText("Dead", canvas.width/2, canvas.height/2);
		}
	}
}