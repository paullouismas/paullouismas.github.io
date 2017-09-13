function convert() {
  var text1 = document.getElementById("text1").value;
  var text2 = text1.split("");
  var text3 = [];
  for (var i = 0; i < text2.length; i++) {
    text3[i] = text2[i].charCodeAt(0);
  }
  var text4 = text3.join(" ");
  document.getElementById("text4").innerHTML = text4;
}
