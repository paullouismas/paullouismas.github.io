/*
 *
 *  Require ES6 (ES 2015)
 *
 *
 *  Copyright Paul-Louis Mas 2017
 *
 */

// Extended length method: allows to provide numbers
const length = e => ((typeof(e)=="number")?e.toString():e).length;

// Extended typeof method: allows to differentiate arrays from objects
const typeofx = l => (typeof(l)!="object")?typeof(l):((l==null)?"null":((l.length==undefined)?"object":"array"));
