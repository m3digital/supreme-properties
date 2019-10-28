/*------------------------------------------------------------------
[Table of contents]

    - main js
    - init range slider
    - init filter

- Project:    Restate - HTML Template
- Version:    1.1
- Author:  Andrey Sokoltsov
- Profile:    http://themeforest.net/user/andreysokoltsov
--*/

/* main js */
$(document).ready(function () {

    'use strict';

    //init range slider
    initSliderRange();

    //init filter
    accommodationFilter();

    function preload() {
        var $preloader = $('#page-preloader'),
            $spinner = $preloader.find('.spinner-loader');
        $( window ).on('load', function() {
            $spinner.fadeOut();
            $preloader.delay(500).fadeOut('slow');
        });
    }
    preload();


    //show free consultation form
    $('#free-consultation').on('click', function () {
        $(this).slideUp(300);
        $('.consultation-form-wrapper').css('opacity', '1');
        $('.consultation-form-wrapper input[type=tel]').focus();
    });


    //init testimonials slider
    $('.testimonials-slider').slick({
        arrows : false,
        dots : true,
        autoplay : true,
        speed : 800,
        autoplaySpeed: 3000
    });


    //init single slider
    if($('.single-slider-item').length > 3) {
        $('.single-slider').slick({
            dots: true,
            autoplay: true,
            autoplaySpeed: 3000,
            speed: 800,
            slidesToScroll: 1,
            slidesToShow: 3,
            infinite: true,
            centerMode: true,
            variableWidth: true,
            prevArrow: '<div class="slick-prev"><i class="icofont icofont-simple-left"></i></div>',
            nextArrow: '<div class="slick-next"><i class="icofont icofont-simple-right"></i></div>',
            responsive : [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToScroll: 1,
                        slidesToShow: 1,
                        variableWidth: false,
                        centerMode: false,
                        adaptiveHeight: true
                    }
                }
            ]
        });
    }else{
        $('.single-slider').addClass('small-single-slider');
        $('.single-slider').slick({
            dots: true,
            autoplay: true,
            autoplaySpeed: 3000,
            speed: 800,
            slidesToScroll: 1,
            slidesToShow: 1,
            infinite: true,
            prevArrow: '<div class="slick-prev"><i class="icofont icofont-simple-left"></i></div>',
            nextArrow: '<div class="slick-next"><i class="icofont icofont-simple-right"></i></div>',
            responsive : [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToScroll: 1,
                        slidesToShow: 1,
                        variableWidth: false,
                        centerMode: false,
                        adaptiveHeight: true
                    }
                }
            ]
        });
    }




    //video-box
    if($('div').is('.video-box')){
        $('.video-box').on('click', function () {
            $(this).find('.play-icon').fadeOut(250);
            $(this).find('.iframe-wrap').fadeIn(250);
            var iframe = $(this).find('iframe');
            var iframeSrc = iframe.attr('src');
            iframe.attr('src', iframeSrc + '&autoplay=1');
        });
    }


    //init custom select
    $('select').customSelect();


    //select fix
    $('.select-wrapper label').on('click', function () {
        $(this).parent('.select-wrap').find('.custom-select-button').click();
    });


    //toggle range
    $('.range-wrap').on('click', function () {
        if($(this).hasClass('active')){
            $(this).next('.range-box').slideUp(250);
            $(this).removeClass('active');
        }else{
            $(this).next('.range-box').slideDown(250);
            $(this).addClass('active');
        }
    });
    $(document).on('click', function (event) {
        if ($(event.target).closest($('.range-wrap')).length) return;
        if ($(event.target).closest($('.range-box')).length) return;
        $('.range-box').slideUp(250);
        $('.range-wrap').removeClass('active');
    });


    //scroll to anchor
    $('.main-menu ul li a[href*="#"], .mobile-menu ul li a[href*="#"], .question-text a[href*="#"]').on('click', function(event){
        console.log('hi');
        event.preventDefault();
        var anchor = $(this).attr('href');
        if($(anchor).position()){
            $('html, body').stop().animate({
                scrollTop: $(anchor).offset().top
            }, 800);
        }
    });


    //fadein social icons in first screen
    function fadeInSocialLinks() {
        setTimeout(function () {
            var countLinks = $('.main-social a').length;
            var count = 0;

            var interval = setInterval(function () {
                if(count < countLinks){
                    $('.main-social a').eq(count).addClass('active');
                    count++;
                }else{
                    clearInterval(interval);
                }
            }, 400);
        }, 300); //start fadein
    }


    //wow init for fadein text and social links
    var wow = new WOW({
        animateClass: '', // animation css class (default is animated)
        callback:     function(box) {
            // the callback is fired every time an animation is started
            // the argument that is passed in is the DOM node being animated
            textify(box,'fade',0);
        },
        scrollContainer: null // optional scroll container selector, otherwise use window
    });
    var socialLinks = new WOW({
        boxClass:     'main-social',      // animated element css class (default is wow)
        animateClass: '', // animation css class (default is animated)
        callback:     function() {
            // the callback is fired every time an animation is started
            // the argument that is passed in is the DOM node being animated
            fadeInSocialLinks();
        },
        scrollContainer: null // optional scroll container selector, otherwise use window
    });
    $(window).on('load', function () {
        setTimeout(function () {
            wow.init();
            socialLinks.init();
        }, 500);
    });

    //mobile-menu
    $('.mobile-btn, .close-mob-menu').on('click', function () {
        $('.mob-menu-wrapper').toggleClass('active');
    });
    $('.mobile-menu ul li a').on('click', function () {
        $('.mob-menu-wrapper').removeClass('active');
    });


    //Send php mail form
    var footerForm = document.querySelector('#contact-form');
    var footerFormName = '#contact-form';

    footerForm.addEventListener('submit', function (e) {
        submitForm(e, footerFormName);
    });

    function submitForm(e, formName) {
        e.preventDefault();
        var name = $(formName + ' .name-input').val();
        var email = $(formName + ' .email-input').val();
        var message = $(formName + ' .site-input.textarea').val();

        var formData = {
            name: name,
            email: email,
            message: message
        };

        // console.log(name);
        // console.log(email);
        // console.log(message);

        $.ajax({
            type: "POST",
            url: '/mail.php',
            data: formData,
            success: function () {
                console.log('DRAGON!!!');
                // $('#thanks-modal').modal('show');
            },
            error: function () {
                console.log('error');
                //the php form will work when you upload all in a server
                // $('#error-modal').modal('show');
            }
        });
    }

    var topForm = document.querySelector('.consultation-form');
    var topFormName = '.consultation-form';

    topForm.addEventListener('submit', function (e) {
        submitForm(e, topFormName);
    });

    function submitForm(e, formName) {
        e.preventDefault();
        var phone = $(formName + ' .input-phone').val();

        var formData = {
            phone: phone
        };

        console.log(phone);

        $.ajax({
            type: "POST",
            url: '/mail_consult.php',
            data: formData,
            success: function () {
                console.log('DRAGON!!!');
                // $('#thanks-modal').modal('show');
            },
            error: function () {
                console.log('error');
                //the php form will work when you upload all in a server
                // $('#error-modal').modal('show');
            }
        });
    }
});

function initSliderRange() {
    var sliderRange = $('#slider-range');
        sliderMin = +sliderRange.attr('data-price-min'),
        sliderMax = +sliderRange.attr('data-price-max'),
        sliderStep = +sliderRange.attr('data-price-step'),
        firstPrice = $('.first-price'),
        lastPrice = $('.last-price');
    
    sliderRange.slider({
        range: true,
        min: sliderMin,
        max: sliderMax,
        step: sliderStep,
        values: [sliderMin, sliderMax],
        slide: function( event, ui ) {
            firstPrice.text('$' + ui.values[0]);
            lastPrice.text('$' + ui.values[1]);
        },
        change: function( event, ui ) {
            accommodationFilter();
        }
    });

    firstPrice.text('$' + sliderRange.slider('values', 0));
    lastPrice.text('$' + sliderRange.slider('values', 1));
}

function accommodationFilter() {
    var sliderRange = $('#slider-range'),
        $grid = $('.offersWrap'),
        emptyFilterMsgWrap = $('.emptyFilterMsgWrap'),
        filters = {
            method: $('input[name="accommodationMethod"]:checked').val(),
            type: $('select[name="accommodationType"]').val(),
            beds: $('select[name="accommodationBeds"]').val(),
            baths: $('select[name="accommodationBaths"]').val(),
            square: $('select[name="accommodationSquare"]').val(),
            priceFrom: sliderRange.slider('values', 0),
            priceTo: sliderRange.slider('values', 1)
        };
    if($grid.length) {
        $grid.isotope({
            itemSelector: '.house-box-wrapper',
            filter: function() {
                var method = $(this).data('method'),
                    type = $(this).data('type'),
                    beds = $(this).data('beds');
                    baths = $(this).data('baths'),
                    square = $(this).data('square'),
                    price = $(this).data('price');

                if(
                    (!isMatched(method, filters['method'])) ||
                    (!isMatched(type, filters['type'])) ||
                    (!isMatched(beds, filters['beds'])) ||
                    (!isMatched(baths, filters['baths'])) ||
                    (!isMatched(square, filters['square'])) ||
                    (!isBetweenPrice(price, filters['priceFrom'], filters['priceTo']))
                ) {
                    return false;
                } else {
                    return true;
                }
            }
        });
        if($grid.data('isotope').filteredItems.length) {
            emptyFilterMsgWrap.addClass('hidden');
        } else {
            emptyFilterMsgWrap.removeClass('hidden');
        }
    }
}

function isMatched(offerItem, filterVal) {
    if(offerItem == filterVal || filterVal == 'all') {
        return true;
    }
    return false;
}

function isBetweenPrice(price, priceFrom, priceTo) {
    if(price >= priceFrom && price <= priceTo) {
        return true;
    }
    return false;
}
