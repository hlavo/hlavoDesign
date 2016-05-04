$(function(){

    var overlay = {
        $overlay : $('#overlay'),
        $workItem :  $(".section--work__item"),
        _init: function(event){
            overlay._offHandlers();
            if($(window).width() < 1280) overlay._handlers();
        },
        _toggleShow: function(event){
            if(!overlay.$overlay.hasClass('overlay__status')) overlay.$overlay.addClass('overlay__status');
            var $target = $(event.target);
            if($target.hasClass('section--work__item') || $target.hasClass('overlay__cross')) {
                if($target.hasClass('section--work__item')){
                    overlay._innerHtml(event);
                }
                overlay.$overlay.toggleClass('overlay--active');
                overlay.$overlay.toggleClass('overlay--hide');
            }
            if($target.hasClass('button')) return false;
        },
        _handlers: function () {
            overlay.$workItem.on('click',overlay._toggleShow);
            overlay.$overlay.on('click',overlay._toggleShow);
        },
        _offHandlers: function(){
            if(overlay.$overlay.hasClass('overlay__status')) overlay.$overlay.removeClass('overlay__status');
            overlay.$workItem.off('click',overlay._toggleShow)
            overlay.$overlay.off('click',overlay._toggleShow);
        },
        _innerHtml: function(event){
            var innerHTML = $(event.target).find('.section--work__item__text').html();
            overlay.$overlay.find(".overlay__content").html(innerHTML);
        }
    }

    overlay._init();
    $(window).on('resize',overlay._init)

});