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

function updateFood(){


		$(".selectedWeek").text((new Date().getWeek()+weekModifier));


		$(".lastWeek").text((new Date().getWeek()+weekModifier-1));
		$(".nextWeek").text((new Date().getWeek()+weekModifier+1));

		$(".foodScroller").empty();

		setTimeout(showFood, 200);
		function showFood() {
	    	$(".foodScroller").css({"transform": "none", "opacity": 1});
		}


		for (var i = 1; i <= 5; i++) {

			var days = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'];


				if ((i == new Date().getDay()) && (weekModifier == 0)) {
					$(".foodScroller").append('<div class="today day day-' + i + '"><h1 class="dayHeader">' + days[i-1] + '</h1></div>');
				}else{
					$(".foodScroller").append('<div class="day day-' + i + '"><h1 class="dayHeader">' + days[i-1] + '</h1></div>');
				};

			try{

				$(".day-" + i).append('<p class="course course-normal"><span class="type type-normal">Dagens rätt: </span>' + (food[(new Date().getWeek()+weekModifier)][i].normal) + '</p>');
				$(".day-" + i).append('<p class="course course-vego"><span class="type type-vego">Vegetariskt: </span>' + (food[(new Date().getWeek()+weekModifier)][i].vego) + '</p>');

				if(food[new Date().getWeek()][i].extra){
					$(".day-" + i).append('<p class="course course-extra"><span class="type type-extra">Extrarätt: </span>' + (food[(new Date().getWeek()+weekModifier)][i].extra) + '</p>');
				};

			}
			catch(e){
			}
		};
};

function nextWeek(){

	if (((new Date().getWeek() + weekModifier) < 51) && (typeof food[(new Date().getWeek()+weekModifier+1)] !== 'undefined')){
		weekModifier += 1;
		$(".foodScroller").css({"transform": "translateX(-100%) scale(0.8)"});

		setTimeout(hideAndMoveLeft, 100);
		function hideAndMoveLeft() {
			$(".foodScroller").css({"transform": "translateX(100%) scale(0.8)", "opacity": 0});
			updateFood();
		}

	};



};

function lastWeek(){

	if ((new Date().getWeek() + weekModifier) > new Date().getWeek()){
		weekModifier -= 1;
	
		$(".foodScroller").css({"transform": "translateX(100%) scale(0.8)"});

		setTimeout(hideAndMoveRight, 100);
		function hideAndMoveRight() {
			$(".foodScroller").css({"transform": "translateX(-100%) scale(0.8)", "opacity": 0});
			updateFood();
		}
	};


};

function resizeTimetable(){

	if($( window ).width() >= 820){
		$("#schema").show();
		$("#schema").height((window.innerHeight) - ( $(".navbar").height() + $(".foodContainer").height() ));
	}else{
		$("#schema").hide();
	}
};

$(window).on("load", function(){

	$(".selectedWeek").text(new Date().getWeek());

	updateFood();
	resizeTimetable();

	//show page
	$(".loader-main").slideToggle();


	//resize timetable
	$( window ).resize(function() {
		resizeTimetable();
	});


	// Swiping functions
	$(function() {
      //Enable swiping...
      $(".foodScroller").swipe( {
        //Single swipe handler for left swipes
        swipeLeft:function(event, direction, distance, duration, fingerCount) {

        	nextWeek();

        },
        swipeRight:function(event, direction, distance, duration, fingerCount) {

        	lastWeek();

        },
        allowPageScroll: "vertical",
        threshold:30
      });
    });

});