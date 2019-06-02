//появление\скрытие меню
function scrollMenu() {
    let lastScroll = 0,
        Y = 0,
        Yblock = 0,
        header = $('.js_header-block');

    function blabla() {
        header.on('mouseenter', function () {
            return Yblock = true;
        });
        header.on('mouseleave', function () {
            return Yblock = false;
        });
        console.log(Yblock)
    }


    $(window).on('scroll mousemove', function (e) {
        let pos = $(this).scrollTop(),
            Y = e.clientY;

        if ((lastScroll < pos && pos > 720)) {
            header.addClass('hide');
            header.removeClass('show');
        }
        if (pos === 0) {
            header.removeClass('hide');
            header.removeClass('show')

        } else if ((lastScroll) > pos) {
            header.addClass('show');
            header.removeClass('hide')
        }
        lastScroll = pos;
    })
}

//реверс цвета для блока "Логотип"
function pointClick() {
    $('.js_color-change-point').on('click', function () {
        $('.js_color-change').toggleClass('reverse-color')
    })
}

//переключение тумблеров
function tublers() {
    $('.js_tumbler-grid').on('click', function () {
        $(this).parents('.js_guides-block').toggleClass('grid-bg');
        $(this).toggleClass('active');
    });
    $('.js_tumbler-area').on('click', function () {
        $('.js_area-block').toggleClass('show');
        $(this).toggleClass('active');
    })
}

//плавный переход к якорям
function anchors() {
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();

        var sc = $(this).attr("href"),
            dn = $(sc).offset().top - 25;

        $('html, body').animate({scrollTop: dn}, 1000);
    });
}

$(window).ready(function (e) {
    scrollMenu();
    pointClick();
    tublers();
    anchors();


});