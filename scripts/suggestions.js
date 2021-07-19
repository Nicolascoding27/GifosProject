//suggestion generator function and slider button functionality

let suggestions

async function get_suggestions (data){
    suggestions = await init_search_suggestions(data)
}

//
const trending_description = trending_element.querySelector('#trending__description')
const button_carousel_previous = trending_element.querySelector('#previous')
const button_carousel_next = trending_element.querySelector('#next')
let translateX = 0
let imageIndex = 1
let width_viewport
let button_step

function change_title(option) {
    if(option === 1){
        trending_description.innerHTML = `Mira los últimos <br> GIFOS de nuestra comunidad.`
    } else if (option === 2){
        trending_description.innerHTML = `Mira los últimos GIFOS de nuestra comunidad.`
    }
}

function media_queries_changes(width_screen){
    if (width_screen < 960) {
        change_title(1)
    }
    else if (width_screen > 960 & width_screen < 1264){
        button_step = 305
        change_title(2)
    }
    else if (width_screen >= 1264) {
        button_step = 382 //357 + 25
        change_title(2)
    }
}

window.addEventListener("resize", () => {
    width_viewport = window.innerWidth
    media_queries_changes(width_viewport)
})

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
