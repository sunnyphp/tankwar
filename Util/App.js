/*
	app主类 架构类
	负责游戏界面生成和整个游戏监听
	和各种对象的生成调用
*/

function App(){
	this.mapDiv;
	//游戏地图大小
	this.mapWidth = '500px';
	this.mapHeight = '400px';
	this.mytank;
	this.aitank;
	this.bullet;
	this.run_set;
	this.b_set;
	this.boom = new Array();

	this.wallDiv;
	this.grassDiv;
	this.grassDiv1;
	this.lifeDiv;

	//游戏初始化
	this.init = function(){
		this.mytank = new Tank('up',400,760,this,true);
		this.mytank.drawTank();
		this.keyListen();
		this.drawMap();
		this.bullet = new Array();
		this.aitank = new Array();
		this.aitank.push(new Tank('down',120,660,this,false));
		this.aitank.push(new Tank('left',120,760,this,false));
		this.aitank.push(new Tank('right',120,860,this,false));
		this.aitank.push(new Tank('up',120,960,this,false));
		
		_this = this;
		//游戏事件监听
		this.run_set = setInterval("_this.run()",50);
		
		for(i=0;i<this.aitank.length;i++){
			this.aitank[i].drawTank(i);
		}

		//ai坦克子弹填充
		this.b_set = setInterval(function(){
			for(i=0;i<_this.aitank.length;i++){
				aiBullet = new Bullet(_this.aitank[i].tankDiv.offsetTop,_this.aitank[i].tankDiv.offsetLeft,_this.aitank[i].direction,_this.aitank[i].good,_this);
				aiBullet.drawBullet();
				_this.bullet.push(aiBullet);
			}
		},3000);
		
		
	}
	
	this.run = function(){
		//子弹循环
		for(k=0;k<this.bullet.length;k++){
			if(this.bullet[k] != null){
				this.bullet[k].move(k);
			}
			//ai子弹打到玩家坦克
			if(this.mytank != null && this.bullet[k] != null && !this.bullet[k].good &&  Math.abs(this.bullet[k].bulletDiv.offsetLeft+2-this.mytank.tankDiv.offsetLeft-16)<=18 && Math.abs(this.bullet[k].bulletDiv.offsetTop+2-this.mytank.tankDiv.offsetTop-16)<=18){
				boomBullet1 = new Boom(this.mytank.tankDiv.offsetTop-16,this.mytank.tankDiv.offsetLeft);
				boomBullet1.drawBoom();
				boomBullet1.run();
				//document.body.removeChild(this.mytank.tankDiv);
				document.body.removeChild(this.bullet[k].bulletDiv);
				this.bullet.splice(k,1);
				this.mytank.tankDiv.style.top = '400px';
				this.mytank.tankDiv.style.left = '760px';
				if(this.mytank.life == 1){
					this.mytank.life--;
					document.body.removeChild(this.mytank.tankDiv);
					this.lifeDiv.innerHTML = '生命值 '+ this.mytank.life;
				}else{
					this.mytank.life--;
					this.lifeDiv.innerHTML = '生命值 '+ this.mytank.life;
				}
				
			}
			//玩家子弹打到ai坦克
			if(this.bullet[k] != null　&&　this.bullet[k].good){
				for(j=0;j<this.aitank.length;j++){
				if(this.bullet[k] != null && Math.abs(this.bullet[k].bulletDiv.offsetLeft+2-this.aitank[j].tankDiv.offsetLeft-16)<=18 && Math.abs(this.bullet[k].bulletDiv.offsetTop+2-this.aitank[j].tankDiv.offsetTop-16)<=18){
					boomBullet2 = new Boom(this.aitank[j].tankDiv.offsetTop-16,this.aitank[j].tankDiv.offsetLeft);
					boomBullet2.drawBoom();
					boomBullet2.run();
					document.body.removeChild(this.aitank[j].tankDiv);
					this.aitank.splice(j,1);
					document.body.removeChild(this.bullet[k].bulletDiv);
					this.bullet.splice(k,1);
				}		
			}
			}
		}

		if(this.mytank.life == 0){
			setTimeout(function(){
				alert('游戏失败~！');
				clearInterval(this.run_set);
				clearInterval(this.b_set);
				location.reload(true);
			},600);
			delete this.mytank;
		}

		if(this.aitank.length == 0 && this.mytank != null){
			clearInterval(this.run_set);
			clearInterval(this.b_set);
			setTimeout(function(){
				alert('游戏胜利~！');
				location.reload(true);
			},600);
		}
		//玩家坦克撞到ai坦克
		for(m=0;m<this.aitank.length;m++){
			if(this.mytank != null && this.aitank[m] != null && Math.abs(this.aitank[m].tankDiv.offsetLeft - this.mytank.tankDiv.offsetLeft) <= 32 && Math.abs(this.aitank[m].tankDiv.offsetTop - this.mytank.tankDiv.offsetTop) <= 32){
					boomBullet3 = new Boom(this.aitank[m].tankDiv.offsetTop-16,this.aitank[m].tankDiv.offsetLeft);
					boomBullet3.drawBoom();
					boomBullet3.run();
					document.body.removeChild(this.aitank[m].tankDiv);
					this.aitank.splice(m,1);
					this.mytank.tankDiv.style.top = '400px';
					this.mytank.tankDiv.style.left = '760px';
					if(this.mytank.life == 1){
						this.mytank.life--;
						document.body.removeChild(this.mytank.tankDiv);
						this.lifeDiv.innerHTML = '生命值 '+ this.mytank.life;
					}else{
						this.mytank.life--;
						this.lifeDiv.innerHTML = '生命值 '+ this.mytank.life;
					}
					
				}
		}
		//ai坦克之间碰撞
		for(i=0;i<this.aitank.length;i++){
			for(j=0;j<this.aitank.length;j++){
				if(this.aitank[i] != this.aitank[j] && Math.abs(this.aitank[i].tankDiv.offsetLeft - this.aitank[j].tankDiv.offsetLeft) <= 32 && Math.abs(this.aitank[i].tankDiv.offsetTop - this.aitank[j].tankDiv.offsetTop) <= 32){
					console.log(i+'hit'+j);
				}
			}
		}
	}

	//游戏地图
	this.drawMap = function (){
		this.mapDiv = document.createElement('div');
		this.mapDiv.id = 'mapDiv';
		this.mapDiv.style.width = this.mapWidth;
		this.mapDiv.style.height = this.mapHeight;
		this.mapDiv.style.margin = '100px auto';
		this.mapDiv.style.backgroundColor = "black";
		this.mapDiv.focus();
		document.body.appendChild(this.mapDiv);

		//生命值
		this.lifeDiv = document.createElement('div');
		this.lifeDiv.style.width = '100px';
		this.lifeDiv.style.height = '49px'
		this.lifeDiv.style.left = '400px';
		this.lifeDiv.style.top = '220px';
		this.lifeDiv.style.position= 'absolute';
		//this.lifeDiv.style.border = '1px solid black';
		this.lifeDiv.style.color = 'red';
		this.lifeDiv.innerHTML= '生命值:'+this.mytank.life;
		document.body.appendChild(this.lifeDiv);

		//画一排草地
		this.grassDiv = new Array();
		this.grassDiv.push(document.createElement('div'));
		this.grassDiv.push(document.createElement('div'));
		this.grassDiv.push(document.createElement('div'));
		this.grassDiv.push(document.createElement('div'));
		this.grassDiv.push(document.createElement('div'));
		this.grassDiv.push(document.createElement('div'));
		
		for(g=0;g<this.grassDiv.length;g++){
			this.grassDiv[g].style.width = '32px';
			this.grassDiv[g].style.height = '32px';
			this.grassDiv[g].style.left = 700 + 32*g +'px';
			this.grassDiv[g].style.top = '200px';
			this.grassDiv[g].style.position= 'absolute';
			this.grassDiv[g].style.backgroundImage = "url('Util/Terr.png')";
			this.grassDiv[g].style.backgroundPosition = '0,0';
			document.body.appendChild(this.grassDiv[g]);
		}
		//画一排草地
		this.grassDiv1 = new Array();
		this.grassDiv1.push(document.createElement('div'));
		this.grassDiv1.push(document.createElement('div'));
		this.grassDiv1.push(document.createElement('div'));
		this.grassDiv1.push(document.createElement('div'));
		this.grassDiv1.push(document.createElement('div'));
		this.grassDiv1.push(document.createElement('div'));
		
		for(g=0;g<this.grassDiv1.length;g++){
			this.grassDiv1[g].style.width = '32px';
			this.grassDiv1[g].style.height = '32px';
			this.grassDiv1[g].style.left = 700 + 32*g +'px';
			this.grassDiv1[g].style.top = '300px';
			this.grassDiv1[g].style.position= 'absolute';
			this.grassDiv1[g].style.backgroundImage = "url('Util/Terr.png')";
			this.grassDiv1[g].style.backgroundPosition = '0,0';
			document.body.appendChild(this.grassDiv1[g]);
		}
	}

	//玩家键盘监听
	this.keyListen = function(){
	tankObj = this;
	document.onkeydown = function(event){
	var e = event || window.event || arguments.callee.caller.arguments[0];
		switch(e.keyCode){
			case 39:
				tankObj.mytank.changeDirection('right');
				tankObj.mytank.move();
			break;
			case 40:
				tankObj.mytank.changeDirection('down');
				tankObj.mytank.move();
			break;
			case 37:
				tankObj.mytank.changeDirection('left');
				tankObj.mytank.move();
			break;
			case 38:
				tankObj.mytank.changeDirection('up');
				tankObj.mytank.move();
			break;
			case 17:
				tankObj.mytank.fire();
			break;
			}
		}
	
	}
}

function $(id){
	return document.getElementById(id);
}