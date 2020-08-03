$('.carrousel-auto-false,.carrousel-auto-true').css('opacity',0);

$('.carrousel-auto-false.a-la-une').css('height','277px');
$('.carrousel-auto-false.a-la-une').css('overflow','hidden');

$('#flux_twitter ul').css('opacity',0);
$('#twitter_bandeau').css('height','43px');
$('#twitter_bandeau').css('overflow','hidden');
$('#stop_twitter .start').hide();

$(document).ready(function() {
	
	$('.carrousel-auto-false,.carrousel-auto-true').animate({opacity: 1}, 1500);
	$('#flux_twitter ul').animate({opacity: 1}, 1300);
});