document.addEventListener("DOMContentLoaded", function () {
	new Swiper(".testimonials-swiper", {
		// Enable loop
		loop: true,

		// Auto play
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		},

		// Speed of transition
		speed: 800,

		// Responsive breakpoints
		slidesPerView: 1,
		spaceBetween: 30,
		centeredSlides: true,

		breakpoints: {
			640: {
				slidesPerView: 1.5,
				spaceBetween: 40,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 50,
			},
			1024: {
				slidesPerView: 2.5,
				spaceBetween: 60,
			},
			1280: {
				slidesPerView: 3,
				spaceBetween: 70,
			},
		},

		// Enable grab cursor
		grabCursor: true,

		// Enable keyboard control
		keyboard: {
			enabled: true,
		},

		// Enable mouse wheel control
		mousewheel: {
			enabled: true,
			forceToAxis: true,
		},

		// Smooth transitions
		effect: "slide",

		// Optional parameters for smoother performance
		watchOverflow: true,
		observer: true,
		observeParents: true,
	});
});
