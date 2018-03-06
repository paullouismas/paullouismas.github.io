window.onload = function() {
	document.querySelectorAll('.js-current-year').map(e => e.innerHTML = new Date().getFullYear());
};
