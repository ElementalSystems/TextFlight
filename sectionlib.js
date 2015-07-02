
var sectionLibrary={
	root: null,
	getById: function(id) {
		return root.querySelector('#'+id).innerHTML;
	},
	
	selectRandomByClass: function(cls) {
		var list=root.querySelectorAll('.aa_section_def.'+cls)
		var ind=randomInt(0,list.length-1);
		return list[ind].innerHTML;
	}
};

function loadSectionsFromURL(url)
{
	this.root=httpGetDOMFragment('sections.html');
}
