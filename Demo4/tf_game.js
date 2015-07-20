


var game= {
	playspace: document.getElementById('playspace'),
	contents: [],
	backmost_y: 0,
	xoffset: 50,
	xcenter: 50,
	yoffset: 0,	
	yextra:  0,
	frameNumber: 0,		
	lastzindex: 10000,
	
	addSection: function(sectionText,xoff,yoff) {
       var section=jsonParseWithInitiator(sectionText);
       for (var i=0;i<section.content.length;i+=1) {
           section.content[i].addToGame(this,xoff,yoff);		   		   
		   if (section.content[i].ye>this.backmost_y) this.backmost_y=section.content[i].ye;		   
	   }
	   this.nextextendtype=section.extendtype;
    },
	
	
	tick: function(timestamp) {
	  //calculate frame length
	  if (this.frameNumber==0) { //first frameNumber
	    this.frameStart=timestamp-50;		
		this.gameStart=timestamp;
	  }
	  this.worldTime=timestamp;
	  this.frameTime=this.worldTime-this.frameStart;
	  this.frameNumber+=1;
	  this.gameTime=this.worldTime-this.gameStart;
      this.frameStart=timestamp;		
	  this.killist=[];
	  
	  for (var i=0;i<this.contents.length;i+=1) 
		 if (this.contents[i].tick) this.contents[i].tick();
	  
	  if (this.avatar) {
	    this.xoffset=this.xcenter-this.avatar.x;
		var angle=70-this.avatar.z;
		this.playspace.style.transform="rotateX("+angle+"deg)"
        this.yoffset=this.yextra-this.avatar.y;		
	  }
	  
	  for (var i=0;i<this.contents.length;i+=1) {
		 this.contents[i].updateDOM();
		 if (this.contents[i].y+this.yoffset<-50) this.killist.push(this.contents[i]);
	  }
	  
	  //kill any items due for removal
	  for (var i=0;i<this.killist.length;i+=1) {
		 var ind=this.contents.indexOf(this.killist[i]);
		 if (ind==-1) continue;
		 this.contents.splice(ind,1);
		 this.killist[i].removeFromGame();		 
	  }    
	  
	  //think we need more stuff?
	  if (this.backmost_y+this.yoffset<200)
		  this.addTerrain();
	  	 	   
 	},
	
	init: function() {
	   var self=this;
	   this.playspace.onkeydown=function(evt) { self.keyEvent(evt.keyCode,1);  };
       this.playspace.onkeyup=function(evt) { self.keyEvent(evt.keyCode,0);  };
	   this.playspace.focus();
	   this.clearContent();
	   var e=document.getElementById('measureme');
	   this.cwidthinpixels=e.clientWidth;
	   this.cheightinpixels=e.clientHeight;
	   this.cwidthratio=this.cwidthinpixels/this.cheightinpixels;
	   this.xcenter=(this.playspace.clientWidth/this.cwidthinpixels/2);
	   
	},
	
	clearContent: function() {
		for (var i=0;i<this.contents.length;i+=1) 
		  this.contents[i].removeFromGame();
        this.contents=[]
		this.frameNumber=0;
		this.backmost_y=0;
	},
	
	addTerrain: function()
	{
		this.addSection(sectionLibrary.selectRandomByClass(this.nextextendtype),0,this.backmost_y);
	},
	
	
	//keyboard handler
	keyList: [],
	
	keyEvent: function(keyCode,keyDown) {
		this.keyList[keyCode]=keyDown;
	},
		
	isKeyDown: function(keyCode) {
	    return this.keyList[keyCode];
	}	
};


function start()
{
  game.init();
  window.requestAnimationFrame(gameTick);	
  
}
   
function gameTick(timestamp) 
{
	game.tick(timestamp);
	window.requestAnimationFrame(gameTick);
	
}