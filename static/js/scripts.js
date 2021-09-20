$(window).on('load', function(){
    //Preloader
   
    function hidePreloader() {
        $('.preloader-wrapper').fadeOut(1000);
    }
    hidePreloader();
})

$(document).ready(function () {
    'use strict'
    var $window = $(window)

    // IMG to SVG
    function jetix_svg() {
        jQuery('img').each(function () {
            var jQueryimg = jQuery(this);
            var imgClass = jQueryimg.attr('class');
            var imgURL = jQueryimg.attr('src');
            jQuery.get(imgURL, function (data) {
                // Get the SVG tag, ignore the rest
                var jQuerysvg = jQuery(data).find('svg');

                // Add replaced image's classes to the new SVG
                if (typeof imgClass !== 'undefined') {
                    jQuerysvg = jQuerysvg.attr('class', imgClass + ' replaced-svg');
                }
                jQuerysvg = jQuerysvg.removeAttr('xmlns:a');
                // Replace image with new SVG
                jQueryimg.replaceWith(jQuerysvg);

            }, 'xml');

        });
    }
    $(document).each(function () {
        jetix_svg();
    })

    /*=================================
        Menu JS
    ==================================*/
    $('#menu').slicknav({
        label: '',
        prependTo: '#mobile-container',
    })
    $('.bar-icon').on('click', function () {
        $(this).toggleClass('active-bar');
        $(".slicknav_nav").slideToggle()
    })

    var Header = $('.header-area')
    $window.scroll(function () {
        if ($window.scrollTop() > 300) {
            Header.addClass('sticky-menu animated fadeInDown')
        } else {
            Header.removeClass('sticky-menu animated fadeInDown')
        }
    })

    ///////////////// SMOOTH SCROLLING ///////////////
    var sections = $('section'),
        nav = $('.menu'),
        nav_height = nav.outerHeight(),
        header = $('.header-area').outerHeight();

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop();
        sections.each(function () {
            var top = $(this).offset().top - header,
                bottom = top + $(this).outerHeight() - header;
            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    });

    nav.find('a').on('click', function () {
        var $el = $(this),
            id = $el.attr('href');
        $('html, body').animate({
            scrollTop: $(id).offset().top - header
        }, 500);
        $el.addClass('active').parent().siblings().children().removeClass('active')
        return false;
    });



    // Select all links with hashes
    $('a[href*="#"]')
        .not('[href="#"]')
        .not('[href="#0"]')
        .not('[data-toggle="tab"]')
        .click(function (event) {
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top - header
                    }, 1000);
                }
            }
        });

    /////////////////////////////// 9. Data AOS ///////////////////////////////
    if ($("[data-aos]").length) {
        AOS.init({
            duration: 1000,
            mirror: true,
            once: true
        });
    }

    /////////////////////////////// 10. FAQ ///////////////////////////////
    $('.faq-qus-title').on('click', function () {
        var $this = $(this)
        $this
            .toggleClass('active')
            .next()
            .slideToggle()
            .parent()
            .siblings()
            .children('.faq-qus-title')
            .removeClass('active')
            .next()
            .slideUp()
    })

    ///////////////  POPUP JS ///////////////
    $('.video-play-btn').magnificPopup({
        type: 'iframe',
    })
    /////////////////////slider/////////
    $('.board-slider').owlCarousel({
        loop: true,
        autoPlay: true,
        items: 4,
        nav: true,
        dots: true,
        navText: [
            '<i class="fa fa-angle-left"></i>',
            '<i class="fa fa-angle-right"></i>',
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            700: {
                items: 2,
            },
            900: {
                items: 3,
            },
            1000: {
                items: 4,

            }
        }
    })
    ///////////////// PARTNER CAROUSEL ///////////////
    $('.partner-logo').owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            500: {
                items: 2,
            },
            600: {
                items: 3,

            },
            1000: {
                items: 4,
            }
        }
    })
    /////////////// custom nav testimonial slider ///////////////
    var owl = $('.testimonial-slider');
    owl.owlCarousel({
        autoplay: true,
        items: 1,
        dots: false,
        nav: false,
        loop: true,
        mouseDrag: false,
        autoplayHoverPause: true,
        animateOut: 'slideOutUp',
        animateIn: 'slideInUp',
        autoplayTimeout: 5000,
    });
    // Go to the previous item
    $('.slide-prev').click(function () {
        owl.trigger('prev.owl.carousel');
    })
    // Go to the next item
    $('.slide-next').click(function () {
        owl.trigger('next.owl.carousel');
    })

    /////////////// SELECTPICKER ///////////////
    // $('.selectpicker').selectpicker({
    //     style: 'btn-info',
    //     size: 4
    // });
    // $('.selectpicker-2').selectpicker({
    //     size: 4
    // });
    /////////////// COUNTDOWN ///////////////
    $('.clock').FlipClock(3600 * 24 * 3, {
        clockFace: 'DailyCounter',
        countdown: true
    });
    /////////////// 11. WORLD MAP ///////////////
    var vMap = $('#world_map')
    if (vMap.length) {
        vMap.vectorMap({
            map: 'world_mill',
            normalizeFunction: 'polynomial',
            hoverOpacity: 0.9,
            hoverColor: false,
            regionStyle: {
                initial: {
                    fill: vMap.data('bgcolor') || '#1b45ab',
                },
            },
            markerStyle: {
                initial: {
                    r: 9,
                    fill: vMap.data('color') || '#174c8d',
                    'fill-opacity': 0.95,
                    stroke: '#fff',
                    'stroke-width': 7,
                    'stroke-opacity': 0.4,
                },
                hover: {
                    stroke: '#fff',
                    'fill-opacity': 1,
                    'stroke-width': 1.5,
                },
            },
            backgroundColor: 'transparent',
            zoom: false,
            zoomOnScroll: false,
            markers: [{
                    latLng: [23.684994, 90.356331],
                    name: 'Bangladesh',
                },
                {
                    latLng: [36.778259, -119.417931],
                    name: 'California',
                },
                {
                    latLng: [-38.416096, -63.616673],
                    name: 'Argentina',
                },
                {
                    latLng: [-0.789275, 113.921326],
                    name: 'Indonesia',
                },
                {
                    latLng: [-30.559483, 22.937506],
                    name: 'South Africa',
                },
            ],
        })
    }


    /////////////// FLIP CLOCK ///////////////
    var clock;
    clock = $('.clock').FlipClock({
        clockFace: 'DailyCounter',
        autoStart: true,
        callbacks: {
            stop: function () {
                $('.message').html('The clock has stopped!')
            }
        }
    });
    clock.setTime(220880);
    clock.setCountdown(true);
    clock.start();

    var clock;
    clock = $('.clock-2').FlipClock({
        clockFace: 'DailyCounter',
        autoStart: true,
        callbacks: {
            stop: function () {
                $('.message').html('The clock has stopped!')
            }
        }
    });
    clock.setTime(220880);
    clock.setCountdown(true);
    clock.start();

    ///////////////// NICE SCROLL ///////////////


    $(window).on("load", function () {
        $(".custom-scrollbar").mCustomScrollbar({
            axis: "x",
            theme: "dark",
            advanced: {
                autoExpandHorizontalScroll: true,
            }
        });
    });


    ///////////////// SNAZZY MAP STYLE ///////////////
    var mapStyle = [{
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#ffffff"
            }]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [{
                    "color": "#000000"
                },
                {
                    "lightness": 13
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
                    "color": "#144b53"
                },
                {
                    "lightness": 14
                },
                {
                    "weight": 1.4
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "all",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
                "color": "#08304b"
            }]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                    "color": "#0c4152"
                },
                {
                    "lightness": 5
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                    "color": "#0b434f"
                },
                {
                    "lightness": 25
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.stroke",
            "stylers": [{
                    "color": "#0b3d51"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{
                "color": "#146474"
            }]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
                "color": "#021019"
            }]
        }
    ]

    // CREATE THE MAP
    if ($('.map-canvas').length) {
        var map = new google.maps.Map($('.map-canvas')[0], {
            zoom: 10,
            styles: mapStyle,
            center: new google.maps.LatLng(40.712776, -74.005974),
        });
    }

    /////////////////  PARTICLE JS ///////////////
    if ($('#particles-js').length) {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "img/github.svg",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 200,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 200,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }



    //// form input focus style ////////
    $('.form-input').focus(function () {
        $(this).parents('.form-group').addClass('focused');
    })
    // animation js
    $('.form-input').blur(function () {
        var inputValue = $(this).val();
        if (inputValue == "") {
            $(this).removeClass('filled');
            $(this).parents('.form-group').removeClass('focused');
        } else {
            $(this).addClass('filled');
        }
    })





})