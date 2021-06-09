/**Regular variables */
let menu = document.querySelector('.header__menu')
let button = document.querySelector('.header__menu--button')
let xIcon = document.querySelector('.xIcon')
let menuIcon = document.querySelector('.menuIcon')
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
//getting elements in the search section-----------------------------------
const searchWrapper = document.querySelector(".main__container--searchbox")
const inputBox = searchWrapper.querySelector("input")
const suggBox = searchWrapper.querySelector(".main__container--autocom-box")
const icon = searchWrapper.querySelector(".main__container--serachbox--icon")
const icon_search = icon.querySelector("i")
const icon_search_active = searchWrapper.querySelector(".main__container--searchbox--icon-active")

let linkTag = searchWrapper.querySelector("a");
let webLink;
const icon_list_options = '<i class="fas fa-search"></i>'
//--------------------------------------------------------------------------
/**Function that aims to show the hamburger menu */
function toggleMenu() {
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
var menuLinks = document.querySelectorAll(".menuLink")

menuLinks.forEach(
  function (menuLink) {
    menuLink.addEventListener("click", toggleMenu)
  }
)

//search suggestions-----------------------------------------------
// if user press any key and release
inputBox.onkeyup = (e) => {
  let userData = e.target.value //user enetered data
  let emptyArray = []
  if (userData) {
    icon.onclick = () => {
      webLink = "https://www.google.com/search?q=" + userData
      linkTag.setAttribute("href", webLink)
      console.log(webLink)
      linkTag.click()
    }
    emptyArray = suggestions.filter((data) => {
      //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
      return data.toLocaleLowerCase().includes(userData.toLocaleLowerCase())
    });
    emptyArray = emptyArray.map((data) => {
      // passing return data inside li tag
      return `<div>${icon_list_options}<li>${data}</li> </div>`
    });
    searchWrapper.classList.add("active") //show autocomplete box
    icon_search.classList.remove("fa-search")
    icon_search.classList.add("fa-times")
    icon_search_active.hidden = false

    showSuggestions(emptyArray)
    let allList = suggBox.querySelectorAll("li")
    for (let i = 0; i < allList.length; i++) {
      //adding onclick attribute in all li tag
      allList[i].setAttribute("onclick", "select(this)")
    }
  } else {
    searchWrapper.classList.remove("active") //hide autocomplete box
    icon_search.classList.add("fa-search")
    icon_search.classList.remove("fa-times")
    icon_search_active.hidden = true
  }
}

function select(element) {
  let selectData = element.textContent
  inputBox.value = selectData
  icon.onclick = () => {
    webLink = "https://www.google.com/search?q=" + selectData
    linkTag.setAttribute("href", webLink)
    linkTag.click()
  }
  searchWrapper.classList.remove("active")
}
/**Functions that show the suggestions according to the input of the user */
function showSuggestions(list) {
  let listData
  if (!list.length) {
    userValue = inputBox.value
    listData = `<div>${icon_list_options} <li>${userValue}</li> </div>`
  } else {
    listData = list.join('')
  }
  suggBox.innerHTML = listData
}
/**Function that activates the dark mode */
nightModeButton.addEventListener("click", activateDarkMode)
function activateDarkMode() {
  // console.log(document.body.style.backgroundColor)
  console.log(trending)
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
    
  }
  
}