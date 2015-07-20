
loadArtFromURL('art.html');
loadSectionsFromURL('sections.html');




function editorUpdate()
{
	sectionText=document.getElementById('editorCode').value;
	try {
		jsonParseWithInitiator(sectionText);
        document.getElementById('parseStatus').innerHTML="Parse Okay";	
    } 
	catch (e) {
		sectionText="";
		document.getElementById('parseStatus').innerHTML=e.message;
	}
	game.clearContent();
	game.addSection(sectionLibrary.getById('start1'),0,game.backmost_y);
	addcount=0;
}

game.addTerrain=function() 
{	     
	if (addcount%2) { 
	    //try to add our guy if he's available or an empty 
		if (sectionText.length>5)
		  game.addSection(sectionText,0,game.backmost_y);
	    else
		  game.addSection(sectionLibrary.getById('empty1'),0,game.backmost_y);
	} else
		game.addSection(sectionLibrary.getById('empty1'),0,game.backmost_y);
	addcount+=1;
}

start();


var addcount=0;

document.getElementById('editorCode').innerHTML=sectionLibrary.getById('empty1');
editorUpdate();
