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
const typeofx = l => (l).constructor.name;

// Extended reverse method: allows to provide strings and booleans
const reverse = e => (typeofx(e) == "array")
			? e.reverse() 
			: ((typeofx(e) == "string") 
			   ? e.split("").reverse().join("") 
			   : ((typeofx(e) == "boolean") 
			      ? !e 
			      : null));

// Basic implementation of a shuffle method: allows to shuffle characters in string and elements in array
const shuffle = e => {
	let a = [], i, s = ((typeofx(e) == "string") ? e.split("") : e);
	while (a.length < s.length)
		(i => ((s[i] != undefined) 
		       ? (a.push(s[i]), s[i] = undefined) 
		       : null)
		)(Math.floor((Math.random() * s.length)));
	return ((typeofx(e) == "string") ? a.join("") : a);
};

// Extended minimum of array elements implementation
const min = a => Math.min(...a);

// Extended maximum of array elements implementation
const max = a => Math.max(...a);

// Basic implementation of the sum of array elements
const sum = a => a.reduce((b, c) => b + c, 0);

// Basic implementation of the average value of array elements
const average = a => a.reduce((b, c) => b + c, 0) / a.length;

// Function to convert JSON formated CSS into HTML formated CSS
/*
	The JSON formated CSS must be in the following format:
		[
			{
				'element1': [
					{ 'props1': 'value1' }, 
					{ 'props2': 'value2' }, 
					..., 
					{ 'propsN': 'valueN' }
				]
			}, 
			{
				'element2': [
					{ 'props1': 'value1' }, 
					{ 'props2': 'value2' }, 
					..., 
					{ 'propsN': 'valueN' }
				]
			}, 
			...
		]
	
	The HTML formated CSS will be in this format:
		element1 {
			props1: value1;
			props2: value2;
			...
			propsN: valueN;
		}
		element2 {
			props1: value1;
			props2: value2;
			...
			propsN: valueN;
		}
*/
const parseCSS = a => a.map(b => Object.keys(b).map(e => `${e} {\n${b[e].map(c => Object.keys(c).map(d => `${d}: ${c[d]};`)}`).join('\n') + '\n}').join('\n')).join('\n');

// Function to parse JSON formated HTML attributes into HTML formated attributes
const parseHTMLattributes = (a = []) => a.map(b => Object.keys(b).map(c => ' ' + c + '="' + b[c] + '"').join('')).join('');

// Function to parse JSON formated HTML into pure HTML
const parseHTML = (a = '') => (typeof a == 'object' ? (a == undefined ? '' : (a.map(b => typeof b == 'object' ? Object.keys(b).map(c => '<' + c + parseHTMLattributes(b[c].attributes || []) + '>\n' + (typeof b[c].innerHTML == 'object' ? parseHTML(b[c].innerHTML) : b[c].innerHTML) + '\n</' + c + '>').join('') : b).join('\n'))) : a);

// Function to parse JSON formated HTML into base HTML code
const parseHTMLobject = (a = '') => (typeof a == 'object' ? (a == undefined ? '' : (a.map(b => typeof b == 'object' ? Object.keys(b).map(c => '<' + c + (a => a.map(b => Object.keys(b).map(c => ' ' + c + '="' + b[c] + '"').join('')).join(''))(b[c].attributes || []) + '>\n' + (typeof b[c].innerHTML == 'object' ? parseHTMLobject(b[c].innerHTML) : b[c].innerHTML) + '\n</' + c + '>').join('') : b).join('\n'))) : a);

// Function to parse raw data to ascii encoded data
class Alt {
	static compile(a) {
		return a
			.replace(/[^0-9\&\#\;]/g, '')
			.split(/[\&\#\;]/g)
			.map(e => String.fromCharCode(new Number(e)))
			.join('');
	};
	static decompile(s) {
		return s
			.split('')
			.map(e => '&#' + e.charCodeAt(0).toString() + ';')
			.join('');
	};
}

/*
 *	Class: AdvancedObject
 *
 *	Advanced object definition. Allows to use objects and custom-made properties as keys for keys/values pairs.
 *	Can be initialized using a normalized object (object with standardized keys).
 *	Returns an object.
 *
 *	/!\ WARNING /!\
 *		Do not support the use of objects with circular data as keys.
 *	/!\ WARNING /!\
 *
 *	.add:		Function for adding items to the object. 
 *				Returns the added value.
 *				If only one parameter is specified, use the iterator value as key for value parameter1, else use parameter1 as key and parameter2 as value.
 *	.get:		Function for getting value using the key. 
 *				Returns the value.
 *				If no parameter is specified, use the last used iterator as key to search, else use the parameter1.
 *	.update:	Function for updating value of a certain key. 
 *				Returns the updated value.
 *				If only one parameter is specified, use the iterator value as key for updating value parameter1, else use parameter1 as key and parameter2 as value.
 *	.remove:	Function for removing a key/value pair. 
 *				Returns the deleted value.
 *				If no parameter is specified, use the last used iterator as key to delete, else use the parameter1.
 *	get keys:	Getter for getting all stored keys. 
 *				Returns an array containing the existing keys.
 *
 */
class AdvancedObject {
	constructor(items = {}) {
		this.__CreateKey__ = key => btoa(JSON.stringify({ key }));
		this.__GetKey__ = keyToken => JSON.parse(atob(keyToken))["key"];
		this.__DataContext__ = new class DataContext {
			contructor() {
				this.iterator = 0;
				this.list = (function(a, b) {
					let l = {};
					Object.keys(a).forEach(key => l[b(key)] = a[key]);
					return l;
				})(items, this.__CreateKey__);
			};
		}
	}

	add(arg1 = null, arg2) {
		let [key, value] = arg2 == undefined ? [this.__DataContext__.iterator++, arg1] : [arg1, arg2];

		try { key = this.__CreateKey__(key); }
		catch (e) { throw new Error("The use of objects with circular data as keys is impossible."); }

		if (this.__DataContext__.list[key] != undefined || Object.keys(this.__DataContext__.list).includes(key) == true)
			throw new Error("Key does already exist");

		return this.__DataContext__.list[key] = value;
	}
	get(key = this.__DataContext__.iterator) {
		try { key = this.__CreateKey__(key); }
		catch (e) { throw new Error("The use of objects with circular data as keys is impossible."); }

		return this.__DataContext__.list[key];
	}
	update(key = this.__DataContext__.iterator, value = null) {
		try { key = this.__CreateKey__(key); }
		catch (e) { throw new Error("The use of objects with circular data as keys is impossible."); }

		if (this.__DataContext__.list[key] == undefined || Object.keys(this.__DataContext__.list).includes(key) == false)
			throw new Error("Key does not already exist");

		return this.__DataContext__.list[key] = value;
	}
	remove(key = this.__DataContext__.iterator) {
		try { key = this.__CreateKey__(key); }
		catch (e) { throw new Error("The use of objects with circular data as keys is impossible."); }

		let value = this.__DataContext__.list[key];

		if(value == undefined || Object.keys(this.__DataContext__.list).includes(key) == false)
			throw new Error("Key does not already exist");

		this.__DataContext__.list[key] = undefined;
		delete this.__DataContext__.list[key];

		return value;
	}

	get keys() { return Object.keys(this.__DataContext__.list).map(e => this.__GetKey__(e)); }
}

/*
 *	Class: JSONParser
 *
 *	Advanced JSON manipulation. Allows to manipulate deepness of parsing/stringifying, support prevention of circular JSON error.
 *
 *	static stringify:	Function for converting JavaScript objects into JSON string.
 *						Returns an object with 3 values.
 *			key jsonInput:		Original object to convert.
 *			key config:			Configuration used while performing conversion.
 *			key stringReturn:	The JSON string returned after conversion.
 *		parameter 1:	The JavaScript JSON object that needs to be converted.
 *		parameter 2:	Optionnal. Object defining the configuration for processing the object.
 *			key errorMsg:				The custom implemented error message for specifying maximum deepness reached.
 *			key blacklist:				An array containing the types to not convert. 
 *										Empty means any types are converted.
 *			key whitelist:				An array containing the types to convert. 
 *										Must include type "object" for performing deep conversion. 
 *										Empty means all types are converted.
 *			key spacing:				A string containing the amount of spaces to use while performing conversion. 
 *										/!\ WARNING /!\
 *											Will get deprecated soon.
 *										/!\ WARNING /!\
 *			key stringifyFunction:		A function that will get executed during conversion. 
 *										/!\ WARNING /!\
 *											Will get deprecated soon.
 *										/!\ WARNING /!\
 *			key maxLevel:				A number specifying the maximum deepness while converting. 
 *										Allows to bypass circular JSON conversion error.
 *			key debug:					Boolean to enter debug mode.
 *			key prettyPrint:			Boolean to use pretty printed mode for conversion of objects.
 *			key prettyPrintIndentation:	A string containing the amount of spaces to use while performing pretty-print conversion.
 *	static parse:		Function for converting JSON string into a JavaScript object.
 *						Returns an object with 2 values.
 *			key stringInput:	Original string to parse.
 *			key jsonReturn:		Parsed object.
 *		parameter 1:	The JSON string to parse.
 *
 */
class JSONParser {
	static stringify(json = {}, config = {}) {
		let {
			errorMSg: errorMSg = "[[Max level reached]]", 
			blacklist: blacklist = [], 
			whitelist: whitelist = [], 
			spacing: spacing = "", 
			stringifyFunction: stringifyFunction = null, 
			maxLevel: maxLevel = 10, 
			debug: debug = false, 
			prettyPrint: prettyPrint = false, 
			prettyPrintIndentation: prettyPrintIndentation = "    "
		} = config;

		if (debug === true)
			console.log({ errorMSg, blacklist, whitelist, spacing, stringifyFunction, maxLevel, debug, prettyPrint, prettyPrintIndentation });

		let j = new class JSONParserStringifyObject {
			constructor() {
				this.jsonInput = json;
				this.config = new class JSONParserStringifyConfig {
					constructor() {
						this.errorMSg = errorMSg;
						this.blacklist = blacklist;
						this.whitelist = whitelist;
						this.spacing = spacing;
						this.stringifyFunction = stringifyFunction;
						this.maxLevel = maxLevel;
						this.debug = debug;
						this.prettyPrint = prettyPrint;
						this.prettyPrintIndentation = prettyPrintIndentation;
					}
				};
				this.stringReturn = "";
			}
		};

		switch (typeof(json)) {
			case "object":
				j.stringReturn = `{${stringify(json, 1)}}`;
				break;
			case "undefined":
				j.stringReturn = undefined;
				break;
			case "string":
			case "number":
			case "boolean":
				j.stringReturn = JSON.stringify(json);
				break;
			case "function":
				j.stringReturn = json.toString();
				break;
			default:
				console.warn(`Type "${typeof(value)}" unrecognized.`);
				return;
		}

		j.stringReturn = prettyPrint === true && typeof(json) == "object" ? JSON.stringify(JSON.parse(j.stringReturn), null, prettyPrintIndentation) : j.stringReturn;

		return j;

		function e(string) { return JSON.stringify(string); }

		function stringify(json, level = maxLevel) {
			if (level == maxLevel)
				return `"_": ${JSON.stringify(errorMSg, stringifyFunction, spacing)}`;

			let keys, value;
			let r = [];

			try { keys = Object.keys(json); }
			catch(e) { console.log("Error:", json, typeof(json), e); }

			for (let i = 0; i < keys.length; i++) {
				value = json[keys[i]];

				if (blacklist.includes(typeof(value)) || (whitelist.length > 0 && !whitelist.includes(typeof(value))))
					continue;

				switch (typeof(value)) {
					case "object":
						r.push(`${e(keys[i])}:` + (value == null ? "null" : `{${stringify(value, level + 1)}}`));
						break;
					case "undefined":
						r.push(`${e(keys[i])}:"undefined"`);
						break;
					case "string":
					case "number":
					case "boolean":
						r.push(`${e(keys[i])}:${JSON.stringify(value, stringifyFunction, spacing)}`);
						break;
					case "function":
						r.push(`${e(keys[i])}:${JSON.stringify(value.toString(), stringifyFunction, spacing)}`);
						break;
					default:
						console.warn(`Type "${typeof(value)}" unrecognized.`);
				}
			}

			return r.join(",");
		}
	}
	static parse(string) {
		return new class JSONParserParseObject {
			constructor() {
				this.stringInput = string;
				this.jsonReturn = JSON.parse(string);
			}
		};
	}
}

/*
 *	Class: Conditionnal
 *
 *	Advanced conditionnal manipulations. 
 *
 *	static if:			An if/else condition implementation.
 *						Returns an object with 6 values.
 *			key test:			A function returning a boolean or a boolean value defining the test of the if conditionnal.
 *			key testResult:		The boolean defining the test.
 *			key expr1:			The expression to return/execute if the test === true.
 *			key expr2:			The expression to return/execute if the test === false.
 *			key expr1Result:	The result of the return/execution of the expr1 if the test === true.
 *			key expr2Result:	The result of the return/execution of the expr2 if the test === false.
 *		parameter 1:	A function returning a boolean or a boolean value defining the test of the if conditionnal.
 *		parameter 2:	The expression to return/execute if the test === true.
 *		parameter 3:	The expression to return/execute if the test === false.
 *	static then:		A linear implementation of chained functions: keep executing functions in line while they return true.
 *						Returns an object with 2 values.
 *			key arguments:	A list of all arguments provided.
 *			key final:		A boolean that represent the total success or failure of the execution of the arguments.
 *		parameters:	At least one parameter is required. The different expressions (each one as an argument) that needs to be performed using a chain method: as soon as one return false, the others won't get executed.
 *	static tryCatch:	An implementation of a try-catch system.
 *						Returns an object with 6 values.
 *			key try:			The try expression that needs to be performed.
 *			key catch:			The catch expression that needs to be performed in case of failure.
 *			key tryResult:		The data returned by the execution of the try expression.
 *			key catchResult:	The data returned byt the execution of the catch expression.
 *			key error:			The error in case the try expression throw an error.
 *			get results:		Returns an array containing the different results from the try and catch expressions.
 *
 */
class Conditionnal {
	static if(test = false, expr1 = undefined, expr2 = undefined) {
		return new class ConditionnalIf {
			constructor() {
				this.test = test;
				this.expr1 = expr1;
				this.expr2 = expr2;
				this.testResult = !!(typeof(this.test) == "function" ? this.test() : this.test);
				this.expr1Result = this.testResult ? (typeof(this.expr1) == "function" ? this.expr1() : this.expr1) : undefined;
				this.expr2Result = !this.testResult ? (typeof(this.expr2) == "function" ? this.expr2() : this.expr2) : undefined;
			}
		}
	}
	static then() {
		args = [...arguments];

		return new class ConditionnalThen {
			constructor() {
				this.arguments = args;
				this.final = this.arguments.every(_ => !!(typeof(_) == "function" ? _() : _) == true);
			}
		}
	}
	static tryCatch(tryArgument = _ => void(_), catchArgument = _ => void(_)) {
		return new class ConditionnalTryCatch {
			constructor() {
				this.try = tryArgument;
				this.catch = catchArgument;
				this.tryResult = null;
				this.catchResult = null;
				this.error = undefined;
				
				try {
					if (typeof(this.try) != "function")
						throw new Error("Try argument isn't a function.");

					this.tryResult = this.try();
				}
				catch (error) {
					if (typeof(this.catch) != "function")
						throw new Error("Catch argument isn't a function.");

					this.error = error;
					this.catchResult = this.catch(this.error);
				}
			}

			get results() { return [this.tryResult || this.catchResult, this.tryResult, this.catchResult]; }
		}
	}
}

HTMLDocument.Exec = _ => 
	[ ...document.querySelectorAll("exec") ]
	.map(function(e) {
		try {
			e.innerHTML = eval(e.attributes.value.value);
		} catch (error) {
			console.error(error);
			return false;
		}
		return true;
	})
	.every((value, index, array) => value === array[0]);

Object.prototype.getItemsByValuesConstructorName = function(constructorName = undefined) {
	return Object.keys(this).map(key => ({
		key, 
		value: this[key], 
		valueConstructor: this[key] != null ? this[key].constructor.name : null
	}))
	.filter(e => e.valueConstructor != null && e.valueConstructor == constructorName);
}
