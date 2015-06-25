

var artLibrary={
   textsources: {},
   collection: {},   
};


  
function asciiart_init()
{
	//look up the text 
	var text=artLibrary.textsources[this.source].innerHTML;
	//now break it down into lines
	this.textlines=text.split('\n');
	//we will strip an empty line off top and bottom if we find it
	if (this.textlines[0].length==0) this.textlines.splice(0,1);
	if (this.textlines[this.textlines.length-1].length==0) this.textlines.splice(this.textlines.length-1,1);	
	
	//let's try calculate the width and height
	this.baseheight=this.textlines.length;
	if (!this.height) this.height=this.baseheight;
	this.basewidth=0;
	for (var i=0;i<this.baseheight;i+=1)
		if (this.textlines[i].length>this.basewidth) this.basewidth=this.textlines[i].length;
	if (!this.width) this.width=this.basewidth;	
		
	//now force the lines to the correct hieght
	
	for (var i=this.textlines.length;i<this.height;i+=1) 
	  this.textlines.push('\n');
    if (this.textlines.length>this.height) this.textlines=this.textlines.splice(this.height,1000);
	
	
	//now force the lines to the correct width	
	
	for (var i=0;i<this.height;i+=1) {
		if (this.textlines[i].length<this.width) this.textlines[i]+=repeatString(" ",this.width-this.textlines[i].length);
		if (this.textlines[i].length>this.width) this.textlines[i]=this.textlines[i].substring(0,this.width);
	}	
	
	if (this.repeat_x) { //fold out width
	  for (var i=0;i<this.textlines.length;i+=1) 
	    this.textlines[i]=repeatString(this.textlines[i],this.repeat_x);	    	  	    
	  this.width*=this.repeat_x;
	}
	
	if (this.repeat_y) {
	  var content=this.textlines.splice(0);
	  for (var i=0;i<this.repeat_y;i+=1) {
	    this.textlines=this.textlines.concat(content);
	  }
	  this.height*=this.repeat_y;
	}
	
	
	
	
	
	
	//now render the lines into an appropriate pre
	var t="<pre class='asciiart "+this.sprite_class+" normal_"+this.normal+"'>";
    for (var i=0;i<this.height;i+=1) {
		if (i>0) t+='\n';
		var cl="asciiline mod2_"+(i%2)+" mod3_"+(i%3);		
		var text=this.textlines[i];
		//now preprocess text
		if (this.mark_content)
		  text=text.replace(/\S.*\S/g, function custom(x) { return "<span class=solid>"+x+"</span>";} );
		if (this.mark_a)
		  text=text.replace(new RegExp(this.mark_a,'g'), function custom(x) { return "<span class=mark_a>"+x+"</span>";} );
		if (this.mark_b)
		  text=text.replace(new RegExp(this.mark_b,'g'), function custom(x) { return "<span class=mark_b>"+x+"</span>";} );
		if (this.mark_c)
		  text=text.replace(new RegExp(this.mark_c,'g'), function custom(x) { return "<span class=mark_c>"+x+"</span>";} );
		if (this.mark_d)
		  text=text.replace(new RegExp(this.mark_d,'g'), function custom(x) { return "<span class=mark_d>"+x+"</span>";} );
		
		t+="<span class='"+cl+"'>"+text+"</span>";	
	}
	t+="</pre>";
	this.asHTML=t;	
}


function loadArtLibrary(doc)
{
   var srcs=doc.getElementsByClassName('asciiart_text')
   for (i=0;i<srcs.length;i+=1)
     artLibrary.textsources[srcs[i].id]=srcs[i];

   var defs=doc.getElementsByClassName('asciiart_def')
   for (i=0;i<defs.length;i+=1)
     artLibrary.collection[defs[i].id]=jsonParseWithInitiator(defs[i].innerHTML);   
}  

function loadArtFromURL(url)
{
   var o=httpGetDOMFragment(url);
   loadArtLibrary(o);
}
  
  
