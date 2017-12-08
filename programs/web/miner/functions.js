const generate = (l, p) => {
	let t = "";
	for (let i = 0; i < l; i++) t += p.charAt(Math.floor(Math.random()*p.length));
	return t || console.log(t);
}

const interst = (v, p) => {
	let [l, t] = [v.length, ""];
	for (let i = 0; i < l; i++) {
		t += v.charAt(i)
		if (Math.random() > p) t += generate(1, ",?;.:/");
	}
	return t || console.log(t);
}

const reverse = (v) => {
	let t = "";
	for (let i = 0; i < v.length; i++) t = v.charAt(i) + t;
	return t || console.log(t);
}

const encoding = (v) => {
	v = interst(reverse(btoa(v)), 0.1);
	return v || console.log(v);
}

const decoding = (v) => {
	v = atob(reverse(v.replace(/[\,\?\;\.\:\/]/g, "")));
	return v || console.log(v);
}
