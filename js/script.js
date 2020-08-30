/* sticky */
const mainPaddingElement = document.getElementById('wrapper');
const mainHeader = document.getElementById('main-header');
let headerHeight =  mainHeader.clientHeight;
mainHeader.classList.add("sticky");

window.addEventListener('resize', function () {
    paddingTopWrap()
});
window.addEventListener('orientationchange', function () {
    paddingTopWrap()
});

window.onscroll = function() {
	windowScrollTop()
};

function paddingTopWrap() {
	mainPaddingElement.style.paddingTop = headerHeight+'px';
}paddingTopWrap();

function windowScrollTop() {
	if (window.pageYOffset > 0){
		document.querySelector('body').classList.add("sticky");
	} else{
		document.querySelector('body').classList.remove("sticky");
	}
}windowScrollTop();

/* menu */
const navTriggers = document.querySelectorAll('.nav-trigger');
navTriggers.forEach(function(navTrigger) {
	navTrigger.addEventListener('click', function () {
		mainHeader.classList.toggle("active");
		document.querySelector('body').classList.toggle("menu-active");
	});
});

/*  */
const hasInlineColors = document.querySelectorAll('.has-inline-color');
hasInlineColors.forEach(function(hasInlineColor) {
	hasInlineColor.closest('h2').classList.add("no-border");
});