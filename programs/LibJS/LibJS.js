var init = null;
if(document) {
    var __isReal__ = true;
} else {
    var __isReal__ = false;
}
var LibJS = {
	encode: function(string) {
		var ss = btoa(string)
		ss.split("").reverse();
		var d = {};
		for(var i = 0; i < ss.length; i++) {
			d[i] = btoa(ss[i]);
		}
		return btoa(d.reverse()).join("?");
	},
	decode: function(string) {
	    var ss = string;
	    ss.split("?");
	    ss = atob(ss);
		ss.reverse();
		var d = {};
		for(var i = 0; i < ss.length; i++) {
			d[i] = atob(ss[i]);
		}
		return atob(d.reverse().join(""));
	},
	map: function(n, start1, stop1, start2, stop2) {
		return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
	},
	isRunning: false,
	blocked: false,
	errors: {
		0: null
	},
	constants: function() {
		var k = [
			eval(10*100), eval(10*201), eval(10*302), eval(10*403), eval(10*504), 
			eval(10*605), eval(10*706), eval(10*807), eval(10*908), eval(10*109), 
			eval(20*100), eval(20*201), eval(20*302), eval(20*403), eval(20*504), 
			eval(20*605), eval(20*706), eval(20*807), eval(20*908), eval(20*109), 
			eval(30*100), eval(30*201), eval(30*302), eval(30*403), eval(30*504), 
			eval(30*605), eval(30*706), eval(30*807), eval(30*908), eval(30*109), 
			eval(40*100), eval(40*201), eval(40*302), eval(40*403), eval(40*504), 
			eval(40*605), eval(40*706), eval(40*807), eval(40*908), eval(40*109), 
			eval(50*100), eval(50*201), eval(50*302), eval(50*403), eval(50*504), 
			eval(50*605), eval(50*706), eval(50*807), eval(50*908), eval(50*109), 
			eval(60*100), eval(60*201), eval(60*302), eval(60*403), eval(60*504), 
			eval(60*605), eval(60*706), eval(60*807), eval(60*908), eval(60*109), 
			eval(70*100), eval(70*201), eval(70*302), eval(70*403), eval(70*504), 
			eval(70*605), eval(70*706), eval(70*807), eval(70*908), eval(70*109), 
			eval(80*100), eval(80*201), eval(80*302), eval(80*403), eval(80*504), 
			eval(80*605), eval(80*706), eval(80*807), eval(80*908), eval(80*109), 
			eval(90*100), eval(90*201), eval(90*302), eval(90*403), eval(90*504), 
			eval(90*605), eval(90*706), eval(90*807), eval(90*908), eval(90*109), 
			eval(10*100), eval(10*201), eval(10*302), eval(10*403), eval(10*504), 
			eval(10*605), eval(10*706), eval(10*807), eval(10*908), eval(10*109)
		];
		var k2 = [
			eval(10*100), eval(10*201), eval(10*302), eval(10*403), eval(10*504), 
			eval(10*605), eval(10*706), eval(10*807), eval(10*908), eval(10*109), 
			eval(20*100), eval(20*201), eval(20*302), eval(20*403), eval(20*504), 
			eval(20*605), eval(20*706), eval(20*807), eval(20*908), eval(20*109), 
			eval(30*100), eval(30*201), eval(30*302), eval(30*403), eval(30*504), 
			eval(30*605), eval(30*706), eval(30*807), eval(30*908), eval(30*109), 
			eval(40*100), eval(40*201), eval(40*302), eval(40*403), eval(40*504), 
			eval(40*605), eval(40*706), eval(40*807), eval(40*908), eval(40*109), 
			eval(50*100), eval(50*201), eval(50*302), eval(50*403), eval(50*504), 
			eval(50*605), eval(50*706), eval(50*807), eval(50*908), eval(50*109), 
			eval(60*100), eval(60*201), eval(60*302), eval(60*403), eval(60*504), 
			eval(60*605), eval(60*706), eval(60*807), eval(60*908), eval(60*109), 
			eval(70*100), eval(70*201), eval(70*302), eval(70*403), eval(70*504), 
			eval(70*605), eval(70*706), eval(70*807), eval(70*908), eval(70*109), 
			eval(80*100), eval(80*201), eval(80*302), eval(80*403), eval(80*504), 
			eval(80*605), eval(80*706), eval(80*807), eval(80*908), eval(80*109), 
			eval(90*100), eval(90*201), eval(90*302), eval(90*403), eval(90*504), 
			eval(90*605), eval(90*706), eval(90*807), eval(90*908), eval(90*109), 
			eval(10*100), eval(10*201), eval(10*302), eval(10*403), eval(10*504), 
			eval(10*605), eval(10*706), eval(10*807), eval(10*908), eval(10*109), 
			eval(k[0]+0), eval(k[1]+1), eval(k[2]+2), eval(k[3]+3), eval(k[4]+4), 
			eval(k[5]+5), eval(k[6]+6), eval(k[7]+7), eval(k[8]+8), eval(k[9]+9), 
			eval(k[0]*0), eval(k[1]*1), eval(k[2]*2), eval(k[3]*3), eval(k[4]*4), 
			eval(k[5]*5), eval(k[6]*6), eval(k[7]*7), eval(k[8]*8), eval(k[9]*9), 
			eval(k[0]-0), eval(k[1]-1), eval(k[2]-2), eval(k[3]-3), eval(k[4]-4), 
			eval(k[5]-5), eval(k[6]-6), eval(k[7]-7), eval(k[8]-8), eval(k[9]-9), 
			eval(k[0]/0), eval(k[1]/1), eval(k[2]/2), eval(k[3]/3), eval(k[4]/4), 
			eval(k[5]/5), eval(k[6]/6), eval(k[7]/7), eval(k[8]/8), eval(k[9]/9)
		];
		var k3 = [];
		for(var i = 0; i < k2.length - 1; i++) {
		    k3[i] = Math.floor(k2[i] % 256);
		}
		return k3;
	},
	constantsSum: function() {
	    var sum = 0;
		var errors = 0;
	    for(var i = 0; i < LibJS.constants().length - 1; i++) {
	        if(!isNaN(LibJS.constants()[i])) {
				sum += LibJS.constants()[i];
			} else {
				errors++;
				sum = sum;
			}
	    }
		return sum;
	},
	rmnet: function(val) {
		var rmnet1 = [
			0+val, 1+val, 2+val, 3+val, 4+val, 5+val, 6+val, 7+val, 8+val, 9+val, 
			0-val, 1-val, 2-val, 3-val, 4-val, 5-val, 6-val, 7-val, 8-val, 9-val, 
			0*val, 1*val, 2*val, 3*val, 4*val, 5*val, 6*val, 7*val, 8*val, 9*val, 
			0/val, 1/val, 2/val, 3/val, 4/val, 5/val, 6/val, 7/val, 8/val, 9/val, 
			0%val, 1%val, 2%val, 3%val, 4%val, 5%val, 6%val, 7%val, 8%val, 9%val, 
			val+0, val+1, val+2, val+3, val+4, val+5, val+6, val+7, val+8, val+9, 
			val-0, val-1, val-2, val-3, val-4, val-5, val-6, val-7, val-8, val-9, 
			val*0, val*1, val*2, val*3, val*4, val*5, val*6, val*7, val*8, val*9, 
			val/0, val/1, val/2, val/3, val/4, val/5, val/6, val/7, val/8, val/9, 
			val%0, val%1, val%2, val%3, val%4, val%5, val%6, val%7, val%8, val%9
		];
		return rmnet1;
	},
	rmnetCheck: function(val) {
		var rmnet1 = LibJS.rmnet();
		var rmnetCheck1 = [];
		for(var i = 0; i < rmnet1.length - 1; i++) {
			rmnetCheck1[i] = isNaN(rmnet1[i]);
		}
		var rmnetCheck2 = [];
		for(var i = 0; i < rmnet1.length - 1; i++) {
			if(rmnetCheck1[i]==true) {
				rmnetCheck2 = 0;
			} else {
				rmnetCheck2 = 1;
			}
		}
		return rmnetCheck2;
	},
	corol: function(n, start1, stop1, start2, stop2) {
		var mp1 = LibJS.map(n, start1, stop1, start2, stop2);
		var mp2 = LibJS.map(start1, stop1, start2, stop2, n);
		var mp3 = LibJS.map(stop1, start2, stop2, n, start1);
		var mp4 = LibJS.map(start2, stop2, n, start1, stop1);
		var mp5 = LibJS.map(stop2, n, start1, stop1, start2);
		var tot = (mp1 + mp2 + mp3 + mp4 + mp5)/5;
		return LibJS.map(mp1, mp2, mp3, mp4, mp5) + tot;
	},
	cdataSpip: function(df) { // Date format : "Mmm DD YYYY HH:MM:SS"
		if(df) {
		    var n = new Date(df);
		} else {
		    var n = new Date();
		}
		var ipsp = n.getDate()*(1+n.getDay())*n.getFullYear()*(1+n.getHours())*(1+n.getMilliseconds())*(1+n.getMinutes())*(1+n.getMonth())*(1+n.getSeconds());
		return ipsp;
	},
	ddb: function(str) {
		if(typeof str == "number") {
			var str1 = str;
			var std1 = str1 % 256;
			var str2 = str1 + std1;
			var std2 = std1 % 128;
			var str3 = str2 + std2;
			var std3 = std2 % 64;
			var str4 = str3 + std3;
			var std4 = std3 % 32;
			var str5 = str4 + std4;
			var std5 = std4 % 16;
			var str6 = str5 + std5;
			var std6 = std5 % 8;
			var str7 = str6 + std6;
			var std7 = std6 % 4;
			var str8 = str7 + std7;
			var std8 = std7 % 2;
			return (str1 * std1 - (str1  + std1)) + (str2 * std2 - (str2 + std2)) + (str3 * std3 - (str3 + std3)) + (str4 * std4 - (str4 + std4)) + (str5 * std5 - (str5 + std5)) + (str6 * std6 - (str6 + std6)) + (str7 * std7 - (str7 + std7)) + (str8 * std8 - (str8 + std8));
		} else {
			return false;
		}
	},
	dataBin: function() {
		var bin = [
			"00000001", "00000010", "00000011", "00000100", "00000101", 
			"00000110", "00000111", "00001000", "00001001", "00001010", 
			"00001011", "00001100", "00001101", "00001110", "00001111", 
			"00010000", "00010001", "00010010", "00010011", "00010100", 
			"00010101", "00010110", "00010111", "00011000", "00011001", 
			"00011010", "00011011", "00011100", "00011101", "00011110", 
			"00011111", "00100000", "00100001", "00100010", "00100011", 
			"00100100", "00100101", "00100110", "00100111", "00101000", 
			"00101001", "00101010", "00101011", "00101100", "00101101", 
			"00101010", "00101011", "00101100", "00101101", "00101110", 
			"00101111", "00110000", "00110001", "00110010", "00110011", 
			"00110100", "00110101", "00110110", "00110111", "00111000", 
			"00111001", "00111010", "00111011", "00111100", "00111101", 
			"00111110", "00111111", "01000000", "01000001", "01000010", 
			"01000011", "01000100", "01000101", "01000110", "01000111", 
			"01001000", "01001001", "01001010", "01001011", "01001100", 
			"01001101", "01001110", "01001111", "01010000", "01010001", 
			"01010010", "01010011", "01010100", "01010101", "01010110", 
			"01010111", "01011000", "01011001", "01011010", "01011011", 
			"01011100", "01011101", "01011110", "01011111", "01100000", 
			"01100001", "01100010", "01100011", "01100100", "01100101", 
			"01100110", "01100111", "01101000", "01101001", "01101010", 
			"01101011", "01101100", "01101101", "01101110", "01101111", 
			"01110000", "01110001", "01110010", "01110011", "01110100", 
			"01110101", "01110110", "01110111", "01111000", "01111001", 
			"01111010", "01111011", "01111100", "01111101", "01111110", 
			"01111111", "10000000", "10000001", "10000010", "10000011", 
			"10000100", "10000101", "10000110", "10000111", "10001000", 
			"10001001", "10001010", "10001011", "10001100", "10001101", 
			"10001110", "10001111", "10010000", "10010001", "10010010", 
			"10010011", "10010100", "10010101", "10010110", "10010111", 
			"10011000", "10011001", "10011010", "10011011", "10011100", 
			"10011101", "10011110", "10011111", "10100000", "10100001", 
			"10100010", "10100011", "10100100", "10100101", "10100110", 
			"10100111", "10101000", "10101001", "10101010", "10101011", 
			"10101100", "10101101", "10101110", "10101111", "10110000", 
			"10110001", "10110010", "10110011", "10110100", "10110101", 
			"10110110", "10110111", "10111000", "10111001", "10111010", 
			"10111011", "10111100", "10111101", "10111110", "10111111", 
			"11000000", "11000001", "11000010", "10000011", "10000100", 
			"10000101", "10000110", "10000111", "10001000", "10001001", 
			"10001010", "10001011", "10001100", "10001101", "10001110", 
			"10001111", "10010000", "10010001", "10010010", "10010011", 
			"10010100", "10010101", "10010110", "10010111", "10011000", 
			"10011001", "10011010", "10011011", "10011100", "10011101", 
			"10011110", "10011111", "10100000", "10100001", "10100010", 
			"10100011", "10100100", "10100101", "10100110", "10100111", 
			"10101000", "10101001", "10101010", "10101011", "10101100", 
			"10101101", "10101110", "10101111", "10110000", "10110001", 
			"10110010", "10110011", "10110100", "10110101", "10110110", 
			"10110111", "10111000", "10111001", "10111010", "10111011", 
			"10111100", "10111101", "10111110", "10111111", "11000000", 
			"11000001", "11000010", "11000011", "11000100", "11000101", 
			"11000110", "11000111", "11001000", "11001001", "11001010", 
			"11001011", "11001100", "11001101", "11001110", "11001111", 
			"11010000", "11010001", "11010010", "11010011", "11010100", 
			"11010101", "11010110", "11010111", "11011000", "11011001", 
			"11011010", "11011011", "11011100", "11011101", "11011110", 
			"11011111", "11100000", "11100001", "11100010", "11100011", 
			"11100100", "11100101", "11100110", "11100111", "11101000", 
			"11101001", "11101010", "11101011", "11101100", "11101101", 
			"11101110", "11101111", "11110000", "11110001", "11110010", 
			"11110011", "11110100", "11110101", "11110110", "11110111", 
			"11111000", "11111001", "11111010", "11111011", "11111100", 
			"11111101", "11111110", "11111111"
		];
		return bin;
	},
	binMod: function() {
	    var dt = [
	        eval(Math.pow(2, 0)), eval(Math.pow(2, 1)), eval(Math.pow(2, 2)), eval(Math.pow(2, 3)), eval(Math.pow(2, 4)), 
	        eval(Math.pow(2, 5)), eval(Math.pow(2, 6)), eval(Math.pow(2, 7)), eval(Math.pow(2, 8)), eval(Math.pow(2, 9))
	    ];
	    return dt;
	},
	sha256: {
	    "link": "https://raw.githubusercontent.com/chrisveness/crypto/master/sha256.js", 
	    "content": "'use strict'; var Sha256 = {}; Sha256.hash = function(msg, options) { var defaults = { msgFormat: 'string', outFormat: 'hex' }; var opt = Object.assign(defaults, options); switch (opt.msgFormat) { default: case 'string':   msg = Sha256.utf8Encode(msg); break; case 'hex-bytes':msg = Sha256.hexBytesToString(msg); break; } var K = [ 0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2 ]; var H = [ 0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19 ]; msg += String.fromCharCode(0x80); var l = msg.length/4 + 2; var N = Math.ceil(l/16); var M = new Array(N); for (var i=0; i<N; i++) { M[i] = new Array(16); for (var j=0; j<16; j++) { M[i][j] = (msg.charCodeAt(i*64+j*4)<<24) | (msg.charCodeAt(i*64+j*4+1)<<16) | (msg.charCodeAt(i*64+j*4+2)<<8) | (msg.charCodeAt(i*64+j*4+3)); }} var lenHi = ((msg.length-1)*8) / Math.pow(2, 32); var lenLo = ((msg.length-1)*8) >>> 0; M[N-1][14] = Math.floor(lenHi); M[N-1][15] = lenLo; for (var i=0; i<N; i++) { var W = new Array(64); for (var t=0;  t<16; t++) W[t] = M[i][t]; for (var t=16; t<64; t++) { W[t] = (Sha256.σ1(W[t-2]) + W[t-7] + Sha256.σ0(W[t-15]) + W[t-16]) >>> 0; } var a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7]; for (var t=0; t<64; t++) { var T1 = h + Sha256.Σ1(e) + Sha256.Ch(e, f, g) + K[t] + W[t]; var T2 =     Sha256.Σ0(a) + Sha256.Maj(a, b, c); h = g; g = f; f = e; e = (d + T1) >>> 0; d = c; c = b; b = a; a = (T1 + T2) >>> 0; } H[0] = (H[0]+a) >>> 0; H[1] = (H[1]+b) >>> 0; H[2] = (H[2]+c) >>> 0; H[3] = (H[3]+d) >>> 0; H[4] = (H[4]+e) >>> 0; H[5] = (H[5]+f) >>> 0; H[6] = (H[6]+g) >>> 0; H[7] = (H[7]+h) >>> 0; } for (var h=0; h<H.length; h++) H[h] = ('00000000'+H[h].toString(16)).slice(-8); var separator = opt.outFormat=='hex-w' ? ' ' : ''; return H.join(separator); }; Sha256.ROTR = function(n, x) { return (x >>> n) | (x << (32-n)); }; Sha256.Σ0  = function(x) { return Sha256.ROTR(2,  x) ^ Sha256.ROTR(13, x) ^ Sha256.ROTR(22, x); }; Sha256.Σ1  = function(x) { return Sha256.ROTR(6,  x) ^ Sha256.ROTR(11, x) ^ Sha256.ROTR(25, x); }; Sha256.σ0  = function(x) { return Sha256.ROTR(7,  x) ^ Sha256.ROTR(18, x) ^ (x>>>3);  }; Sha256.σ1  = function(x) { return Sha256.ROTR(17, x) ^ Sha256.ROTR(19, x) ^ (x>>>10); }; Sha256.Ch  = function(x, y, z) { return (x & y) ^ (~x & z); }; Sha256.Maj = function(x, y, z) { return (x & y) ^ (x & z) ^ (y & z); }; Sha256.utf8Encode = function(str) { return unescape(encodeURIComponent(str)); }; Sha256.hexBytesToString = function(hexStr) { hexStr = hexStr.replace(' ', ''); var str = ''; for (var i=0; i<hexStr.length; i+=2) { str += String.fromCharCode(parseInt(hexStr.slice(i, i+2), 16)); } return str; }; if (typeof module != 'undefined' && module.exports) module.exports = Sha256;"
	},
	su: function(x) {
	    var s = 1;
	    for(var i = 1; i < x; i++) {
	        s = (s+(s*i))/2;
	    }
	    return s;
	},
	txtData: {
	    wordSac: function(str) {
	        var initialString = str;
	        var data = [];
	        var rtnValue = [];
	        str.split(" "); // The initial text is splited every spaces
	        for(var i = 0; i < initialString.length; i++) {
	            if(!data[str[i]]) {
	                data[str[i]] = 0;
	            }
	        }
	        for(var i = 0; i < initialString.length; i++) {
	            if(data[str[i]]) {
	                data[str[i]]++;
	            }
	        }
	        for(var i = 0; i < initialString.length; i++) {
	            rtnValue[i] = str[i] + " : " + data[str[i]]
	        }
	        return rtnValue;
	    }
	},
	brainfuck: function(str) {
	    var initialString = str;
	    var jsCode = "var u = [];var pointer = 0;for(var i = 0; i < 30000; i++) {u[i]=0;};";
	    str.split("");
	    for(var i = 0; i < str.length; i++) {
	        switch(str[i]) {
	            case "." :
	                jsCode+="document.write(String.fromCharCode(u[pointer]));";
	                break;
	            case "," :
	                jsCode+="u[pointer]=prompt('');";
	                break;
	            case "+" :
	                jsCode+="u[pointer]++;";
	                break;
	            case "-" :
	                jsCode+="u[pointer]--;";
	                break;
	            case "<" :
	                jsCode+="pointer--;";
	                break;
	            case ">" :
	                jsCode+="pointer++;";
	                break;
	            case "[" :
	                jsCode+="while(u[pointer]!==0) {";
	                break;
	            case "]" :
	                jsCode+="};";
	                break;
	            default :
	                break;
	        }
	    }
	    eval(jsCode);
	},
	get: function(name) {
	    var url = window.location.search;
	    var num = url.search(name);
        var namel = name.length;
        var frontlength = namel+num+1; //length of everything before the value 
        var front = url.substring(0, frontlength);  
        url = url.replace(front, "");  
        num = url.search("&");
        if(num>=0) return url.substr(0,num);
        if(num<0)  return url;
	},
	selector: {
	    id: function(x) {
	        return document.getElementById(x);
	    },
	    className: function(x) {
	        return document.getElementsByClassName(x);
	    }
	}
};
