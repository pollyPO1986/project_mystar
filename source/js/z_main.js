var rollSet = $('#epaper');
var offset = rollSet.offset();
var fwidth = $("footer").height();

$(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
        $('#gotop').fadeIn("fast");
    } else {
        $('#gotop').stop().fadeOut("fast");
    }
    
    var moHeight = $(window).scrollTop() + $(window).height();
    var foHeight = $(document).height() - $("footer").height();
    if ($('#gotop').length > 0) {
        if (moHeight < foHeight) {
            $('#gotop').removeClass('foo_top');
        } else {
            $('#gotop').addClass('foo_top');
        }
    }
});

$(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    var scrollBtm = $(document).height() - $(window).scrollTop() - $("#epaper").height();
    if (scrollTop > fwidth) {
        rollSet.removeClass('fixed').addClass('abset')
    } else {
        rollSet.removeClass('abset').addClass('fixed')
    }

    // if (offset.top > scrollTop) {
    //     if (scrollBtm > fwidth) {
    //         rollSet.removeClass('absolute').addClass('fixed')
    //     } else {
    //         rollSet.removeClass('fixed').addClass('absolute')
    //     }
    // } else {
    //     rollSet.removeClass('fixed')
    // }
});
$(function() {
    //-Menu
    $('#toggle').click(function() {
        $(this).toggleClass('active');
        $('#overlay').toggleClass('open');
    });

    $('#toggle_sm').click(function() {
        $(this).toggleClass('active');
        $('#overlay_sm').toggleClass('open');
    });

    //-go top
    $("#gotop").click(function() {
        jQuery("html,body").animate({
            scrollTop: 0
        }, 1000);
    });

    //-tooltip
    $(function() {
        $('[data-toggle="tooltip"]').tooltip()
    });
});