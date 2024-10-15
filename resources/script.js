function lightMode(){
    var newTheme = document.querySelector("html").getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.querySelector("html").setAttribute("data-theme", newTheme);
}

function changePrimary(event){
    let newColor = window.getComputedStyle(event.currentTarget).getPropertyValue("background-color");
    document.querySelector(':root').style.setProperty('--primary-color', newColor);
}

window.onload = function(){
    const colorPickers = document.getElementsByClassName("color-swatch");
    document.getElementById("theme-toggle").addEventListener("click", lightMode);
    for(let i = 0; i < colorPickers.length; i++){
        colorPickers[i].addEventListener("click", changePrimary);
    }
}
