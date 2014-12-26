//tank类

function Tank(direction,top,left,app,good){
	this.direction = direction;
	this.top = top;
	this.left = left;
	this.tankDiv;
	this.speed = 6;
	this.bullet;
	this.app = app;
	//真为mytank 假为aitank
	this.good = good;
	this.life = 2;

	


	//画出坦克
	this.drawTank = function(i){
		this.tankDiv = document.createElement('div');
		this.tankDiv.id = 'tankDiv';
		this.tankDiv.style.width = '32px';
		this.tankDiv.style.height = '32px';
		this.tankDiv.style.position = 'absolute';
		this.tankDiv.style.top = this.top + 'px';
		this.tankDiv.style.left = this.left + 'px';
		this.tankDiv.style.backgroundImage = "url('Util/Tank.png')";
		//确定方向
		this.changeDirection(this.direction);
		document.body.appendChild(this.tankDiv);
		if(this.good){
			//如果为玩家坦克 则键盘控制
			this.keyListen();
		}
		
		if(!this.good){
			//如果为ai坦克 则自由移动
			this.aiMove(i);
		}
	}

	//ai坦克移动
	this.aiMove = function(i){
		var name = new Array();
		name[i] = this;
		var num = 30;
		this.setMove = setInterval(function(){
			name[i].move();
			num--;
			if(num == 0){
				r = Math.round(Math.random()*3);
				switch(r){
					case 0:name[i].changeDirection('up');break;
					case 1:name[i].changeDirection('right');break;
					case 2:name[i].changeDirection('left');break;
					case 3:name[i].changeDirection('down');break;
				}
				num = 30;
			}
		},150);	

	}

	//坦克转向
	this.changeDirection = function(dir){
		switch(dir){
			case 'stop': 
			break;
			case 'up': 
				this.direction = 'up';
				if(this.good){
					this.tankDiv.style.backgroundPosition = "0px,0px";
				}else if(!this.good){
					this.tankDiv.style.backgroundPosition = "-350px,0px";
				}
			break;
			case 'left':
				this.direction = 'left';
				if(this.good){
					this.tankDiv.style.backgroundPosition = "-3136px,0px";
				}else if(!this.good){
					this.tankDiv.style.backgroundPosition = "-3040px,0px";
				}
			break;
			case 'right':
				this.direction = 'right';
				if(this.good){
					this.tankDiv.style.backgroundPosition = "-895px,0px";
				}else if(!this.good){
					this.tankDiv.style.backgroundPosition = "-1248px,0px";				}
			break;
			case 'down':
				this.direction = 'down';
				if(this.good){
					this.tankDiv.style.backgroundPosition = "-1792px,0px";
				}else if(!this.good){
					this.tankDiv.style.backgroundPosition = "-2144px,0px";
				}
			break;
		}
		
	}
	//ai坦克碰撞	
	this.touchAitank = function(){
		for(i=0;i<this.app.aitank.length;i++){
			if(this.tank != this.app.aitank[i] && Math.abs(this.tankDiv.offsetLeft - this.app.aitank[i].tankDiv.offsetLeft) <= 32 && Math.abs(this.tankDiv.offsetTop - this.app.aitank[i].tankDiv.offsetTop) <= 32){
					//console.log('hit');
					return true;
			}
		}
		return false;
	}

	//坦克移动
	this.move = function(){
		//this.collideTank();
		switch(this.direction){
			case 'up': 
				if(this.tankDiv.offsetTop > 102){
					this.tankDiv.style.top = this.tankDiv.offsetTop - this.speed;
				} 
				if(!this.good && this.tankDiv.offsetTop <= 102){
					this.changeDirection('down');
				}
			break;

			case 'left':
				if(this.tankDiv.offsetLeft >= 552){
					this.tankDiv.style.left = this.tankDiv.offsetLeft - this.speed;
				}
				if(this.tankDiv.offsetLeft <= 552 && !this.good){
					this.changeDirection('right');
				}
			break;

			case 'right':
				if(this.tankDiv.offsetLeft <= 1012){
					this.tankDiv.style.left = this.tankDiv.offsetLeft + this.speed;
				}
				if(this.tankDiv.offsetLeft >= 1012 && !this.good){
					this.changeDirection('left');
				}
			break;

			case 'down':
				if(this.tankDiv.offsetTop <= 460){
					this.tankDiv.style.top = this.tankDiv.offsetTop + this.speed;
					
				}
				if(this.tankDiv.offsetTop >= 460 && !this.good){
					this.changeDirection('up');
				}

			break;
		}

	}
	
	this.keyListen = function(){
		tankObj = this;
		document.onkeydown = function(event){
			var e = event || window.event || arguments.callee.caller.arguments[0];
			switch(e.keyCode){
				case 39:
					tankObj.changeDirection('right');
					tankObj.move();
				break;
				case 40:
					tankObj.changeDirection('down');
					tankObj.move();
				break;
				case 37:
					tankObj.changeDirection('left');
					tankObj.move();
				break;
				case 38:
					tankObj.changeDirection('up');
					tankObj.move();
				break;
				case 17:
					tankObj.fire();
				break;
			}
		}
	
	}

	this.fire = function(i){
		b = new Bullet(this.tankDiv.offsetTop,this.tankDiv.offsetLeft,this.direction,this.good,app);
		b.drawBullet();
		this.app.bullet.push(b);
		
	}

}