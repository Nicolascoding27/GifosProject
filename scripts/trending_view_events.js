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

function media_queries_changes_trending(width_screen){
    /* 
    in function of screen size change the title and step of buttons in the carousel section
    */
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

// End -------------------------------------------------------------------------------