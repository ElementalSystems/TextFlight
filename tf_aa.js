
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
	this.deltax=this.deltaz=0;
	
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

function aa_aircraft_addToGame(game)
{
	aa_static_addToGame.bind(this)(game);
	this.secondElement=DOMFromHTML(this.art.asHTML);
	setElementClass(this.secondElement,"second");
	game.playspace.appendChild(this.secondElement);		
	this.shadowElement=DOMFromHTML(this.art.asHTML);
	setElementClass(this.shadowElement,"shadow");
	game.playspace.appendChild(this.shadowElement);		
	game.avatar=this;
}


function aa_aircraft_init()
{
	aa_static_init.bind(this)();
	this.addToGame=aa_aircraft_addToGame;
	this.z=5;
	this.deltaz=0;
	this.deltax=0;
	
	this.updateDOM=function(){
		this.mainElement.style.left=(this.x+this.game.xoffset)+"em";
		this.mainElement.style.bottom=(this.y+this.game.yoffset)+"em";		
		this.mainElement.style.transform="translateZ("+this.z+"em) rotateY("+this.tilty+"deg)";		
		
		this.secondElement.style.left=(this.x+this.game.xoffset)+"em";
		this.secondElement.style.bottom=(this.y+this.game.yoffset)+"em";		
		this.secondElement.style.transform="translateZ("+(this.z-.5)+"em) rotateY("+this.tilty+"deg)";		
		this.shadowElement.style.left=(this.x+this.game.xoffset)+"em";
		this.shadowElement.style.bottom=(this.y+this.game.yoffset)+"em";		
		this.shadowElement.style.transform="translateZ(0em)";		
		
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
		this.x=limitRange(this.x,-50,50);
		
		if (game.isKeyDown(87)) { //up
		  this.deltaz-=this.deltazinc*game.frameTime/1000;
		} else if (game.isKeyDown(83)) { //down
		  this.deltaz+=this.deltazinc*game.frameTime/1000;
		} else 
		  this.deltaz-=(this.deltaz*this.deltazdampen)*game.frameTime/1000;
		
		this.deltaz=limitRange(this.deltaz,-this.deltazlimit,+this.deltazlimit);
		
		this.z+=this.deltaz*game.frameTime/1000;
		this.z=limitRange(this.z,2,20);
		
	}
}


