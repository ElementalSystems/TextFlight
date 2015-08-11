
loadArtFromURL('art.html');
loadArtFromURL('art_tut.html');
loadArtFromURL('art_jet.html');
loadSectionsFromURL('sections.html');


start();

function startLevelTut()
{
  ga('send', 'event', 'StartTut');
  setElementClass(document.getElementById('playframe'),'playmode');
  unsetElementClass(document.getElementById('playframe'),'menumode');
  game.clearContent();  
  game.addSection(sectionLibrary.getById('start_t'),0,game.backmost_y);
  game.terrainQueue=['empty_t','scene1_t','scene1_t','tut_lr1','empty_t','tut_ud1','scene1_t','empty_t','scene2_t','empty_t','tut_speed','empty_t','tut_speed'];
  game.courselength=1000;
  return false;
}

function startLevelBasic()
{
  ga('send', 'event', 'StartBasic');
  setElementClass(document.getElementById('playframe'),'playmode');
  unsetElementClass(document.getElementById('playframe'),'menumode');
  game.clearContent();
  game.addSection(sectionLibrary.getById('start_b'),0,game.backmost_y);
  game.terrainQueue=['empty_b','empty_b','empty_b','empty_b','empty_b','empty_b'];
  game.courselength=3000;
  return false;
}

function startLevelJet()
{
  ga('send', 'event', 'StartJet');
	  
  setElementClass(document.getElementById('playframe'),'playmode');
  unsetElementClass(document.getElementById('playframe'),'menumode');
  game.clearContent();
  game.addSection(sectionLibrary.getById('start_j'),0,game.backmost_y);
  game.terrainQueue=['empty_j','empty_j','empty_j','empty_j'];
  game.courselength=5000;
  return false;
}

function endGame(success)
{
  setElementClass(document.getElementById('playframe'),'endmode');
  unsetElementClass(document.getElementById('playframe'),'playmode');
  if (success) {
	 document.getElementById('endresult').innerHTML="MISSION COMPLETED";
	 document.getElementById('endresult2').innerHTML=game.damagetaken.toFixed(0)+"% Damage Taken";	 
	 ga('send', 'event', 'completed');
  } else {
	 var progress=-game.yoffset*100/game.courselength;	  
	 document.getElementById('endresult').innerHTML="MISSION FAILED"
	 document.getElementById('endresult2').innerHTML=progress.toFixed(0)+"% Completed";
	 ga('send', 'event', 'failed');
  }
  game.clearContent();
}

function mainMenu()
{
  unsetElementClass(document.getElementById('playframe'),'endmode');
  unsetElementClass(document.getElementById('playframe'),'playmode');
  setElementClass(document.getElementById('playframe'),'menumode');
}