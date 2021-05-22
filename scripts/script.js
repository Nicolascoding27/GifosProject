let menu=document.querySelector('.header__menu')
let button=document.querySelector('.header__menu--button')
let xIcon=document.querySelector('.xIcon')
let menuIcon=document.querySelector('.menuIcon')

//getting elements in the search section
const searchWrapper = document.querySelector(".main__container--searchbox");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".main__container--autocom-box");
const icon = searchWrapper.querySelector(".main__container--serachbox--icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;

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

//search suggestions-----------------------------------------------
// if user press any key and release
inputBox.onkeyup = (e)=>{
  let userData = e.target.value; //user enetered data
  let emptyArray = [];
  if(userData){
      icon.onclick = ()=>{
          webLink = "https://www.google.com/search?q=" + userData;
          linkTag.setAttribute("href", webLink);
          console.log(webLink);
          linkTag.click();
      }
      emptyArray = suggestions.filter((data)=>{
          //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
          return data.toLocaleLowerCase().includes(userData.toLocaleLowerCase()); 
      });
      emptyArray = emptyArray.map((data)=>{
          // passing return data inside li tag
          return '<li>'+ data +'</li>';
      });
      searchWrapper.classList.add("active"); //show autocomplete box
      showSuggestions(emptyArray);
      let allList = suggBox.querySelectorAll("li");
      for (let i = 0; i < allList.length; i++) {
          //adding onclick attribute in all li tag
          allList[i].setAttribute("onclick", "select(this)");
      }
  }else{
      searchWrapper.classList.remove("active"); //hide autocomplete box
  }
}

function select(element){
  let selectData = element.textContent;
  inputBox.value = selectData;
  icon.onclick = ()=>{
      webLink = "https://www.google.com/search?q=" + selectData;
      linkTag.setAttribute("href", webLink);
      linkTag.click();
  }
  searchWrapper.classList.remove("active");
}

function showSuggestions(list){
  let listData;
  if(!list.length){
      userValue = inputBox.value;
      listData = '<li>'+ userValue +'</li>';
  }else{
      listData = list.join('');
  }
  suggBox.innerHTML = listData;
}