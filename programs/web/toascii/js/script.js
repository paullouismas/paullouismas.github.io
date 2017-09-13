function cta() {
  var text1 = document.getElementById("text1").value;
  var text2 = text1.split("");
  var text3 = [];
  for (var i = 0; i < text2.length; i++) {
    text3[i] = text2[i].charCodeAt(0);
  }
  var text4 = text3.join(" ");
  document.getElementById("text4").innerHTML = text4;
}
function atc() {
  var text4 = document.getElementById("text4").value
  var text3 = text4.split(" ");
  var text2 = []
  for (var i = 0; i < text3.length; i++ ) {
    text2[i] = String.fromCharCode(text3[i]);
  }
  var text1 = text2.join("");
  document.getElementById("text1").innerHTML = text1;
}
function convert() {
  var change = document.getElementById("change").checked;
	console.log(change);
  if (change) {
    cta();
  } else {
    atc();
  }
}
