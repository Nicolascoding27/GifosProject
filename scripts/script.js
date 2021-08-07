/**Regular variables */

// header elements -------------------------------------------
let menu = document.querySelector('.header__menu')
let button = document.querySelector('.header__menu--button')
let xIcon = document.querySelector('.xIcon')
let menuIcon = document.querySelector('.menuIcon')
// -----------------------------------------------------------

let nightModeButton = document.getElementById('darkModeButton');
let title = document.getElementById('title_gifos');
let line = document.getElementById('line')
let header = document.getElementById('header');
let hamburguerMenu = document.getElementById('list');
let mainGifos = document.getElementById('main--gifos');
let toogleHeaderButton = document.getElementById('header--toggleButton');
let logo = document.getElementById('logo');
let trending=document.getElementById('trending');
let trendingTitle=document.getElementById('trending--title');
let footer = document.getElementById('footer');
// var x= Window.matchMedia("max-width:700px");

//--------------------------------------------------------------------------
/**Function that aims to show the hamburger menu */
function toggleMenu() {
  /* 
  this function toggle the menu options in mobile view
  */
  if (menu.classList.contains("header__menu--active")) {
    menu.classList.remove("header__menu--active")
    menu.classList.add('header__menu')
    xIcon.style.display = "none"
    menuIcon.style.display = "block"
  } else {
    menu.classList.add("header__menu--active")
    menu.classList.remove("header__menu")
    xIcon.style.display = "block"
    menuIcon.style.display = "none"
  }
}


button.addEventListener("click", toggleMenu)


/**Function that activates the dark mode */
nightModeButton.addEventListener("click", activateDarkMode)
function activateDarkMode() {
  // console.log(document.body.style.backgroundColor)
  if (document.body.style.backgroundColor === '') {
    title.style.color = 'white';
    header.backgroundColor = "rgb(55, 56, 60)"
    nightModeButton.innerHTML = "Modo diurno"
    document.body.style.backgroundColor = "rgb(55, 56, 60)";
    line.style.background = "rgb(55, 56, 60)";
    hamburguerMenu.style.backgroundColor = "rgb(0, 0, 0)";
    toogleHeaderButton.style.backgroundColor = "rgb(55, 56, 60)";
    toogleHeaderButton.style.color = "white";
    mainGifos.style.color = "white";
    trending.style.backgroundColor="rgb(34, 35, 38)";
    trending.style.color="white";
    trendingTitle.style.color="white";
    logo.src="./assets/logo-mobile-modo-noct.svg"
    footer.style.color="white";
  console.log(trending)
    footer.classList.add('footer-active');
  }
  else if (document.body.style.backgroundColor == "rgb(55, 56, 60)") {
    title.style.color = "rgb(87, 46, 229)";
    document.body.style.backgroundColor = '';
    header.backgroundColor = '';
    nightModeButton.innerHTML = "Modo nocturno";
    hamburguerMenu.style.backgroundColor = "";
    toogleHeaderButton.style.backgroundColor = "";
    line.style.background = "rgb(87, 46, 229)";
    toogleHeaderButton.style.color = "rgb(87, 46, 229)";
    logo.src="./assets/logo-mobile.svg";
    trending.style.backgroundColor="";
    trending.style.color="black";
    trendingTitle.style.color="rgb(87, 46, 229)";
    footer.style.color="black";
    footer.classList.remove('footer-active');
    
  }
}

// Initialize trending and resize events
window.addEventListener("resize", () => {
  width_viewport = window.innerWidth
  media_queries_changes(width_viewport)
  try {
      media_queries_changes_trending(width_viewport)
  } catch {
      console.log("Elementos de trending no definidos en esta sección")
  }
  
})

document.addEventListener('DOMContentLoaded', () => {
  media_queries_changes(window.innerWidth)
  try {
      init_trending()
      media_queries_changes_trending(window.innerWidth)
  } catch {
      console.log("Elementos de trending no definidos en esta sección")
  }
})