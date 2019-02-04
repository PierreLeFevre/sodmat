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

var today;
var thisWeek;
var modifiedWeek;
var days = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'];
var months = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'];

function updateFood(){

	//Create date object for upcoming use.
	today = new Date();
	thisWeek = today.getWeek();
	modifiedWeek = thisWeek + weekModifier;

	var changingDate = new Date();

	//Fill buttons with correct surrounding weeks.
	$(".selectedWeek").text((modifiedWeek));
	$(".lastWeek").text((modifiedWeek-1));
	$(".nextWeek").text((modifiedWeek+1));
	
	//Check if surrounding weeks exist and show buttons accordingly (desktop only).
	if(weekModifier==0){
		$(".lastWeek").parent().hide();
	}
	else{
		$(".lastWeek").parent().show();
	}

	if(food[(thisWeek + weekModifier + 1)]){
		$(".nextWeek").parent().show();
	}
	else{
		$(".nextWeek").parent().hide();
	}
	

	//Empty HTML food container.
	$(".foodScroller").empty();

	setTimeout(showFood, 200);
	function showFood() {
    	$(".foodScroller").css({"transform": "none", "opacity": 1});

		for (var i = 1; i <= 5; i++) {
			
			//if(weekModifier == 0) changingDate.setDate(today.getDate() + (i - today.getDay()));

			changingDate.setTime( (Date.now() + (i*24*60*60*1000) - (today.getDay()*24*60*60*1000)) + (weekModifier*7*24*60*60*1000));

			var boj = "";

			switch(Number(changingDate.getDate().toString().substr(-1))){
				case 0:
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
				case 8:
				case 9:
					boj = "e";
					break;	
				case 1:
				case 2:
					boj = "a";
					break;
			}

			var displayDate = " den " + changingDate.getDate() + ":" + boj + " " + months[changingDate.getMonth()] + " " + changingDate.getFullYear();


			if ((i == today.getDay()) && (weekModifier == 0)) {
				$(".foodScroller").append('<div class="today day day-' + i + '"><h1 class="day-header">' + days[i-1] + "<span class='day-date'>&nbsp;" + displayDate + "</span>" + '</h1></div>');
			}else{
				$(".foodScroller").append('<div class="day day-' + i + '"><h1 class="day-header">' + days[i-1] +  "<span class='day-date'>&nbsp;" + displayDate + "</span>" + '</h1></div>');
			};

			try{

				$(".day-" + i).append('<p class="course course-normal"><span class="type type-normal">Dagens rätt: </span>' + (food[(modifiedWeek)][i].normal) + '</p>');
				$(".day-" + i).append('<p class="course course-vego"><span class="type type-vego">Vegetariskt: </span>' + (food[(modifiedWeek)][i].vego) + '</p>');

				if(food[modifiedWeek][i].extra){
					$(".day-" + i).append('<p class="course course-extra"><span class="type type-extra">Extrarätt: </span>' + (food[(modifiedWeek)][i].extra) + '</p>');
				};

			}
			catch(e){
			}
		};
		
		//Feedback Dialog
		//$(".foodScroller").append('<div class="today day day-feedback"><h1 class="day-header">Tyck till!</h1></div>');
		//$(".day-feedback").append('<p class="course course-extra">Vi behöver din feedback!<br>För att göra sidan bättre tar vi gärna in buggrapporter, tips och tankar från användare. <br><br><a href="http://sodproject.ga/#contact">Klicka här för att förbättra SodMat!</a></p>');
		
		resizeTimetable();
	}


};

function nextWeek(){

	if (((modifiedWeek) < 51) && (typeof food[(new Date().getWeek()+weekModifier+1)] !== 'undefined')){
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

	if ((modifiedWeek) > new Date().getWeek()){
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
		//$("#schema").height((window.innerHeight) - ( $(".navbar").height() + $(".foodContainer").height() ));
		$("#schema").animate({height:((window.innerHeight) - ( $(".navbar").height() + $(".foodContainer").height() ))}, "fast");
	}else{
		$("#schema").hide();
	}
};

$(window).on("load", function(){

	$(".selectedWeek").text(new Date().getWeek());

	updateFood();
	resizeTimetable();

	//show page
	$(".loader-main").delay(1000).slideToggle();

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

			if($( window ).width() <= 820){
        		nextWeek();
        	}

        },
        swipeRight:function(event, direction, distance, duration, fingerCount) {

        	if($( window ).width() <= 820){
        		lastWeek();
        	}

        },
        allowPageScroll: "vertical",
        threshold:30
      });
    });

});