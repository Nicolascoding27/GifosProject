//suggestion generator function and slider button functionality -----------------------

let suggestions

async function get_suggestions (data){
    suggestions = await init_search_suggestions(data)
}

// End --------------------------------------------------------------------------------

// Trending events and functions ------------------------------------------------------
const trending_description = trending_element.querySelector('#trending__description')
const button_carousel_previous = trending_element.querySelector('#previous')
const button_carousel_next = trending_element.querySelector('#next')
let translateX = 0
let imageIndex = 1
let width_viewport
let button_step

function change_title(option) {
    /* 
    change subtitle of trending section
    */
    if(option === 1){
        trending_description.innerHTML = `Mira los últimos <br> GIFOS de nuestra comunidad.`
    } else if (option === 2){
        trending_description.innerHTML = `Mira los últimos GIFOS de nuestra comunidad.`
    }
}

button_carousel_previous.addEventListener('click', () => {
    if (imageIndex !== 1){
        imageIndex--
        translateX += button_step
    }
    carousel_container.style.transform = `translateX(${translateX}px)`
})

button_carousel_next.addEventListener('click', () => {
    if (imageIndex !== gifs_trending-1){
        imageIndex++
        translateX -= button_step
    }
    carousel_container.style.transform = `translateX(${translateX}px)`
})

// End -------------------------------------------------------------------------------

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
        change_title(1)
        assign_events_links(menuLinks)
    }
    else if (width_screen > 960 & width_screen < 1264){
        button_step = 305
        change_title(2)
        delete_events_links(menuLinks)
    }
    else if (width_screen >= 1264) {
        button_step = 382 //357 + 25
        change_title(2)
        delete_events_links(menuLinks)
    }
}

window.addEventListener("resize", () => {
    width_viewport = window.innerWidth
    media_queries_changes(width_viewport)
})

// End --------------------------------------------------------------------------------