if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    $('.selectpicker').selectpicker('mobile');
}

(function($) {
    //- paper動畫
    $(".paper_button > button").click(function() {
        $(".paper_ad").slideDown(500);
    });
    $(".paper_ad .close").click(function() {
        $(this).parent().parent().slideUp(500);
    });

    //- owl carousel
    $('.index').owlCarousel({
        loop: true,
        margin: 30,
        dots: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true,
                navText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ]

            },
            768: {
                items: 4,
                nav: false,
                loop: false
            }
        }
    })

    //- 數量
    $(".pro_num").WanSpinner({
        maxValue: 200,
        minValue: 1,
        start: 1,
        inputWidth: 60
    });

    //- 購物車表格
    $('.tablestyle').footable();

    //- 常見問題
    $('.faq_list>li>h3').click(function(e) {
        if ($(this).parent('li').hasClass('active')) {
            $(this).parent('li').removeClass('active');
        } else {
            $('.faq_list>li').removeClass('active');
            $(this).parent('li').addClass('active');
        }
    });

    // 清除文編器圖片寬高
    $('.textedit img').css({
        height: 'auto',
        width: 'auto',
        maxWidth: '100%'
    });

    //購物車fancybox
    $(".cargo_btn").fancybox({
    		toolbar  : false,
        smallBtn: false
    })
})(jQuery);