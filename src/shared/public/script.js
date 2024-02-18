const copyright = new Date().getFullYear();
document.querySelector(".copyright").innerHTML += `SCEA Copyright ${copyright} ©`;

const menu = document.querySelector("header > nav");
document.querySelector("#hamburguer").addEventListener("click",()=>{
    menu.classList.toggle("a7k29loooppps");
});

function options() {
    alert("Working.");
};