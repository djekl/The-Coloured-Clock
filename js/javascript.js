$(function(){
	
	//create some variable i'll need to use
	var color=0,
			minPourc=0,
			secPourc=0,
			whiteOrNot=0,
			widthOnce=0;
	
	//every second we do this
	setInterval(function(){
		//create date function
		var myDate = new Date(),
				getHours = myDate.getHours(),
				getMinutes = myDate.getMinutes(),
				getSeconds = myDate.getSeconds();
		
		//add 0 before one size numbers
		if(getHours < 10){
			getHours = "0"+getHours;
		} else {
			getHours = getHours;
		}
		
		if(getMinutes < 10){
			getMinutes = "0"+getMinutes;
		} else {
			getMinutes = getMinutes;
		}
		
		if(getSeconds < 10){
			getSeconds = "0"+getSeconds;
		} else {
			getSeconds = getSeconds;
		}
		
		//set hsl colors
		var hslVal=parseInt((getMinutes+''+getSeconds)/5959*359),
				hslSat= 20+parseInt(getHours/23*60), //don't go before 20 and after 80 to have white every time and stay visible
				hslLig=hslSat,
				whiteOrNot = '#fff',
				minPourc = 100-(getMinutes/60*100),
				secPourc = minPourc-(getSeconds/60*minPourc) + '%';
				minPourc = minPourc+'%';
				// console.log(minPourc)
		
		//set the time and color content 
		var displayDate = getHours + ':' + getMinutes + '<span class="seconds">:</span>' + getSeconds,
				colorHSL = "hsl("+hslVal+', '+hslSat+'%, '+hslLig+'%)';
		
		//between 8pm and 8am then the color is black
		/*
		if(getHours <= 20 && getHours >= 8){
					whiteOrNot = '#FFF';
				} else {
					whiteOrNot = '#000';
				}
		*/

		//apply the color to the background and text-color
		$('body').css({
			'background-color': colorHSL,
			'color': whiteOrNot
		});
		
		//the first second, we set a width to border and time than we fix it every minutes
		if(widthOnce === 0){
			$('.time').empty().append(displayDate +' <br /><span class="color">'+ colorHSL +'</span>').css('width',minPourc);
			$('.border').css({
				'width':minPourc,
				'background':whiteOrNot
			});
			widthOnce = 1;
		} else {
			$('.time').empty().append(displayDate +' <br /><span class="color">'+ colorHSL +'</span>');
			$('.border').css('background',whiteOrNot);
			
			//reload width of the border et time every minutes
			if(getSeconds === '00'){
				$('.time').css('width',minPourc);
				$('.border').css('width',minPourc);
			}
			
			if(getMinutes === 59){
				$('.border').css('width',secPourc);
				// console.log('minPourc: '+minPourc+'; secPourc: '+ secPourc)
			}
		}
		
		//resize gradient if windows is resize and adapt it to the windows size
		var Windowsheight = $(window).height(),
				Windowswidth = $(window).width();
		$('.gradient').css({
			'height': Windowsheight,
			'width': Windowswidth
		});
		$(window).resize(function(){
			Windowsheight = $(window).height(),
			Windowswidth = $(window).width();
			$('.gradient').css({
				'height': Windowsheight,
				'width': Windowswidth
			});
		});
		
		//month
		var Month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				getYear = myDate.getFullYear();
		
			//28 or 29 february and more
			var february= new Date(getYear,1,1).getMonth() == new Date(getYear,1,29).getMonth() ? 29 : 28,
					DayNumber = [31, february, 31, 30, 31, 30, 31, 30, 31, 30, 31, 30 ],
					getMonth = myDate.getMonth(),
					getDay = myDate.getDay(); //0 = Sunday
					getCurrentDay = myDate.getDate();
			
			//empty to better fill
			$('.days').empty();
			for(var i=1; i < DayNumber[getMonth]+1; i++){
				var date = new Date(getYear,getMonth,i);
						date = date.getDay(),
						toAppend = '';
						
						if(date === 6 || date === 0) {
							toAppend= '<li class="weekend">'+i+'</li>';
						} else if (i === getCurrentDay){
							toAppend= '<li class="today">'+i+'</li>';
						}	else {
							toAppend= '<li>'+i+'</<li>';
						}
				$('.days').append(toAppend);
			}
			
			//append month
			var getMonth = Month[getMonth];
			$('.date .month').empty().append(getMonth);
		
	}, 1000);
	
});
