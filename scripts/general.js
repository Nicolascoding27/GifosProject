/* 
This file contains general content of the project as variables, functions of
components like header and footer
*/

//initialize localstorage
if (!localStorage.getItem("favorites")){
    localStorage.setItem("favorites",JSON.stringify([]))
}
if (!localStorage.getItem("my_gifs")){
    localStorage.setItem("my_gifs",JSON.stringify([]))
}

// API KEY
const APIKEY= "DCAxXJyKXP7rMfWdncYE04ImQn07Cvfg"

// Header events ---------------------------------------------------------------------
var menuLinks = document.querySelectorAll(".menuLink")

function assign_events_links(list_links_elements){
    list_links_elements.forEach((element) => element.onclick = () => {toggleMenu()} )
}
function delete_events_links(list_links_elements) {
    list_links_elements.forEach((element) => element.onclick = undefined)
}
// End --------------------------------------------------------------------------------

// Screen size events -----------------------------------------------------------------
function media_queries_changes(width_screen){
    /* 
    in function of screen size change the title and step of buttons in the carousel section
    */
    if (width_screen < 960) {
        assign_events_links(menuLinks)
    }
    else if (width_screen > 960 & width_screen < 1264){
        delete_events_links(menuLinks)
    }
    else if (width_screen >= 1264) {
        delete_events_links(menuLinks)
    }
}