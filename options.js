document.getElementById("test").value = localStorage.getItem("surgeTable");

document.getElementById("test").addEventListener("change", (event) => {
    document.getElementById("test").style.setProperty("outline", "1px solid black")
});

document.getElementById("submit").addEventListener("click", (event) => {
    localStorage.setItem("surgeTable", document.getElementById("test").value);
    document.getElementById("test").style.setProperty("outline", "5px solid green")
});
