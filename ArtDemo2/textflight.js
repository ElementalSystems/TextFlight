
loadArtFromURL('art.html');

var o=httpGetDOMFragment('sections.html');
var sectionText=o.getElementsByClassName('aa_section_def')[0].innerHTML;
game.addSection(sectionText);
start();
