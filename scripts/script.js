let menu=document.querySelector('.header__menu')
let button=document.querySelector('.header__menu--button')
let xIcon=document.querySelector('.xIcon')
let menuIcon=document.querySelector('.menuIcon')

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

//changes icons with hover event in carousel section-----------------------
const trending_element = document.querySelector('.trending')
const carousel = trending_element.querySelector('.carousel')
let bg_modal_items

//-------------------------------------------------------------------------

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
var menuLinks = document.querySelectorAll(".menuLink")

menuLinks.forEach(
  function (menuLink) {
    menuLink.addEventListener("click", toggleMenu)
  }
)

//search suggestions-----------------------------------------------
// if user press any key and release
inputBox.onkeyup = (e)=>{
  let userData = e.target.value //user entered data
  let emptyArray = []
  if(userData){
      icon.onclick = ()=>{
          webLink = "https://www.google.com/search?q=" + userData
          linkTag.setAttribute("href", webLink)
          console.log(webLink)
          linkTag.click()
      }
      emptyArray = suggestions.filter((data)=>{
          //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
          return data.toLocaleLowerCase().includes(userData.toLocaleLowerCase())
      });
      emptyArray = emptyArray.map((data)=>{
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
  }else{
      searchWrapper.classList.remove("active") //hide autocomplete box
      icon_search.classList.add("fa-search")
      icon_search.classList.remove("fa-times")
      icon_search_active.hidden = true
  }
}

function select(element){
  /* 
  hides the search options when a search option is chosen
  */
  let selectData = element.textContent
  inputBox.value = selectData
  icon.onclick = ()=>{
      webLink = "https://www.google.com/search?q=" + selectData
      linkTag.setAttribute("href", webLink)
      linkTag.click()
  }
  searchWrapper.classList.remove("active")
}

function showSuggestions(list){
  /* 
  add the search options HTML elements in the search box element to DOM
  */
  let listData
  if(!list.length){
      userValue = inputBox.value
      listData = `<div>${icon_list_options} <li>${userValue}</li> </div>`
  }else{
      listData = list.join('')
  }
  suggBox.innerHTML = listData
}