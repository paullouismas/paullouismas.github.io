const changeValue = () => {
	const celsius = (document.getElementById("celsius").value == "") ? 0 : document.getElementById("celsius").value;
	const farenheit = (document.getElementById("farenheit").value == "") ? 0 : document.getElementById("farenheit").value;
	if (document.getElementById("change").checked) document.getElementById("farenheit").value = (celsius*(9/5)+32);
	else document.getElementById("celsius").value = (farenheit-32)*(5/9);
}
