$('.compare-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: 'linear',
    dots: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 10000
});

$('.control-items').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 10000,
    responsive: [
        {
            breakpoint: 901,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});

$('.reviews-photos').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 10000,
    responsive: [
        {
            breakpoint: 901,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});

$('.reviews-videos').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 10000
});

$('.objects-items').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    responsive: [
        {
            breakpoint: 901,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});

$('.object').each(function () {
    const slider = $(this).find('.object-slider');
    const nav = $(this).find('.object-nav');

    slider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: nav,
        arrows: false
    });

    nav.slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: slider,
        arrows: false,
        focusOnSelect: true
    });
});

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '.' + mm + '.' + yyyy;
$('.js-download-date').text(today);

$('.btn--burger-wrapper').on('click', function() {
    $('.btn--burger-wrapper').toggleClass('active');
    $('.widget-menu').toggleClass('active');
});

$('.faq__item').on('click', function () {
    $(this).toggleClass('active');
});

$('.nav__mob').on('click', function () {
    $('.nav').addClass('active');
});
$('.nav__close').on('click', function () {
    $('.nav').removeClass('active');
});
$('.nav__item a').on('click', function () {
    $('.nav').removeClass('active');
});

/* Selects */
$('.select').fancySelect();

$('.widget-video__close').on('click', function () {
   $('.widget-video').fadeOut();
});

$('.js-btn').on('click', function (e) {
    e.preventDefault();
    $('html').addClass('stop');

    var href = $(this).attr('href');

    $(href).fadeIn(500);
});

$('.modal__close').on('click', function (event) {
    event.preventDefault();
    $('html').removeClass('stop');
    $('.modal-overlay').fadeOut(500);
});

$('.modal-overlay').mouseup(function (e) {
    var container = $('.modal');
    if (container.has(e.target).length === 0 && !container.is(e.target)) {
        $('html').removeClass('stop');
        $('.modal-overlay').fadeOut();
    }
});

/* Titles anim */
$(".fz75, .fz48, .fz46, .fz40, .fz55, .fz60, .fz70").not('.no-anim').each(anime);
// $(".title-descr").not('.subtitle-first').each(anime);
function anime(anim){
    var thisTitle = $(this);
    var offsetTop = thisTitle.offset().top - $(window).height() - 10;
    if($(document).scrollTop() > offsetTop ){
        thisTitle.addClass('fade_in');
    }
    $(window).scroll(function(event) {
        offsetTop = thisTitle.offset().top - $(window).height() - 10;
        if($(document).scrollTop() > offsetTop ){
            thisTitle.addClass('fade_in');
        }
    });
}

$("input[name='social']").on('change, input', function () {
    if ($(this).val()=='WhatsApp') {
        $(this).closest('form').find('input[name="phone"]').attr('placeholder', 'Ваш телефон WhatsApp');
    } else if ($(this).val()=='Telegram') {
        $(this).closest('form').find('input[name="phone"]').attr('placeholder', 'Ваш телефон Telegram');
    } else if ($(this).val()=='Viber') {
        $(this).closest('form').find('input[name="phone"]').attr('placeholder', 'Ваш телефон Viber');
    }
});

$('input[name="phone"]').mask('+7 (999) 999-99-99');

$('input[type="file"]').change(function(){
    var value = $(this).val();
    $(this).closest('label').find('.js-file').text(value);
});

$('.js-trigger-file').on('click', function (e) {
    e.preventDefault();

    $('.js-trigger-point').click();
})

//AJAX

$(function () {
    $('form').submit(function(){
        var form = this;
        var formThis = $(this);

        if(form.phone&&form.phone.value.replace(/[^0-9]/ig, '').length<11){form.phone.focus(); return false;}

        /*if (formThis.find('input[name="formname"]').val() === "price") {
            var link = document.createElement('a');
            link.setAttribute('href', $('.price-pdf').val());
            link.setAttribute('target', "_blank");
            link.setAttribute('download', '');

            if (navigator.userAgent.indexOf('Mac') > 0) {
                window.open($('.price-pdf').val(), '_blank');
            } else {
                simulate(link, "click");
            }

        } else if (formThis.find('input[name="formname"]').val() === "useful-pdf") {
            var link = document.createElement('a');
            link.setAttribute('href', $('.useful-pdf').val());
            link.setAttribute('target', "_blank");
            link.setAttribute('download', '');

            if (navigator.userAgent.indexOf('Mac') > 0) {
                window.open($('.useful-pdf').val(), '_blank');
            } else {
                simulate(link, "click");
            }

        } else if (formThis.find('input[name="formname"]').val() === "pdf") {
            var link = document.createElement('a');
            link.setAttribute('href', $('.pdf-pdf').val());
            link.setAttribute('target', "_blank");
            link.setAttribute('download', '');

            if (navigator.userAgent.indexOf('Mac') > 0) {
                window.open($('.pdf-pdf').val(), '_blank');
            } else {
                simulate(link, "click");
            }

        }*/

        $.ajax({
            'type': 'POST', 
            'url': 'send.php', 
            'data': $(form).serialize(), 
            'success': function(z){
                if(z=='1'){
					try{ym(Ya._metrika.getCounters()[0].id, 'reachGoal', 'form-send');}catch(e){console.error(e);}
					try{ym(Ya._metrika.getCounters()[0].id, 'reachGoal', $(form).data('goal'));}catch(e){console.error(e);}
					
                    alert('Спасибо за заявку! Мы свяжемся с Вами в ближайшее время..');

                    $('input[type="text"], input[type="tel"], input[type="email"]').val('');
                }else{alert(z);}
            },
            'error': function(){alert('Network Error');}, 
        });

        return false;
    });
});


// ---------------------

function simulate(element, eventName) {
    var options = extend(defaultOptions, arguments[2] || {});
    var oEvent, eventType = null;

    for (var name in eventMatchers) {
        if (eventMatchers[name].test(eventName)) { eventType = name; break; }
    }

    if (!eventType)
        throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent) {
        oEvent = document.createEvent(eventType);
        if (eventType == 'HTMLEvents') {
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        }
        else {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
                options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
                options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }
        element.dispatchEvent(oEvent);
    }
    else {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = document.createEventObject();
        oEvent = extend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
    }
    return element;
}

function extend(destination, source) {
    for (var property in source)
        destination[property] = source[property];
    return destination;
}

var eventMatchers = {
    'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
    'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
}
var defaultOptions = {
    pointerX: 0,
    pointerY: 0,
    button: 0,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    bubbles: true,
    cancelable: true
}


/* Quiz */
var number = 0;
var maxNumber = $(".quiz-item").length;
var $element = $(".quiz-item").find("input, select, textarea");
var btnPrev = $(".quiz-btn--prev");
var btnNext = $('.quiz-btn--next');
var isValid;
var dataBlock;
var activeSlide = [];

$element.on('change input', function (e) {
    var value = $(this).val().trim();
    isValid = value !== "";
    btnActive(!isValid);
});

$('input[name="quiz1"]').on('change', function () {
   setTimeout(function () {
       btnNext.click();
   }, 500);
});
$('input[name="quiz2"]').on('change', function () {
   setTimeout(function () {
       btnNext.click();
   }, 500);
});
$('input[name="quiz4"]').on('change', function () {
   setTimeout(function () {
       btnNext.click();
   }, 500);
});
$('input[name="quiz5"]').on('change', function () {
   setTimeout(function () {
       btnNext.click();
   }, 500);
});
$('input[name="quiz6"]').on('change', function () {
   setTimeout(function () {
       btnNext.click();
   }, 500);
});
$('input[name="quiz7"]').on('change', function () {
   setTimeout(function () {
       btnNext.click();
   }, 500);
});

function btnActive(isValid) {

    if (number === 0) {
        btnPrev.prop('disabled', 'false');
        btnNext.prop('disabled', isValid);
    } else {
        btnPrev.prop('disabled', false);
        if (activeSlide[number] === true || isValid === false) {
            btnNext.prop('disabled', false);
        } else {
            btnNext.prop('disabled', true);
        }
    }

    //   if ($('#qw-s').hasClass('acts')) {

    //     if ($("input[name='semifinal-phone").val()) {
    //       btnSemifinal.prop('disabled', false);
    //       console.log('VAL TRUE');
    //     } else {
    //       btnSemifinal.prop('disabled', true);
    //       console.log('VAL FALSE');
    //     }
    //   }
}

// sidebar

function progress(num) {
    const percent = parseInt((100 / maxNumber) * (num + 1));
    const promo = ++$('.js-quiz-percent').text()[0];
    $('.js-quiz-percent').text(promo > 5 ? 5 : promo);
    $('.js-quiz-progress').text(num + 1);
    $('.quiz-progress__inner').css('width', (percent === 100 ? 98.9 : percent) + '%');
}
progress(0);

// btn
function btnClick() {
    btnPrev.on('click', function (event) {
        event.preventDefault();
        --number;
        $(".quiz-item").hide();
        $(".quiz-item").eq(number).fadeIn();
        btnActive(!isValid);
        if (number === 0) {
            btnPrev.hide();
        }
        progress(number);

        animateTop();
    });


    btnNext.on('click', function (event) {
        event.preventDefault();

        activeSlide[number] = true;
        ++number;
        $(".quiz-item").hide();
        $(".quiz-item").eq(number).fadeIn(1000);
        btnActive(!isValid);

        if (activeSlide[number] === true) {
            btnNext.prop('disabled', false);
        } else {
            btnNext.prop('disabled', true);
        }

        if (number > 0) {
            btnPrev.show();
        }

        if (number === 6) {
            $(".quiz-bottom").hide();
            $(".quiz-right").hide();
            $(".quiz-progress").hide();
            $(".quiz-form").addClass('quiz-form--semifinal');
        }

        progress(number);

        animateTop();
    });

    //   btnSemifinal.on('click', function (event) {
    //     activeSlide[number] = true;
    //     ++number;
    //     btnActive();
    //      $(".quiz__item").hide().removeClass('acts');
    //      $("#qw-f").fadeIn(1000).addClass('acts');
    //   })
}
btnClick();

function animateTop(eq) {
    var elem = $('.quiz-inner');
    var top = elem.offset().top - 15;
    $('body,html').animate({ scrollTop: top }, 400);
}

var toTop = $('.to_top');

toTop.on('click', topFunction);

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
        toTop.addClass('act');
    } else {
        toTop.removeClass('act');
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function topFunction() {
    $('body,html').animate({scrollTop: 0}, 100);
}


$(document).ready(function ($) {
    if (window.screen.width < 901) {
        $('.btn--burger-wrapper').removeClass('active');
        $('.widget-menu').removeClass('active');
    }

    if($('body').find('.map').length > 0) {
        var offsetHeight = $(".map").offset().top - $(window).height() - 300;
        var mapFooter = false;
        var urlMap = "https://yandex.ru/map-widget/v1/-/?ll=37.624513%2C55.748635&z=12";

        mapActivate();

        $(window).scroll(function (event) {
            offsetHeight = $(".map").offset().top - $(window).height() - 300;
            mapActivate();
        });

        function mapActivate() {
            if (!mapFooter) {
                if ($(document).scrollTop() > offsetHeight) {
                    ymaps.ready(init);

                    function init() {
                        // Создание карты.
                        // https://tech.yandex.ru/maps/doc/jsapi/2.1/dg/concepts/map-docpage/
                        var myMap = new ymaps.Map("map", {
                            // Координаты центра карты.
                            // Порядок по умолчнию: «широта, долгота».
                            center: [53.914841, 27.4842120],
                            // Уровень масштабирования. Допустимые значения:
                            // от 0 (весь мир) до 19.
                            zoom: 14,
                            // Элементы управления
                            // https://tech.yandex.ru/maps/doc/jsapi/2.1/dg/concepts/controls/standard-docpage/
                            controls: [

                                'zoomControl', // Ползунок масштаба
                                'fullscreenControl', // Полноэкранный режим
                            ]
                        });

                        // Добавление метки
                        // https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Placemark-docpage/
                        var myPlacemark = new ymaps.Placemark([53.913757, 27.509208], {
                            // Хинт показывается при наведении мышкой на иконку метки.
                            hintContent: '',
                            // Балун откроется при клике по метке.
                            balloonContent: ''
                        });

                        // После того как метка была создана, добавляем её на карту.
                        myMap.geoObjects.add(myPlacemark);

                    }
                    mapFooter = true;
                }
            }
        }
    }
});

/* Cookie */
var cookiesTest2 = get_cookie("test2");
if (cookiesTest2 !== '' && cookiesTest2 !== null) {
    // return false;
} else {
    var closeMod1 = false;
    var closeMod2 = false;
    var closeMod3 = false;

    $(document).mouseleave(function (event) {
        event = event || window.event;
        if (event.clientY < 0 || event.clientY < 3) {
            if (!closeMod3) {

                $('html').addClass('stop');
                $('#modal-free').fadeIn();


                closeMod3 = true;


                var date2 = new Date();
                date2.setDate(date2.getDate() + 7);
                date2 = date2.toUTCString();
                document.cookie = "test2=1;expires=" + date2;
            }

        }
    });

}

function get_cookie(cookie_name) {
    var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');

    if (results)
        return (unescape(results[2]));
    else
        return null;
}

$(document).ready(function ($) {
    var offsetTop2 = $('.compare').offset().top - $(window).height() - 110;
    var lbl = false;
    $(window).scroll(function (event) {
        offsetTop2 = $('.compare').offset().top - $(window).height() - 110;
        if ($(document).scrollTop() > offsetTop2) {

            if (!lbl) {
                $(".twentytwenty-container").each(function (index, el) {
                    $(this).twentytwenty({
                        default_offset_pct: 0.25, // How much of the before image is visible when the page loads
                        no_overlay: true, //Do not show the overlay with before and after
                        move_slider_on_hover: true, // Move slider on mouse hover?
                        move_with_handle_only: true, // Allow a user to swipe anywhere on the image to control slider movement.
                        click_to_move: false
                    });
                });

                lbl = true;
            }
        }
    });
});