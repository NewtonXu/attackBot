var surgeJSON = JSON.parse(localStorage.getItem("surgeTable"));

document.getElementById("checkwildmagic").addEventListener("keyup", (e) => {
	if (e.key=="Enter" || e.keyCode === 13) {
	var d100 = parseInt(document.getElementById("checkwildmagic").value);
	if(d100 >= 1 && d100 <= 100) {
		if(d100%2==0){
			d100 -= 1;
		}
		document.getElementById("surgeResult").innerHTML = surgeJSON[d100.toString()];			
	}
	}
});

