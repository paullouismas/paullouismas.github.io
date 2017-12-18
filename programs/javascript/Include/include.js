const include = u => {
	if (typeof u == "string") {
		try {
			const x = new XMLHttpRequest();
			x.open("GET", u, false);
			x.overrideMimeType("text/javascript");
			x.send(null);
			eval(x.responseText);
			return true;
		} catch(err) {
			console.warn(err);
			return false;
		}
	}
}
