let menu=document.querySelector('.header__menu')
let button=document.querySelector('.header__menu--button')
let xIcon=document.querySelector('.xIcon')
let menuIcon=document.querySelector('.menuIcon')
button.addEventListener("click", toggleMenu)

function toggleMenu() {
  if (menu.classList.contains("header__menu--active")) {
    menu.classList.remove("header__menu--active");
    menu.classList.add('header__menu')
    xIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("header__menu--active");
    menu.classList.remove("header__menu");
    xIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}

var menuLinks = document.querySelectorAll(".menuLink")

menuLinks.forEach(
  function (menuLink) {
    menuLink.addEventListener("click", toggleMenu)
  }
)