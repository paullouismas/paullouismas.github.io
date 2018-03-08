(function(w, d) {
	document.querySelectorAll('exec').forEach(function(e) {
		if (e.attributes.encoding)
			e.attributes.encoding.value = e.attributes.encoding.value || 'plain';
		try {
			e.innerHTML = eval(
				e.attributes.encoding != undefined && e.attributes.encoding.value == 'base64'
				? atob(e.attributes.value.value)
				: e.attributes.value.value
			);
		} catch(error) {
			console.error(error);
		}
	});
})(window, document);
