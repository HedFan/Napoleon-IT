function scrollMenu() {
    let lastScroll = 0;
    $(window).on('scroll', function(e) {
        let pos = $(this).scrollTop(),
            header = $('.js_header-block');

        if (lastScroll < pos) {
            header.addClass('hide');
            header.removeClass('show')

        }
        if (pos === 0) {
            header.removeClass('hide');
            header.removeClass('show')
        }
        else if (lastScroll > pos) {
            header.addClass('show');
            header.removeClass('hide')
        }
        lastScroll = pos;

    })
}

$(window).ready(function() {
    scrollMenu()
});