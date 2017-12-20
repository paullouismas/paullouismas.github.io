const length = e => {
	switch (typeof(e)) {
		case "string":
		case "object":
			return t.length;
			break;
		case "number":
			let i = 1;
			while (e >= Math.pow(10, i)) i++;
			return i;
			break;
	}
}
