var regex = /.+"basicdiceroll">(\d+)<\/span>\)/g;
var test_if_attack = /\d+ vs .+/g;
if(localStorage.getItem("attackBotSurgeLevel")===null){
	localStorage.setItem("attackBotSurgeLevel") = 1;
}
var buttonDiv = document.createElement('button');
buttonDiv.id = "injectAttack";
buttonDiv.innerHTML = "Inject attack";
buttonDiv.style.width = "100px";
buttonDiv.style.height= "20px";
buttonDiv.style.backgroundColor = "red";
buttonDiv.style.position="fixed";
buttonDiv.style.top = "0";
buttonDiv.style.left = "0";
buttonDiv.style.zIndex = "999999";
document.body.appendChild(buttonDiv);

var inputDiv = document.createElement('input');
inputDiv.id = "surgeLevel";
inputDiv.value = parseInt(localStorage.getItem("attackBotSurgeLevel"));
inputDiv.style.width = "100px";
inputDiv.style.height = "20px";
inputDiv.style.position="fixed";
inputDiv.style.left = "200px";
inputDiv.style.top = "0";
inputDiv.style.zIndex = "999998";
document.body.appendChild(inputDiv);

document.getElementById("injectAttack").addEventListener("click", (event) => {
	var textarea = $(document.getElementById("textchat")).children()[1].getElementsByClassName("you");
	for(var i = 0; i<textarea.length; ++i) {
		if(textarea[i].classList.contains("skip_attackbot_inject")){
			continue;
		} else {
			textarea[i].classList.add("skip_attackbot_inject");
		}
	        var textmsg = textarea[i].textContent;
		if(test_if_attack.test(textmsg)){
			var finalRoll = parseInt(textarea[i]); 
			var d20 = parseInt(regex.exec(textarea[i].getElementsByClassName("inlinerollresult")[0].getAttribute("title"))[1]);
			regex.lastIndex = 0;
			var addElement = processRoll(finalRoll, d20);
			textarea[i].parentNode.insertBefore(addElement, textarea[i].nextSibling);
		}
		test_if_attack.lastIndex = 0;
	}
});

document.getElementById("surgeLevel").addEventListener("change", (event) => {
	var curSurge = document.getElementById("surgeLevel").value;
	if(!isNumeric(curSurge)){
		surgeLevel = 1;
	} else {
		surgeLevel = parseInt(curSurge);
	}

	localStorage.setItem("attackBotSurgeLevel", surgeLevel);
	document.getElementById("surgeLevel").value = surgeLevel;
});

function isNumeric(value) {
	return /^\d+$/.test(value);
}

function processRoll(finalRoll, d20){
	var newElement = document.createElement("div");
	var insideHTML = "<table>"

	if(finalRoll%2==0){
		insideHTML += "<tr><td>Gain +1 AC</td></tr>"
	} else {
		insideHTML += "<tr><td>Roll a saving throw</td></tr>"
	}
	if(d20 == 20){
		insideHTML += "<tr><td>Slide target 1 square, knock it prone after effect, remove resistance saving effect</td></tr>"
	} else if(d20 == 1){
		insideHTML += "<tr><td>Push everything within 5 squares 1 square</td></tr>"
	}
	
	insideHTML += "</table>"
	newElement.innerHTML = insideHTML;
	return newElement;
}


