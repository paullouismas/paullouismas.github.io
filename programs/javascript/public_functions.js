/*
 *
 *  Require ES6 (ES 2015)
 *
 *
 *  Copyright  Paul-Louis Mas 2017
 *
 */

/*
 *
 * Description: This file contain some customs-made functions that I often use, you can use them freely but you need to contact me before if it requires any commercial use.
 *
 * Comment: some functions require others implemented in this file to work properly and so, a total implementation of the file is required.
 *
 */

// Extended length method: allows to provide numbers
const length = e => ((typeof(e) == "number") ? e.toString() : e).length;

// Extended typeof method: allows to differentiate arrays from objects
const typeofx = l => (l).constructor.toString().replace(/(\{[\w\s\[\]]*\})|(function)|([^\w])/g, "").toLowerCase();

// Extended reverse method: allows to provide strings
const reverse = e => (typeof(e) == "object") ? e.reverse() : ((typeof(e) == "string") ? e.split("").reverse().join("") : ((typeof(e) == "boolean") ? !e : null));

// Basic implementation of a shuffle method: allows to shuffle characters in string and elements in array
const shuffle = e => {
	let a = [], i, s = ((typeofx(e) == "string") ? e.split("") : e);
	while (a.length < s.length) (i => ((s[i] != undefined) ? (a.push(s[i]), s[i] = undefined) : null))(Math.floor((Math.random() * s.length)));
	return ((typeofx(e) == "string") ? a.join("") : a);
};
