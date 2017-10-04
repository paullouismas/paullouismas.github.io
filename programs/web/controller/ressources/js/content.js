function getData(){
var id = btoa(btoa(document.getElementById("user").value)+btoa(document.getElementById("pass").value));
if(id=="YldGemNEY3pNREV3TURBNGVISmxkSEJvTkhvPQ=="){
console.log("Login success with id : "+id);
}else{
alert("LOGIN REFUSED");
window.close();
}
}
function ascii(a) {
return a.charCodeAt();
}
document.onkeypress = function(evt) {
evt = evt || window.event;
var charCode = evt.keyCode || evt.which;
if(charCode==13){
getData();
}else if(charCode==27){
window.close();
}
}
