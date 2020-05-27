$(document).ready(function () {
	if (family == 'yes'){
		$('.family').show();
	} else {
		$('.friends').show();
	}
	$(".outer-container").show();
});

// Parse the URL parameter
function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}
// Give the parameter a variable name
// var dynamicContent = getParameterByName('timer');
var friends = getParameterByName('friends');
var family = getParameterByName('family');

;
(function () {

	'use strict';

	// iPad and iPod detection	
	var isiPad = function () {
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function () {
		return (
			(navigator.platform.indexOf("iPhone") != -1) ||
			(navigator.platform.indexOf("iPod") != -1)
		);
	};


	// Carousel Feature Slide
	var testimonialCarousel = function () {

		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			animateOut: 'fadeOut',
			items: 1,
			loop: true,
			margin: 0,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: false
		});
	};

	var sliderMain = function () {

		$('#qbootstrap-slider-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000,
			directionNav: true,
			start: function () {
				setTimeout(function () {
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function () {
				setTimeout(function () {
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}

		});

	};


	// animate-box
	var contentWayPoint = function () {

		$('.animate-box').waypoint(function (direction) {

			if (direction === 'down' && !$(this).hasClass('animated')) {

				$(this.element).addClass('fadeInUp animated');

			}

		}, {
			offset: '75%'
		});

	};


	// Burger Menu
	var burgerMenu = function () {

		$('body').on('click', '.js-qbootstrap-nav-toggle', function (event) {

			if ($('#navbar').is(':visible')) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');
			}

			event.preventDefault();

		});

	};


	// Parallax
	var parallax = function () {
		if (!isiPad() || !isiPhone()) {
			$(window).stellar();
		}
	};


	// Page Nav
	var clickMenu = function () {

		$('a:not([class="external"])').click(function (event) {
			var section = $(this).data('nav-section'),
				navbar = $('#navbar');
			$('html, body').animate({
				scrollTop: $('[data-section="' + section + '"]').offset().top
			}, 500);

			if (navbar.is(':visible')) {
				navbar.removeClass('in');
				navbar.attr('aria-expanded', 'false');
				$('.js-qbootstrap-nav-toggle').removeClass('active');
			}

			event.preventDefault();
			return false;
		});

	};

	// Reflect scrolling in navigation
	var navActive = function (section) {

		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function () {
			$(this).find('a[data-nav-section="' + section + '"]').closest('li').addClass('active');
		});

	};
	var navigationSection = function () {

		var $section = $('div[data-section]');

		$section.waypoint(function (direction) {
			if (direction === 'down') {
				navActive($(this.element).data('section'));

			}
		}, {
			offset: '150px'
		});

		$section.waypoint(function (direction) {
			if (direction === 'up') {
				navActive($(this.element).data('section'));
			}
		}, {
			offset: function () {
				return -$(this.element).height() + 155;
			}
		});

	};


	// Animations
	var contentWayPoint = function () {
		var i = 0;
		$('.animate-box').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('animated')) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function () {

					$('body .animate-box.item-animate').each(function (k) {
						var el = $(this);
						setTimeout(function () {
							var effect = el.data('animate-effect');
							if (effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else if (effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated');
							} else if (effect === 'fadeInRight') {
								el.addClass('fadeInRight animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						}, k * 50, 'easeInOutExpo');
					});

				}, 50);

			}

		}, {
			offset: '85%'
		});
	};


	var inlineSVG = function () {
		$('img.svg').each(function () {
			var $img = $(this);
			var imgID = $img.attr('id');
			var imgClass = $img.attr('class');
			var imgURL = $img.attr('src');

			$.get(imgURL, function (data) {
				// Get the SVG tag, ignore the rest
				var $svg = jQuery(data).find('svg');

				// Add replaced image's ID to the new SVG
				if (typeof imgID !== 'undefined') {
					$svg = $svg.attr('id', imgID);
				}
				// Add replaced image's classes to the new SVG
				if (typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass + ' replaced-svg');
				}

				// Remove any invalid XML tags as per http://validator.w3.org
				$svg = $svg.removeAttr('xmlns:a');

				// Replace image with new SVG
				$img.replaceWith($svg);

			}, 'xml');

		});
	};


	// Set the date we're counting down to
	var countDownDate = new Date("Jan 30, 2022 08:30:00").getTime();

	// Update the count down every 1 second
	var x = setInterval(function () {

		// Get todays date and time
		var now = new Date().getTime();

		// Find the distance between now an the count down date
		var distance = countDownDate - now;

		// Time calculations for days, hours, minutes and seconds
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);

		// Display the result in an element with id="demo"
		// document.getElementById("demo").innerHTML = days + "Days " + hours + "Hours "
		// + minutes + "Minutes " + seconds + "Seconds ";

		// Display the result in an element with id="demo"
		document.getElementById("days").innerHTML = days + " <small>days</small>";
		document.getElementById("hours").innerHTML = hours + " <small>hours</small> ";
		document.getElementById("minutes").innerHTML = minutes + " <small>minutes</small> ";
		document.getElementById("seconds").innerHTML = seconds + " <small>seconds</small> ";

		// If the count down is finished, write some text 
		if (distance < 0) {
			clearInterval(x);
			document.getElementById("countdown").innerHTML = "It's Today !!!";
		}
	}, 1000);


	// Document on load.
	$(function () {

		burgerMenu();
		testimonialCarousel();
		sliderMain();
		clickMenu();
		parallax();
		// windowScroll();
		navigationSection();
		contentWayPoint();
		inlineSVG();
		$(".audioDemo").trigger('play');
	});


}());

// Hearts falling
var love = setInterval(function () {
	var r_num = Math.floor(Math.random() * 40) + 1;
	var r_size = Math.floor(Math.random() * 10) + 10;
	var r_left = Math.floor(Math.random() * 100) + 1;
	var r_bg = Math.floor(Math.random() * 25) + 100;
	var r_time = Math.floor(Math.random() * 5) + 100;

	$('.bg_heart').append("<div class='heart' style='width:" + r_size + "px;height:" + r_size + "px;left:" + r_left + "%;background:rgba(255," + (r_bg - 25) + "," + r_bg + ",1);-webkit-animation:love " + r_time + "s ease;-moz-animation:love " + r_time + "s ease;-ms-animation:love " + r_time + "s ease;animation:love " + r_time + "s ease'></div>");

	$('.bg_heart').append("<div class='heart' style='width:" + (r_size - 10) + "px;height:" + (r_size - 10) + "px;left:" + (r_left + r_num) + "%;background:rgba(255," + (r_bg - 25) + "," + (r_bg + 25) + ",1);-webkit-animation:love " + (r_time + 5) + "s ease;-moz-animation:love " + (r_time + 5) + "s ease;-ms-animation:love " + (r_time + 5) + "s ease;animation:love " + (r_time + 5) + "s ease'></div>");

	$('.heart').each(function () {
		var top = $(this).css("top").replace(/[^-\d\.]/g, '');
		var width = $(this).css("width").replace(/[^-\d\.]/g, '');
		if (top <= -100 || width >= 150) {
			$(this).detach();
		}
	});
}, 1500);

// $(".button").click(function toggleMuteAudio(){
// 	if($(".audioDemo").prop("paused")){
// 		var audio = $(".audioDemo")
// 		audio[0].play();
// 	} else{
// 		$(".audioDemo").prop("muted",!$(".audioDemo").prop("muted"));
// 	}
// 	$(".button").toggleClass("paused");
// });