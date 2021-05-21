let menu=document.querySelector('.header__menu')
let button=document.querySelector('.header__menu--button')
let xIcon=document.querySelector('.xIcon')
let menuIcon=document.querySelector('.menuIcon')
let searchBar = document.querySelector('.main__container--serachbox--input')
let searchContainer = document.querySelector('.main__container--searchbox')

button.addEventListener("click", toggleMenu)
//searchBar.addEventListener("input", showOptions)

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

//arreglar
function showOptions() {
  element_search = `
    <p> Opcion 1 <p>
    <p> Opcion 2 <p>
    <p> Opcion 3 <p>
  `
  searchContainer.insertAdjacentHTML('afterbegin',element_search)
}

var menuLinks = document.querySelectorAll(".menuLink")

menuLinks.forEach(
  function (menuLink) {
    menuLink.addEventListener("click", toggleMenu)
  }
)