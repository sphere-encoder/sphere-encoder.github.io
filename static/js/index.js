window.HELP_IMPROVE_VIDEOJS = false;

// var INTERP_BASE = "https://homes.cs.washington.edu/~kpar/nerfies/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
// function preloadInterpolationImages() {
//   for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
//     var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
//     interp_images[i] = new Image();
//     interp_images[i].src = path;
//   }
// }

// function setInterpolationImage(i) {
//   var image = interp_images[i];
//   image.ondragstart = function() { return false; };
//   image.oncontextmenu = function() { return false; };
//   $('#interpolation-image-wrapper').empty().append(image);
// }


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
        slidesToScroll: 1,
        slidesToShow: 1,
        loop: true,
        infinite: true,   // Change to true for smoother looping
        autoplay: false,
        autoplaySpeed: 3000,
        pagination: false, // Turn off dots if they are overlapping

        // This forces the carousel to re-calculate width on resize
        resize: true,

        // // THIS IS THE KEY FIX:
        // // We force "slidesToShow: 1" for every screen size.
        // breakpoints: [
        //     { changePoint: 480, slidesToShow: 1, slidesToScroll: 1 },
        //     { changePoint: 640, slidesToShow: 1, slidesToScroll: 1 },
        //     { changePoint: 768, slidesToShow: 1, slidesToScroll: 1 },
        //     { changePoint: 1024, slidesToShow: 1, slidesToScroll: 1 },
        //     { changePoint: 1216, slidesToShow: 1, slidesToScroll: 1 }
        // ]
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		// console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		// console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    // preloadInterpolationImages();

    // $('#interpolation-slider').on('input', function(event) {
    //   setInterpolationImage(this.value);
    // });
    // setInterpolationImage(0);
    // $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);


    var scroll_options = {
      slidesToScroll: 1,
        slidesToShow: 1,
        loop: true,
        infinite: true,   // Change to true for smoother looping
        autoplay: false,
        autoplaySpeed: 3000,
        pagination: false, // Turn off dots if they are overlapping

        // This forces the carousel to re-calculate width on resize
        resize: true,
    }

    var scroll_carousels = bulmaCarousel.attach('.scroll_carousel', scroll_options);
    for(var i = 0; i < scroll_carousels.length; i++) {
    	scroll_carousels[i].on('before:show', state => {
    	});
    }

    var scroll_element = document.querySelector('#my-element');
    if (scroll_element && scroll_element.bulmaCarousel) {
    	scroll_element.bulmaCarousel.on('before-show', function(state) {
    	});
    }

    bulmaSlider.attach();

})
