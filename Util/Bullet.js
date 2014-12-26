//bullet类

function Bullet(top,left,direction,good,app){
	this.speed = 10;
	this.bulletDiv;
	this.direction = direction;
	this.top = top;
	this.left = left;
	this.good = good;
	this.bullet_set;
	this.app = app;

	this.drawBullet = function (){
			this.bulletDiv = document.createElement('div');
			this.bulletDiv.id = 'bulletDiv';
			this.bulletDiv.style.width = '4px';
			this.bulletDiv.style.height = '4px';
			this.bulletDiv.style.position = 'absolute';
			if(this.good){
				this.bulletDiv.style.backgroundColor = "yellow";
			}else{
				this.bulletDiv.style.backgroundColor = "red";
			}
				switch(this.direction){
				case 'up':
				this.bulletDiv.style.top = this.top + 'px';
				this.bulletDiv.style.left = this.left + 14 + 'px';
				break;

				case 'left':
				this.bulletDiv.style.top = this.top + 14;
				this.bulletDiv.style.left = this.left;
				break;

				case 'right':
				this.bulletDiv.style.top = this.top + 14;
				this.bulletDiv.style.left = this.left + 31;
				break;

				case 'down':
				this.bulletDiv.style.top = this.top + 31;
				this.bulletDiv.style.left = this.left + 14;
				break;
			}

			document.body.appendChild(this.bulletDiv);
		
	}

	this.move = function(k){
		if(this.bulletDiv.offsetTop <= 102 || this.bulletDiv.offsetTop >= 460 || this.bulletDiv.offsetLeft <= 552 || this.bulletDiv.offsetLeft >= 1012){
			document.body.removeChild(this.app.bullet[k].bulletDiv);
			this.app.bullet.splice(k,1);
		}
		switch(this.direction){
			case 'up':
				this.bulletDiv.style.top = this.bulletDiv.offsetTop-this.speed;
			break;
			case 'left':
				this.bulletDiv.style.left = this.bulletDiv.offsetLeft - this.speed;
			break;
			case 'right':
				this.bulletDiv.style.left = this.bulletDiv.offsetLeft + this.speed;
			break;
			case 'down':
				this.bulletDiv.style.top = this.bulletDiv.offsetTop + this.speed;
			break;
		}
			
	}

}
