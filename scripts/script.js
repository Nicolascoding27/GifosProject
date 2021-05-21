let menu=document.querySelector('.header__menu')
let button=document.querySelector('.header__menu--button')
let xIcon=document.querySelector('.xIcon')
let menuIcon=document.querySelector('.menuIcon')

//getting elements in the search section
let searchContainer = document.querySelector('.main__container--searchbox')
let inputBox = document.querySelector('.main__container--serachbox--input')
let suggestionBox = document.querySelector('.main__container--autocom-box')

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

button.addEventListener("click", toggleMenu)
var menuLinks = document.querySelectorAll(".menuLink")

menuLinks.forEach(
  function (menuLink) {
    menuLink.addEventListener("click", toggleMenu)
  }
)

//if user press any key and release
inputBox.onkeyup = (event) => {
  let userData = event.target.value
  let emptyArray = []
  if (userData) {
    emptyArray = suggestions.filter((data)=> {
      //filtering array value and user char to lowercase and return only those words which include user entry
      return data.toLowerCase().includes(userData.toLowerCase())
    })
    emptyArray = emptyArray.map((data) => {
      return `<li>${data}</li>`
    })
    console.log(emptyArray)
    searchContainer.classList.add("active")
    showSuggestions(emptyArray)
    let allList = suggestionBox.querySelectorAll("li")
    for (let i = 0; i < allList.length; i++) {
      //adding click attribute in all li tag
      allList[i].setAttribute("onclick", "select(this)")
    }

  } else {
    searchContainer.classList.remove("active")
  } 
}

function select(element){
  let selectUserData = element.textContent
  inputBox.value = selectUserData //passing the user selected list item data in textfield
}

function showSuggestions(list) {
  let listData
  if (!list.lenght) {
    userValue = inputBox.value
    listData = `<li>${userValue}</li>`
  }else {
    listData = list.join('')
  }
  suggestionBox.innerHTML = listData
}