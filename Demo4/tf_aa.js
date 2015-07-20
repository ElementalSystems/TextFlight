
function aa_static_addToGame(game,xoff,yoff)
{
	this.mainElement=DOMFromHTML(this.art.asHTML);
	game.lastzindex-=1;
	this.zindex=game.lastzindex;
	this.game=game;
	game.playspace.appendChild(this.mainElement);		
	
	//establish the positions in space of the objets
	this.x+=xoff;
	if (this.xvar) this.x+=random(0,this.xvar);
	this.y+=yoff;
	if (this.yvar) this.y+=random(0,this.yvar);
	this.z=0;
	
	switch (this.art.normal) {
		case 'y':
		  this.xl=this.art.width;
		  this.yl=.5;
		  this.zl=this.art.height;
		  this.zindex+=11000;
		  break;
		case 'x':
		  this.xl=.5;
		  this.yl=this.art.width*this.game.cwidthratio;
		  this.zl=this.art.height;
		  this.zindex+=10000;
		  break;
		case 'z': 
		default:
		  this.xl=this.art.width;		  
		  this.yl=this.art.height;
		  this.zl=.5;
		  break;
		  
	};
	
	this.mainElement.style.zIndex=this.zindex;
	
	this.recalcBounds=function() {
	  this.xe=this.x+this.xl;
      this.ye=this.y+this.yl;
      this.ze=this.z+this.zl;
	};
	
	this.recalcBounds();
	game.contents.push(this);	  			
}

function aa_static_removeFromGame()
{
	game.playspace.removeChild(this.mainElement);		
}

function aa_static_init()
{
	this.art=artLibrary.collection[this.artname];
	this.addToGame=aa_static_addToGame;
	this.removeFromGame=aa_static_removeFromGame;
	this.deltax=this.deltaz=0;	
	
	switch (this.normal) {
		case 'x':
		  break;
		case 'y':
		  break;
		case 'z':
	      break;
	};
	
	this.updateDOM=function(){
		this.mainElement.style.left=((this.x+this.game.xoffset)*this.game.cwidthinpixels)+"px";
		this.mainElement.style.bottom=((this.y+this.game.yoffset)*this.game.cheightinpixels)+"px";		
	};	
}

function aa_aircraft_addToGame(game,xoff,yoff)
{	
	aa_static_addToGame.bind(this)(game,xoff,yoff);
	this.secondElement=DOMFromHTML(this.art.asHTML);
	this.mainElement.style.zIndex=this.zindex+10;
	this.secondElement.style.zIndex=this.zindex+9;
	setElementClass(this.secondElement,"second");
	game.playspace.appendChild(this.secondElement);		
	this.shadowElement=DOMFromHTML(this.art.asHTML);
	this.shadowElement.style.zIndex=this.zindex+8;	
	setElementClass(this.shadowElement,"shadow");
	game.playspace.appendChild(this.shadowElement);		
	game.avatar=this;
}

function aa_aircraft_removeFromGame()
{
	game.playspace.removeChild(this.mainElement);
	game.playspace.removeChild(this.secondElement);
	game.playspace.removeChild(this.shadowElement);
	if (game.avatar==this) game.avatar=null;
}

function aa_aircraft_init()
{
	aa_static_init.bind(this)();
	this.addToGame=aa_aircraft_addToGame;
	this.removeFromGame=aa_aircraft_removeFromGame;
	this.z=5;
	this.deltaz=0;
	this.deltax=0;
	
	this.updateDOM=function(){
		this.mainElement.style.left=((this.x+this.game.xoffset)*this.game.cwidthinpixels)+"px";
		this.mainElement.style.bottom=((this.y+this.game.yoffset)*this.game.cheightinpixels)+"px";		
		this.mainElement.style.transform="translateZ("+this.z+"em) rotateY("+this.tilty+"deg)";		
		
		this.secondElement.style.left=((this.x+this.game.xoffset)*this.game.cwidthinpixels)+"px";
		this.secondElement.style.bottom=((this.y+this.game.yoffset)*this.game.cheightinpixels)+"px";;		
		this.secondElement.style.transform="translateZ("+(this.z-.5)+"em) rotateY("+this.tilty+"deg)";		
		this.shadowElement.style.left=((this.x+this.game.xoffset)*this.game.cwidthinpixels)+"px";
		this.shadowElement.style.bottom=((this.y+this.game.yoffset)*this.game.cheightinpixels)+"px";		
		this.shadowElement.style.transform="translateZ(0.2em)";		
		
	}	
	
	this.tick=function()
	{
		if (game.isKeyDown(65)) { //steer left
		  this.deltax-=this.deltaxinc*game.frameTime/1000;
		} else if (game.isKeyDown(68)) { //steer right
		  this.deltax+=this.deltaxinc*game.frameTime/1000;
		} else 
		  this.deltax-=(this.deltax*this.deltaxdampen)*game.frameTime/1000;
		
		this.deltax=limitRange(this.deltax,-this.deltaxlimit,+this.deltaxlimit);
		
		this.tilty=(this.deltax/this.deltaxlimit)*15;
		this.x+=this.deltax*game.frameTime/1000;
		this.x=limitRange(this.x,-100,100);
		
		if (game.isKeyDown(87)) { //up
		  this.deltaz-=this.deltazinc*game.frameTime/1000;
		} else if (game.isKeyDown(83)) { //down
		  this.deltaz+=this.deltazinc*game.frameTime/1000;
		} else 
		  this.deltaz-=(this.deltaz*this.deltazdampen)*game.frameTime/1000;
		
		this.deltaz=limitRange(this.deltaz,-this.deltazlimit,+this.deltazlimit);
		
		this.z+=this.deltaz*game.frameTime/1000;
		this.z=limitRange(this.z,2,20);
	
        this.speed=this.maxspeed-(this.maxspeed-this.minspeed)*(this.z/20)
		this.y+=this.speed*game.frameTime/1000;
		
		this.recalcBounds();
		var collisions=this.countCollision();
		if (collisions>0) {
			setElementClass(this.mainElement,"danger");
		} else  {
			unsetElementClass(this.mainElement,"danger");
		}
			
	}
	
	this.countCollision=function () {
		var count=0;
		//walk the list and check for collisions
		var yline=this.y+this.hitzone_y;
		var x1=this.x+this.hitzone_x1;
		var x2=this.x+this.hitzone_x2;
		var zline=this.z;
		
		for (var i=0;i<this.game.contents.length;i+=1) {
		  var ob=this.game.contents[i];
		  if (ob===this) continue; //ignore myself
		  if (yline<ob.y) continue; //still ahead
		  if (yline-2>ob.ye) continue; //way behind
		  if (zline>ob.ze) continue; //above
		  if (zline<ob.z) continue;  //below		  
		  if (x2<ob.x) continue;
		  if (x1>ob.xe) continue;	
		  
          if ((ob.art.normal==='y')&&(ob.art.mark_content)) { //for facing objects with content and spaces
		    //calculate the row (z difference)
			var row=Math.floor(ob.ze-zline);
			if (row<0) continue; //skimming by just skip italics
			
			//calculate the column limits
			var col1=(x1>ob.x)?x1-ob.x:0; //start at the left edge of the wing or the left egde of the object whichever is further right
			var col2=(x2<ob.xe)?x2-ob.x:ob.xl; //end at the right edge of the wing or the right egde of the object whichever is further left
			
			//now go through the text
			var text=ob.art.textlines[row];
			var hitCount=0;
			for (var j=col1;j<=col2;j+=1) 
				if (text.charAt(j)!=' ') hitCount+=1;
			
			if (hitCount==0) continue; //not a real problem!
						
          }	
		  
		  count+=1;		  
		}
		return count;	
	}
	
}


