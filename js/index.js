var food = {
	48: {
		1: {
			normal: "Oxjärpar med gräddsås & potatis",
			vego: "Falafelbiff med gräddsås & potatis"
		},

		2: {
			normal: "Kyckling med sweet chili serveras med ris",
			vego: "Vegobitar med sweet chili serveras med ris"
		},

		3: {
			normal: "Panerad fiskfilé med kall örtsås och potatis",
			vego: "Blomkål & ostbiffar med kall örtsås och potatis"
		},

		4: {
			normal: "Spaghetti Bolognese",
			vego: "Spaghetti med vegetarisk Bolognese"
		},

		5: {
			normal: "Falukorv i tomatsås serveras med potatismos",
			vego: "Vegokorv i tomatsås serveras med potatismos"
		}
	},
};

// get week
Date.prototype.getWeek = function(){
	        var onejan = new Date(this.getFullYear(), 0, 1);
	        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
	    }

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

	for (var i = 1; i <= 5; i++) {

		var days = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'];

		$(".foodScroller").append('<div class="day day-' + i + '"><h1 class="dayHeader">' + days[i-1] + '</h1></div>');

		$(".day-" + i).append('<p class="course course-normal"><span class="type type-normal">Dagens rätt: </span>' + (food[new Date().getWeek()][i].normal) + '</p>');
		$(".day-" + i).append('<p class="course course-vego"><span class="type type-vego">Vegetariskt: </span>' + (food[new Date().getWeek()][i].vego) + '</p>');

		if(food[new Date().getWeek()][i].extra){
			$(".day-" + i).append('<p class="course course-extra"><span class="type type-extra">Extrarätt: </span>' + (food[new Date().getWeek()][i].extra) + '</p>');
		};
		
	};

	$(".desktopSchema").height( ( $(window).height() ) - 50 - ( $(".foodContainer").height() ) );

});

$( window ).resize(function() {
  
	$(".desktopSchema").height( ( $(window).height() ) - 50 - ( $(".foodContainer").height() ) );

});