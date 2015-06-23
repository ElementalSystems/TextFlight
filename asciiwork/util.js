
   function random(min,max) {
     return min+(max-min)*Math.random();
   }
   
   function cycleRange(start,end,counter,duration)
   {
     return start+((end-start)*(counter%duration)/duration);
   }
   
   function pingPongRange(start,end,counter,duration)
   {
     var v=(counter%duration);
	 if (v>(duration/2)) 
	    return cycleRange(end,start,counter,duration/2);
	 else 	 
        return cycleRange(start,end,counter,duration/2);
   }
   
   
   function cycleArray(counter,duration,arr)
   {
     var v=cycleRange(0,arr.length,counter,duration);
	 return arr[Math.floor(v)];
   }
   
   /*
       Does a JSON.Parse with a single extra useful functionality:
	   any object (or subobject) with an attribute "_init" will cause a function to be executed
	   after the object is constructed, specifically "_init":"x1234" will cause the execution of x1234_init() 
	   with the this pointer bound to fully loaded object.	      
   */
   function jsonParseWithInitiator(jsonStr)
   {
     return JSON.parse(jsonStr,function(key,value) 
		   {   
			 if (key==='_init') {	    
				return eval(value+'_init');
			 }
			 if (typeof value == 'object') 
			   if (value._init) {
  			     value._init();
				 value._init=null;
			   }
			 
			 return value;
		   });
   }
   
   /*
     Returns the position of the mouse (or touch) event relative to the co-ordinate system of the given element.
   */
   function getEventPosFromElement(element,e)
   {
    var x;
	var y;
	if (e.touches) {
	  x = e.touches[0].pageX;
	  y = e.touches[0].pageY;		
	} else if (e.pageX || e.pageY) { 
	 x = e.pageX;
	 y = e.pageY;  
	} else { 
	 x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
	 y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
	} 

    var xPosition = 0;
    var yPosition = 0;
      
    while (element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: x-xPosition, y: y-yPosition };
   }
   
   //returns a keyed list of parameters from the URL
   //usage : on www.elementalsystems.co.za?editor=yes&fullscreen=n getURLVars()["editor"] returns "yes"
   function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }
  
  function setElementClass(e,cls)
  {
	  if (!e.classList.contains(cls))
		  e.classList.add(cls);
  }
  
  function unsetElementClass(e,cls)
  {
	  if (e.classList.contains(cls))
		  e.classList.remove(cls);
  }
  
  function repeatString(str,times) {
    return (new Array(times + 1)).join(str);
  }
  
  function httpGetDOMFragment(theUrl)
  {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
	var div = document.createElement('div');
    div.innerHTML = xmlHttp.responseText;
    return div.firstChild
  }
  