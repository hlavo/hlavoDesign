$(function(){
    var $header = $('.header__bg'),
        bgTop  = $(".header").offset().top,
        windowHeight = $(window).height();

    function parallax(){
        var winTop = $(this).scrollTop(),
            ratio = Math.floor(0-winTop) *0.5;
        $header.css({transform:'translate3d(0px,'+ratio+'px,0px)'})
    }

    $(document).on('scroll',parallax)

});