
loadArtFromURL('art.html');

function start()
{
  window.requestAnimationFrame(gameTick);	
}
   
function gameTick(timestamp) 
{
	game.tick(timestamp);
	window.requestAnimationFrame(gameTick);
}


var game= {
	playspace: document.getElementById('playspace'),
	contents: [],
	backmost_y: 0,
	xoffset: 50,
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
	  
	  for (var i=0;i<this.contents.length;i+=1) 
		 this.contents[i].updateDOM();
	  
      this.yoffset=cycleRange(200,0,timestamp,10000);	  
	  this.xoffset=pingPongRange(20,80,timestamp,5000);	  
	  
	}
	
	


	
};

function aa_static_addToGame(game)
{
	this.mainElement=DOMFromHTML(this.art.asHTML);
	this.game=game;
	game.playspace.appendChild(this.mainElement);		
}

function aa_static_init()
{
	this.art=artLibrary.collection[this.artname];
	this.addToGame=aa_static_addToGame;
	switch (this.normal) {
		case 'x':
		  break;
		case 'y':
		  break;
		case 'z':
		  break;
	}
	
	this.updateDOM=function(){
		this.mainElement.style.left=(this.x+this.game.xoffset)+"em";
		this.mainElement.style.bottom=(this.y+this.game.yoffset)+"em";		
	}
	
}

var o=httpGetDOMFragment('sections.html');
var sectionText=o.getElementsByClassName('aa_section_def')[0].innerHTML;
game.addSection(sectionText);
start();
