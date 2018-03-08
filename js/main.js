(function(w, d) {
	document.querySelectorAll('exec').forEach(function(e) {
		try {
			e.innerHTML = eval(e.attributes.value.value);
		} catch(error) {
			console.error(error);
		}
	});
})(window, document);
