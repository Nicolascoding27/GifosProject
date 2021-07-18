//getting elements in the search section-----------------------------------
const searchWrapper = document.querySelector(".main__container--searchbox")
const title_search = document.querySelector(".main__container_results_title")
const inputBox = searchWrapper.querySelector("input")
const suggBox = searchWrapper.querySelector(".main__container--autocom-box")
const icon = searchWrapper.querySelector(".main__container--serachbox--icon")
const icon_search = icon.querySelector("i")
const icon_search_active = searchWrapper.querySelector(".main__container--searchbox--icon-active")
const icon_list_options = '<i class="fas fa-search"></i>'
//--------------------------------------------------------------------------

//search suggestions-----------------------------------------------
// if user press any key and release

function clean_search_bar(clean_title){
    inputBox.value = ''
    searchWrapper.classList.remove("active") //hide autocomplete box
    icon_search.classList.add("fa-search")
    icon_search.classList.remove("fa-times")
    icon_search_active.hidden = true
    title_search.textContent = clean_title ? '' : title_search.textContent
  }
  /**
   * Asigna eventos de onclick a las lupas 
   * @param {*} html_father_sugg 
   */
  function assign_events_search_options(html_father_sugg){
    let allList = html_father_sugg.querySelectorAll("li")
    let icons_search_sugg = html_father_sugg.querySelectorAll(".fa-search")
    
    for (let i = 0; i < allList.length; i++) {
      //adding onclick attribute in all li tag and searchs icons
      allList[i].setAttribute("onclick", "select(this)")
      icons_search_sugg[i].onclick = () => {
        //search with icon in options list
        clean_search_list()
        init_search(allList[i].textContent)
        clean_search_bar(false)
      }
    }
  }
  
  inputBox.onkeyup = (e)=>{
    let userData = e.target.value //user entered data
    get_suggestions(userData)
    let emptyArray = [...suggestions]
    //add title effects
    document.querySelector('.main__container').querySelector('hr').hidden=false
  
    if (!userData && !search_container_list.innerHTML){
      document.querySelector('.main__container').querySelector('hr').hidden=true
    }
  
    if(userData){
  
      icon.onclick = ()=>{
        clean_search_bar(true)
      }
  
      icon_search_active.onclick = ()=>{
        //search with the icon in search bar
        clean_search_list()
        init_search(userData)
        clean_search_bar(false)
      }
  
      title_search.textContent = userData
  
      /* emptyArray = suggestions.filter((data)=>{
        //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
        return data.toLocaleLowerCase().includes(userData.toLocaleLowerCase())
      }); */

      emptyArray = emptyArray.map((data)=>{
        // passing return data inside li tag
        return `<div>${icon_list_options}<li>${data}</li> </div>`
      });
      searchWrapper.classList.add("active") //show autocomplete box
      icon_search.classList.remove("fa-search")
      icon_search.classList.add("fa-times")
      icon_search_active.hidden = false
  
      showSuggestions(emptyArray)
      assign_events_search_options(suggBox)
  
      if(e.key === 'Enter'){
        //search with Enter event
        clean_search_list()
        init_search(userData)
        searchWrapper.classList.remove("active")
        clean_search_bar(false)
      }
  
    }else{
      clean_search_bar(true)
      icon.onclick = undefined
      icon_search_active.onclick = undefined
    }
  }
  
  function select(element){
    /* 
    hides the search options when a search option is chosen
    */
    let selectData = element.textContent
    inputBox.value = selectData
    title_search.textContent = selectData
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