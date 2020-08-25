$(document).ready(function() {

	/* sticky */  
	$mainPaddingElement = $('#wrapper');
	$mainPaddingElement.css('padding-top', $('#main-header').outerHeight());
	$('#main-header').addClass('sticky');
	$(window).on('resize orientationChange', function() {
		$mainPaddingElement.css('padding-top', $('#main-header').outerHeight());
	});

	$(window).scroll(function (){
		if ($(this).scrollTop() > 0){
			$("body").addClass('sticky');
		} else{
			$("body").removeClass('sticky');
		}
	});

    /* menu */
    $('.nav-trigger').on('click', function(){
        $('.main-header').toggleClass('active');
        $('.nav-trigger').toggleClass('active');
        $('body').toggleClass('menu-active');
        return false;
    });

    $('.main-nav .menu-item-has-children > a').append('<span class="plus"></span>');
	$('.main-nav .menu-item-has-children > a .plus').on('click', function(){
		$(this).parent('a').next('ul').slideToggle();
		$(this).toggleClass('active');
		return false;
	});

    /* lang */
	$('.active-lang').on('click', function(){
		$('.language').toggleClass('active');
		return false;
	});
	$(document).on('click', function(e) {
	  if (!$(e.target).closest(".language").length) {
	    $('.language').removeClass('active');
	  }
	  e.stopPropagation();
	});

	/**/
	if(document.documentElement.clientWidth < 992) {
		logoOrderMobile();
	}
	$(window).on('resize orientationChange', function() {
		if ( $(window).width() < 992 ) {
			logoOrderMobile();
		} else {
			logoOrderDesc();
		}
	});
	function logoOrderMobile() {
		$("#main-header .logo").detach().prependTo('#main-header .container');
	}
	function logoOrderDesc() {
		$("#main-header .logo").detach().prependTo('#main-header .header-row');
	}



});