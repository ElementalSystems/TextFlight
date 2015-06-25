


var game= {
	playspace: document.getElementById('playspace'),
	contents: [],
	backmost_y: 0,
	xoffset: 50,
	xcenter: 50,
	yoffset: 0,	
	frameNumber: 0,
	
	
	
	addSection: function(sectionText) {
       var section=jsonParseWithInitiator(sectionText);
       for (var i=0;i<section.content.length;i+=1) 
           section.content[i].addToGame(this);		   
	   this.contents=this.contents.concat(section.content)
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
	  
	  for (var i=0;i<this.contents.length;i+=1) 
		 if (this.contents[i].tick) this.contents[i].tick();
	  
	  if (this.avatar) {
	    this.xoffset=this.xcenter-this.avatar.x;
		var angle=75-this.avatar.z;
		this.playspace.style.transform="rotateX("+angle+"deg)"
	
	  //this.yoffset=cycleRange(30,-30,timestamp,10000);	  
	  }
	  
	  for (var i=0;i<this.contents.length;i+=1) 
		 this.contents[i].updateDOM();
      
      
	},
	
	init: function() {
	   var self=this;
	   this.playspace.onkeydown=function(evt) { self.keyEvent(evt.keyCode,1);  };
       this.playspace.onkeyup=function(evt) { self.keyEvent(evt.keyCode,0);  };
	   this.playspace.focus();
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