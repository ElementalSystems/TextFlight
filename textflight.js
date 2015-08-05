
loadArtFromURL('art.html');
loadArtFromURL('art_tut.html');
loadArtFromURL('art_jet.html');
loadSectionsFromURL('sections.html');


start();

function startLevelTut()
{
  setElementClass(document.getElementById('playframe'),'playmode');
  unsetElementClass(document.getElementById('playframe'),'menumode');
  game.clearContent();
  game.addSection(sectionLibrary.getById('start_t'),0,game.backmost_y);
  game.addSection(sectionLibrary.getById('empty_t'),0,game.backmost_y);
  game.addSection(sectionLibrary.getById('empty_t'),0,game.backmost_y);
  game.addSection(sectionLibrary.getById('empty_t'),0,game.backmost_y);
  game.addSection(sectionLibrary.getById('tut_lr1'),0,game.backmost_y);
  game.addSection(sectionLibrary.getById('empty_t'),0,game.backmost_y);
  game.addSection(sectionLibrary.getById('empty_t'),0,game.backmost_y);
  game.addSection(sectionLibrary.getById('tut_ud1'),0,game.backmost_y);
  game.addSection(sectionLibrary.getById('empty_t'),0,game.backmost_y);
  game.addSection(sectionLibrary.getById('empty_t'),0,game.backmost_y);
  game.addSection(sectionLibrary.getById('tut_speed'),0,game.backmost_y);
  game.addSection(sectionLibrary.getById('empty_t'),0,game.backmost_y);
  game.addSection(sectionLibrary.getById('empty_t'),0,game.backmost_y);
  game.addSection(sectionLibrary.getById('tut_speed'),0,game.backmost_y);
  game.courselength=1500;
  return false;
}

function startLevelBasic()
{
  setElementClass(document.getElementById('playframe'),'playmode');
  unsetElementClass(document.getElementById('playframe'),'menumode');
  game.clearContent();
  game.addSection(sectionLibrary.getById('start_b'),0,game.backmost_y);
  game.addSection(sectionLibrary.getById('empty_b'),0,game.backmost_y);
  game.addSection(sectionLibrary.getById('empty_b'),0,game.backmost_y);
  game.addSection(sectionLibrary.getById('empty_b'),0,game.backmost_y);
  game.addSection(sectionLibrary.getById('empty_b'),0,game.backmost_y);
  game.addSection(sectionLibrary.getById('empty_b'),0,game.backmost_y);
  game.courselength=3000;
  return false;
}

function startLevelJet()
{
  setElementClass(document.getElementById('playframe'),'playmode');
  unsetElementClass(document.getElementById('playframe'),'menumode');
  game.clearContent();
  game.addSection(sectionLibrary.getById('start_j'),0,game.backmost_y);
  game.addSection(sectionLibrary.getById('empty_j'),0,game.backmost_y);
  game.addSection(sectionLibrary.getById('empty_j'),0,game.backmost_y);
  game.addSection(sectionLibrary.getById('empty_j'),0,game.backmost_y);
  game.addSection(sectionLibrary.getById('empty_j'),0,game.backmost_y);
  game.addSection(sectionLibrary.getById('empty_j'),0,game.backmost_y);
  game.courselength=5000;
  return false;
}

function endGame(success)
{
  setElementClass(document.getElementById('playframe'),'endmode');
  unsetElementClass(document.getElementById('playframe'),'playmode');
  if (success) 
	 document.getElementById('endresult').innerHTML="MISSION COMPLETED"
  else
	 document.getElementById('endresult').innerHTML="MISSION FAILED"
  game.clearContent();
}

function mainMenu()
{
  unsetElementClass(document.getElementById('playframe'),'endmode');
  unsetElementClass(document.getElementById('playframe'),'playmode');
  setElementClass(document.getElementById('playframe'),'menumode');
}