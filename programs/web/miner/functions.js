function generate(length, possible) {
	// var possible = "azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN";
	var text = "";
	for (var i = 0; i < length; i++) {
		text+=possible.charAt(Math.floor(Math.random()*possible.length));
	}
	return text || console.log(text);
}

function interst(value, probability) {
	var length = value.length;
	var text = "";
	for (var i = 0; i < length; i++) {
		text+=value.charAt(i)
		if (Math.random()>probability) {
			text+=generate(1, ",?;.:/");
		}
	}
	return text || console.log(text);
}

function reverse(value) {
	var text = "";
	var length = value.length;
	for (var i = 0; i < length; i++) {
		text=value.charAt(i)+text;
	}
	return text || console.log(text);
}

function encoding(value) {
	var input = btoa(value);
	input = reverse(input);
	input = interst(input,0.1);
	return input || console.log(input);
}

function decoding(value) {
	var input = value.replace(/[\,\?\;\.\:\/]/g,'');
	input = reverse(input);
	input = atob(input);
	return input || console.log(input);
}
