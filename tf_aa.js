
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
	if (!this.z) this.z=0;
	
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
	
	
	//kinda rough wave form
    var real = new Float32Array([0.000000,-0.000000,-0.203569,0.500000,-0.401676,0.137128,-0.104117,0.115965,-0.004413,0.067884,-0.008880,0.079300,-0.038756,0.011882,-0.030883,0.027608,-0.013429,0.003930,-0.014029,0.009720,-0.007653,0.007866,-0.032029,0.046127,-0.024155,0.023095,-0.005522,0.004511,-0.003593]);
    var imag = new Float32Array(real.length);
    var table = game.audioCtx.createPeriodicWave(real, imag);
  
	this.tone1=game.audioCtx.createOscillator();
    this.gain1 = game.audioCtx.createGain();
	this.tone1.setPeriodicWave(table); 
    this.tone1.frequency.value = this.basefreq1; 
	this.gain1.gain.value=this.basegain1;
    this.tone1.connect(this.gain1);
	this.gain1.connect(game.audioCtx.destination);
    this.tone1.start();

	this.tone2=game.audioCtx.createOscillator();
    this.gain2 = game.audioCtx.createGain();
	this.tone2.type = 'triangle'; 
    this.tone2.frequency.value = this.basefreq2; 
	this.gain2.gain.value=0;
    this.tone2.connect(this.gain2);
	this.gain2.connect(game.audioCtx.destination);
    this.tone2.start();

	this.tone3=game.audioCtx.createOscillator();
    this.gain3 = game.audioCtx.createGain();
	this.tone3.type = 'square'; 
    this.tone3.frequency.value = 300; 
	this.gain3.gain.value=0;
    this.tone3.connect(this.gain3);
	this.gain3.connect(game.audioCtx.destination);
	this.tone3.start();
	
    this.iscollisionmarked=false;

	
}

function aa_aircraft_removeFromGame()
{
	this.tone1.stop();
	this.tone1.disconnect()
	this.gain1.disconnect();
	this.tone2.stop();
	this.tone2.disconnect()
	this.gain2.disconnect();
	this.tone3.stop();
	this.tone3.disconnect()
	this.gain3.disconnect();
	
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
		  
		} else {
		  this.deltaz-=(this.deltaz*this.deltazdampen)*game.frameTime/1000;
		  
		}
		
		this.gain2.gain.value
		
		this.deltaz=limitRange(this.deltaz,-this.deltazlimit,+this.deltazlimit);
		
		this.gain2.gain.value=(this.deltazlimit+this.deltaz)*this.basegain2/(2*this.deltazlimit);
		
		this.z+=this.deltaz*game.frameTime/1000;
		this.z=limitRange(this.z,2,20);
		this.tone1.frequency.value=this.basefreq1-this.z;
		
        this.speed=this.maxspeed-(this.maxspeed-this.minspeed)*(this.z/20)
		this.y+=this.speed*game.speedFactor*game.frameTime/1000;
		
		this.recalcBounds();
		var collisions=this.countCollision();
		if (collisions>0) {
			this.game.damagetaken+=collisions*20*game.frameTime/1000;
			if (!this.iscollisionmarked) {
			  setElementClass(this.mainElement,"danger");
			  this.gain3.gain.value=1;
			  this.iscollisionmarked=true;
			}
		} else  {
			if (this.iscollisionmarked) {
			  unsetElementClass(this.mainElement,"danger");
			  this.gain3.gain.value=0;
			  this.iscollisionmarked=false;
			}
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
		  
		  var hitCount=0;
			
          if ((ob.art.normal==='y')&&(ob.art.mark_content)) { //for facing objects with content and spaces
		    //calculate the row (z difference)
			var row=Math.floor(ob.ze-zline);
			if (row<0) continue; //skimming by just skip italics
			
			//calculate the column limits
			var col1=(x1>ob.x)?x1-ob.x:0; //start at the left edge of the wing or the left egde of the object whichever is further right
			var col2=(x2<ob.xe)?x2-ob.x:ob.xl; //end at the right edge of the wing or the right egde of the object whichever is further left
			
			//now go through the text
			var text=ob.art.textlines[row];
			for (var j=col1;j<=col2;j+=1) 
				if (text.charAt(j)!=' ') hitCount+=1;
			
			if (hitCount==0) continue; //not a real problem!
						
          }	else {
			  hitCount=10;
		  }
		  
		  count+=hitCount;		  
		}
		return count;	
	}
	
}


