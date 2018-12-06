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
	49: {
		1: {
			normal: "Köttbullar med makaroner och KRAV-Ketchup",
			vego: "Morotsbullar med makaroner och KRAV-Ketchup"
		},

		2: {
			normal: "Kebab med pitabröd & tillbehör",
			vego: "Kebabkryddad Pulled Vego med pitabröd & tillbehör"
		},

		3: {
			normal: "Pannbiff med BBQ-sås samt ris",
			vego: "Vegobiff med BBQ-sås samt ris"
		},

		4: {
			normal: "Kyckling i curry serveras med pasta",
			vego: "Grönsaker i curry serveras med pasta"
		},

		5: {
			normal: "Taco serveras med nachos, salsa & ris",
			vego: "Taco serveras med nachos, salsa & ris"
		}
	},
	50: {
		1: {
			normal: "Italiensk nötfärsbiff med basilikasås & potatis",
			vego: "Rödbetsbiff med basilikasås & potatis"
		},

		2: {
			normal: "Kebabgryta med ris",
			vego: "Kebabgryta med sojastripes & grönsaker"
		},

		3: {
			normal: "Panerad fiskfilé med kall örtsås och potatis",
			vego: "Blomkål & ostbiffar med kall örtsås och potatis"
		},

		4: {
			normal: "(Idrottsdag) Ingen mat serveras",
			vego: "(Idrottsdag) Ingen mat serveras"
		},

		5: {
			normal: "Julbord",
			vego: "Julbord"
		}
	},
	51: {
		1: {
			normal: "Hamburgare med bröd, dressing, sallad & klyftpotatis",
			vego: "Greenburgare med bröd, dressing, sallad & klyftpotatis"
		},

		2: {
			normal: "Panerad torsk med kall dillsås & potatis",
			vego: "Stekt quornfilé med kall dillsås & potatis"
		},

		3: {
			normal: "(Julavslutning) Korv Strogranoff med ris",
			vego: "(Julavslutning) Korv Strogranoff på soja med ris"
		},

		4: {
			normal: "(Studiedag) Grekisk köttfärsröra serveras med pasta & aioli",
			vego: "(Studiedag) Grekisk sojafärsröra serveras med pasta & aioli"
		},

		5: {
			normal: "(Jullov) Skolan stängd.",
			vego: "(Jullov) Skolan stängd."
		}
	},
};

var weekModifier = 0;

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

function updateFood(){

	$(".selectedWeek").text((new Date().getWeek()+weekModifier));

	$(".foodScroller").empty();

	setTimeout(showFood, 200);
	function showFood() {
    	$(".foodScroller").css({"transform": "none", "opacity": 1});
	}


	for (var i = 1; i <= 5; i++) {

		var days = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'];

		$(".foodScroller").append('<div class="day day-' + i + '"><h1 class="dayHeader">' + days[i-1] + '</h1></div>');

		$(".day-" + i).append('<p class="course course-normal"><span class="type type-normal">Dagens rätt: </span>' + (food[(new Date().getWeek()+weekModifier)][i].normal) + '</p>');
		$(".day-" + i).append('<p class="course course-vego"><span class="type type-vego">Vegetariskt: </span>' + (food[(new Date().getWeek()+weekModifier)][i].vego) + '</p>');

		if(food[new Date().getWeek()][i].extra){
			$(".day-" + i).append('<p class="course course-extra"><span class="type type-extra">Extrarätt: </span>' + (food[(new Date().getWeek()+weekModifier)][i].extra) + '</p>');
		};
	};


	$(".desktopSchema").height( ( $(window).height() ) - 50 - ( $(".foodContainer").height() ) );
};

$(window).on("load", function(){

	if(readCookie("infoClosed") == "closed"){
		$('.info').hide();
	}else{
		$('.info').show();
	}


	$(".selectedWeek").text(new Date().getWeek());

	updateFood();

	// Swiping functions
	$(function() {
      //Enable swiping...
      $("body").swipe( {
        //Single swipe handler for left swipes
        swipeLeft:function(event, direction, distance, duration, fingerCount) {

        	if($(window).width() <= 820){

        		if ((new Date().getWeek() + weekModifier) < 51){
        			weekModifier += 1;
        			$(".foodScroller").css({"transform": "translateX(-100%) scale(0.8)"});

					setTimeout(hideAndMoveLeft, 100);
					function hideAndMoveLeft() {
					$(".foodScroller").css({"transform": "translateX(100%) scale(0.8)", "opacity": 0});
					}
        		};


	        	updateFood();
			}

        },
        swipeRight:function(event, direction, distance, duration, fingerCount) {

        	if($(window).width() <= 820){

        		if ((new Date().getWeek() + weekModifier) > new Date().getWeek()){
        			weekModifier -= 1;
        		
        			$(".foodScroller").css({"transform": "translateX(100%) scale(0.8)"});

					setTimeout(hideAndMoveRight, 100);
					function hideAndMoveRight() {
					$(".foodScroller").css({"transform": "translateX(-100%) scale(0.8)", "opacity": 0});
					}
        		};

	        	updateFood();
			}

        },
        allowPageScroll: "vertical",
        threshold:30
      });
    });

});

$( window ).resize(function() {
  
	$(".desktopSchema").height( ( $(window).height() ) - 50 - ( $(".foodContainer").height() ) );

});