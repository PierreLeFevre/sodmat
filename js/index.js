var food = {
	week: 48,
	food: {
		monday: {
			normal: "Spaghetti med köttfärssås",
			vego: "Spaghetti med tofusås",
			extra: "Kycklingklubbor"
		},

		tuesday: {
			normal: "Hamburgare med ketchup",
			vego: "Quornburgare med ketchup",
			extra: "Kycklingklubbor"
		}
	}	
};

//cookie handling functions

function createCookie(name,value,days){
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
};

function readCookie(name){
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
};

function eraseCookie(name){
	createCookie(name,"",-1);
};

//main

function infoClose(){
	createCookie("infoClosed", "closed", 360);
	$('.info').hide();
	$( ".input-idnumber" ).focus();
}

$(window).on("load", function(){

	if(readCookie("infoClosed") == "closed"){
		$('.info').hide();
	}else{
		$('.info').show();
	}

	$(".navbar").on("click", function(){
		alert(food.food.monday.normal);
	});

});