var $ = require('jquery');
$( document ).ready(function() {
	console.log(navigator.userAgent);
	console.log(navigator.language);
	console.log($(window).width() + " on " + $(window).height());
	var data;
	var resp;
/*	$.getJSON('http://ip-api.com/json?callback=?', function(data) {
		console.log(JSON.stringify(data, null, 2));
		resp=JSON.stringify(data, null, 2);
	});*/
	var currentdate = new Date(); 
	var datetime = "Last Sync: " + currentdate.getDate() + "/"
				                + (currentdate.getUTCMonth()+1)  + "/" 
				                +  currentdate.getUTCFullYear() + " @ "  
				                +  currentdate.getUTCHours() + ":"  
				                +  currentdate.getUTCMinutes() + ":" 
				                +  currentdate.getUTCSeconds();
    console.log(datetime);

    var flag=false;
    var usage;
    document.getElementById('link').onclick = function (event){ 
      console.log("link used");
      usage="link used";
      flag=true;
    };
    if (!flag) {
    	console.log("link not used");
    	usage="link not used";
    }  

    fs = require('fs');
	fs.writeFile('jslog.csv', navigator.userAgent + ',' + navigator.language + ',' + $(window).width() + " on " + $(window).height() + ',' + datetime + ','  usage + ',' +  resp);
});