$(function(){
    var $nav = $("#nav"),
        $window = $(window),
        $offset = $nav.outerHeight(true);

    if(location.hash){
        animatingScroll($(location.hash));
    }

    function changeColor(event){
        var $this = $(this);
        if( $this.scrollTop()+$offset >= $window.height() ){
            if(!$nav.hasClass('header__clear--black')){
                $nav.addClass('header__clear--black');
            }
        }else if($this.scrollTop() < $window.height() && $nav.hasClass('header__clear--black')){
            $nav.removeClass('header__clear--black');
        }
    }

    var $document = $(document),
        $menuItem  = $(".nav__item__link");

    function setMenuItem(event){
        var $this = $(this),
            scrollTop = $this.scrollTop();
        $menuItem.each(function(index, e){
            var $section = $(e.getAttribute("href")),
                $e = $(e);
            if( scrollTop+$offset >= $section.offset().top && scrollTop+$offset < $section.offset().top + $section.outerHeight(true) ){
                if(!$e.hasClass('nav__item__link--active')){
                    $e.addClass('nav__item__link--active');
                } return
            }else if( $e.hasClass('nav__item__link--active') ){
                $e.removeClass('nav__item__link--active');
            }
            return;
        });
    }

    function animateScroll(event){
        event.preventDefault();
        var hash = event.target.getAttribute("href") || false,
            $section = $(hash),
            $mobilneNav = $("#mobile-nav");
        animatingScroll($section);
        if(hash) location.hash = hash;
        $mobilneNav.removeClass('nav-mobile__status--open');
        $mobilneNav.addClass('nav-mobile__status--hide');
    }

    function animatingScroll($section){
        var top = $section.length ? $section.offset().top-$offset : -1;
        $("html,body").not(':animated').animate({ scrollTop: top+1},500);
    }

    var $mobileNav = $('#mobile-nav');

    function mobileMenu(){
        var $this = $(this);
        if(!$this.hasClass('nav-mobile__status')) $this.addClass('nav-mobile__status');
        $this.toggleClass('nav-mobile__status--open');
        $this.toggleClass('nav-mobile__status--hide');
    }
    $mobileNav.on('click', mobileMenu)

    $(document).on("scroll",setMenuItem);

    $(document).on("scroll",changeColor);

    $menuItem.add('.logo:not(.logo--big), .contact__item__link--map').on("click",animateScroll);
})