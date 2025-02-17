const images = [];
let currentImageIndex = 0;

function lightMode(){
    var newTheme = document.querySelector("html").getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.querySelector("html").setAttribute("data-theme", newTheme);
}

function changePrimary(event){
    let newColor = window.getComputedStyle(event.currentTarget).getPropertyValue("background-color");
    document.querySelector(':root').style.setProperty('--primary-color', newColor);
}

function expandImage(event){
    const lightbox = document.getElementById('lightbox');
    const expandedImg = document.getElementById('expandedImg');

    const img = event.currentTarget.querySelector('img');

    expandedImg.src = img.src;
    lightbox.style.display = 'flex';

    document.body.style.overflow = 'hidden';

    currentImageIndex = Array.from(event.currentTarget.parentNode.children).indexOf(event.currentTarget);
    loadImages();

    history.pushState({lightboxOpen: true}, '');
    console.log('Expand Image');
    console.log(history.state);
}



function closeLightbox(){
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';

    document.body.style.overflow = '';

    history.pushState(null, '');

        console.log('Close Image');
        console.log(history.state);
}

window.addEventListener('popstate', function(event){
    console.log('Event');
    console.log(event.state);
    if(event.state && event.state.lightboxOpen){
        closeLightbox();
    }
});

function loadImages(){
    const gridItems = document.querySelectorAll('.gallery-item img');
    images.length = 0;
    gridItems.forEach(element => {
        images.push(element.src);
    });
}

function nextImage(event){
    event.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateImage();
}

function prevImage(event){
    event.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateImage();
}

function updateImage(){
    const expandedImg = document.getElementById('expandedImg');
    expandedImg.src = images[currentImageIndex];
}

window.addEventListener('beforeunload', function(){
    sessionStorage.setItem('scrollPosition',window.scrollY);
});

window.onload = function(){
    const colorPickers = document.getElementsByClassName("color-swatch");
    document.getElementById("theme-toggle").addEventListener("click", lightMode);
    for(let i = 0; i < colorPickers.length; i++){
        colorPickers[i].addEventListener("click", changePrimary);
    }

    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if(scrollPosition){
        window.scrollTo(0, parseInt(scrollPosition, 10));
        sessionStorage.removeItem('scrollPosition');
    }
}

// document.querySelectorAll('.gallery-item img').forEach(img => {
//     img.addEventListener('contextmenu', function(event) {
//         event.preventDefault();
//     });
// });
