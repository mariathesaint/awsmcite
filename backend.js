function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}


function makePackage(usage, resp){
	var finString;
	console.log(resp);
	var regex = new RegExp('\\n', 'g');
	var regex2 = new RegExp('\\"', 'g');
	var regex3 = new RegExp(',', 'g');

	resp="Network data: " + resp.slice(4,-2).replace(regex, " ");
	resp=resp.replace(regex2, "");
	resp=resp.replace(regex3, ";");
	console.log(resp);
	var currentdate = new Date(); 
	var datetime =  addZero(currentdate.getDate()) + "."
				 +  addZero((currentdate.getUTCMonth()+1))  + "." 
				 +  addZero(currentdate.getUTCFullYear()) + " "  
				 +  addZero(currentdate.getUTCHours()) + ":"  
				 +  addZero(currentdate.getUTCMinutes()) + ":" 
				 +  addZero(currentdate.getUTCSeconds()) + " GMT";




	finString = navigator.userAgent + "," + navigator.language + "," + datetime + "," +  usage + "," + "Resolution: " + $(window).width() + " on " + $(window).height()  + "," +  resp;
	console.log(finString);
	var posting = new XMLHttpRequest();
	posting.open("POST", "/server", true);
	
	posting.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	posting.send(JSON.stringify(finString));	
}

$(window).ready(function() {

 var usage;
	var flag=false;
	$.getJSON('http://ip-api.com/json?callback=?', function(data) {
			//resp=JSON.stringify(data, null, 2);
			//return resp;
		
	    document.getElementById('link').onclick = function (event){ 

	    	usage="link used";
	    	
	    	makePackage(usage,JSON.stringify(data, null, 2));
	    	flag=true;
	    	console.log("test1");
	    };	
	    if (!flag) {

	    	usage="link not used";
	    	console.log("test2");
	    }  

		$(window).bind('beforeunload', function(){
			makePackage(usage,JSON.stringify(data));

	 	});
 	});
});

