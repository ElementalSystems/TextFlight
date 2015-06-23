
function renderAsHTML(art_id)
{
	var art=document.getElementById(art_id);
	var content=art.getElementsByClass("asciidata")[0].innerHTML;
	var meta=art.getElementsByClass("meta")[0].innerHTML;
	t+=content;
	
	t+="</pre>";
	return t;
	
	
	
}

function asciiart_init()
{
	//look up the text 
	var text=document.getElementById(this.source).innerHTML;
	//now break it down into lines
	this.textlines=text.split('\n');
	//we will strip an empty line off top and bottom if we find it
	if (this.textlines[0].length==0) this.textlines.splice(0,1);
	if (this.textlines[this.textlines.length-1].length==0) this.textlines.splice(this.textlines.length-1,1);	
	//let's try calculate the width and height
	this.baseheight=this.textlines.length;
	if (!this.height) this.height=this.basewidth;
	this.basewidth=0;
	for (var i=0;i<this.baseheight;i+=1)
		if (this.textlines[i].length>this.basewidth) this.basewidth=this.textlines[i].length;
	if (!this.width) this.width=this.basewidth;	
	//TODO forced fold out of longer widths and heights
	
	//now render the lines into an appropriate pre
	var t="<pre class='asciiart "+this.sprite_class+"'>";
    for (var i=0;i<this.baseheight;i+=1) {
		if (i>0) t+='\n';
		t+=this.textlines[i];	
	}
	t+="</pre>";
	this.asHTML=t;	
}



