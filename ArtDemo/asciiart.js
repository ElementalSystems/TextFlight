
function renderAsHTML(art_id)
{
	var t="<pre class='asciiart "+art.sprite_class+"'>";
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
	
	
}