(function(w, d) {
	document.querySelectorAll('.js-current-year').forEach(function(e) { e.innerHTML = new Date().getFullYear(); });
	document.querySelectorAll('exec').forEach(function(e) {
		try {
			e.innerHTML = eval(e.attributes.value.value).toString();
		} catch(error) {
			console.log(error);
		}
	});
})(window, document);
