//boom类

function Boom(x,y){
	this.x = parseInt(x)-15;
	this.y = parseInt(y)-15;
	this.boomDiv;
	
	this.drawBoom = function (){
			this.boomDiv = document.createElement('div');
			this.boomDiv.id = 'boomDiv';
			this.boomDiv.style.top = this.x+'px';
			this.boomDiv.style.left = this.y+'px';
			this.boomDiv.style.position = 'absolute';
			this.boomDiv.style.width = '64px';
			this.boomDiv.style.height = '64px';
			this.boomDiv.style.background = "url('Util/Boom.png')";
			this.boomDiv.style.backgroundPosition = "-64px,0px";
			document.body.appendChild(this.boomDiv);
			

	}

	this.run = function(i){
		//var boomName = new Array();
		boomName = this;
			t = setInterval(function(){
			str = boomName.boomDiv.style.backgroundPosition;
			start = parseInt(str.substring(0,str.indexOf('px')));
			if(start < -280){
				clearInterval(t);
				//alert(boomName);
				document.body.removeChild(boomName.boomDiv);
			}else{
				start=start-64;
				boomName.boomDiv.style.backgroundPosition = " "+start+"px 0px";
			}
		},100);
	}

}
