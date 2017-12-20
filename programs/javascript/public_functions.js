/*
 *
 *  Require ES6 (ES 2015)
 *
 *
 *  Copyright Paul-Louis Mas 2017
 *
 */

// Extended length method: allows to provide numbers
const length = e => ((typeof(e) == "number") ? e.toString() : e).length;

// Extended typeof method: allows to differentiate arrays, undefined, and null from objects
const typeofx = l => (l).constructor.toString().substr(9).split("(")[0].toLowerCase();

// Extended reverse method: allows to provide strings
const reverse = e => (typeof(e) == "object") ? e.reverse() : ((typeof(e) == "string") ? e.split("").reverse().join("") : ((typeof(e) == "boolean") ? !e : null));
