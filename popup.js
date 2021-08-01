var surgeJSON = JSON.parse(localStorage.getItem("surgeTable"));

document.getElementById("submitwildmagic").addEventListener("click", (event) => {
	var d100 = parseInt(document.getElementById("checkwildmagic").value);
	if(d100 >= 1 && d100 <= 100) {
		if(d100%2==0){
			d100 -= 1;
		}
		document.getElementById("surgeResult").innerHTML = surgeJSON[d100.toString()];			
	}
});

