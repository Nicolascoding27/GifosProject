//global variables
/* 
total_searches ---> indicates total amount of results in a query, 
                    in the search list section
search_offset  ---> indicates the actual offset position
actual_search_option ---> save the actual search query term
*/
let total_searches = 0
let search_offset = 0
let actual_search_option = ''

//initialize favorite localstorage
localStorage.setItem("favorites",JSON.stringify([]))

//inputBox --> input_search
const search_main_container = document.querySelector('.main__container')
const search_container_list = search_main_container.querySelector('#result_list')
const button_more_results = search_main_container.querySelector('#button_list') 

//trending father html elements-----------------------------
const trending_element = document.querySelector('.trending')
const carousel = trending_element.querySelector('.carousel')
let bg_modal_items
//----------------------------------------------------------

APIKEY= "DCAxXJyKXP7rMfWdncYE04ImQn07Cvfg"

//trending topic API section ----------------------------------------

function create_html_gif_element(gif_elements,father_element){
    //create html gif elements inside a html father element

    let gif_html_element = ''
    //data, pagination /meta
    console.log(gif_elements)
    console.log(gif_elements.data)
    //console.log(`Father element ${principal_container[0]}`, gif_elements.meta)

    //create a HTML render element
    //download="${gif_elements.data[index_gif].images.downsized.url}"
    for (let index_gif = 0; index_gif < gif_elements.data.length; index_gif++) {
        //create the gif element
        gif_html_element += `
        <div class="bg-modal">
            <span class="bg-modal__modal-close" hidden><i class="fas fa-times"></i></span>
            <div id="${gif_elements.data[index_gif].id}" class="carousel-item">
                <img class="carousel-item__img" src="${gif_elements.data[index_gif].images.original.url}" alt="${gif_elements.data[index_gif].title}">
                <div class="carousel-item__details item-detail">

                    <div class="carousel-item__buttons item-buttons">
                        <div id="favorite" class="favorite" aria-labelledby="favorite_icon"></div>
                        <div id="download" aria-labelledby="download"><a href="#" download></a></div>
                        <div id="max" aria-labelledby="maximize"></div>
                    </div>

                    <div class="carousel-item__info item-info">
                        <p>${gif_elements.data[index_gif].username}</p>
                        <h3>${gif_elements.data[index_gif].title}</h3>
                    </div>
                </div>
            </div>
        </div>
    `
    }
    //----------------------------
    father_element.innerHTML += gif_html_element
}

function toggle_favorite(element){
    if(element.classList.contains("favorite")){
        element.classList.remove("favorite")
        element.classList.add("favorite_active")
    }else {
        element.classList.add("favorite")
        element.classList.remove("favorite_active")
    }
}

async function download(id_element,element){
    /* 
    this function creates a request to gif by id endpoint
    creates a local object with URL.createObjectURL
    and generates a download with the event click
    */

    const url_query_gif = `https://media0.giphy.com/media/${id_element}/giphy.gif`
    const response = await fetch(url_query_gif)
    let file = await response.blob()
    file = URL.createObjectURL(file)
    element.setAttribute("href",file)
    element.onclick = (event) => {
        event.stopPropagation()
    }
    element.click() //se propaga el evento
    URL.revokeObjectURL(element.href)
}
//https://media0.giphy.com/media/${id}/giphy.gif
/* let response =  fetch(link)
let file = response.blob()
a.href = window.URL.createObjectURL(file);
a.click() */


function assign_events_items(father_element) {
    //initialization of events in trending topic section
    bg_modal_items = father_element.querySelectorAll(':scope > div')
    bg_modal_items.forEach(
        function (modal_item) {
            const carousel_item = modal_item.querySelector('.carousel-item')
            const modal_close = modal_item.querySelector('.bg-modal__modal-close')
            const carousel_item_image = carousel_item.querySelector('.carousel-item__img')
            const carousel_item_details = carousel_item.querySelector('.item-detail')
            const carousel_item_details_buttons = carousel_item_details.querySelector('.item-buttons')
            const carousel_item_details_info = carousel_item_details.querySelector('.item-info')
            const favorite_button = carousel_item.querySelector('#favorite')
            const download_button = carousel_item.querySelector('#download')

            const gif_id = carousel_item.getAttribute('id')

            modal_close.hidden= true
            carousel_item.addEventListener("click", ()=> {
                //set the modal style in a gif item
                modal_item.classList.remove('bg-modal')
                modal_item.classList.add('bg-modal-active')
                //change gif item description and buttons
                carousel_item.classList.add('carousel-item-active')
                carousel_item_image.classList.add('carousel-item__img-active')
                carousel_item_details.classList.remove('carousel-item__details')
                carousel_item_details.classList.add('carousel-item__details-active')
                carousel_item_details_buttons.querySelector('#max').hidden=true
                modal_close.hidden=false

                if(father_element.classList[0]==='main__container_results'){
                    carousel_item_details_info.classList.remove('carousel-item__info')
                    carousel_item_details_info.classList.add('carousel-item__info_active')
                    carousel_item_details_buttons.classList.remove('carousel-item__buttons')
                    carousel_item_details_buttons.classList.add('carousel-item__buttons_active')
                }
            })
            
            if(modal_close){
                modal_close.onclick = (event) => {
                    //remove modal style in a gif item
                    event.preventDefault()
                    modal_item.classList.remove('bg-modal-active')
                    modal_item.classList.add('bg-modal')
                    //remove modal gif item style
                    carousel_item.classList.remove('carousel-item-active')
                    carousel_item_image.classList.remove('carousel-item__img-active')
                    carousel_item_details.classList.remove('carousel-item__details-active')
                    carousel_item_details.classList.add('carousel-item__details')
                    carousel_item_details_buttons.querySelector('#max').hidden=false
                    modal_close.hidden=true

                    if(father_element.classList[0]==='main__container_results'){
                        carousel_item_details_info.classList.add('carousel-item__info')
                        carousel_item_details_info.classList.remove('carousel-item__info_active')
                        carousel_item_details_buttons.classList.add('carousel-item__buttons')
                        carousel_item_details_buttons.classList.remove('carousel-item__buttons_active')
                    }
                }
            }

            //save state of favorite button
            favorite_button.onclick = (event) => {
                //save in localstorage
                let favorites = JSON.parse(localStorage.getItem("favorites"))
                const in_favorites = (element) => element === gif_id
                if (favorites.length === 0){
                    favorites.push(gif_id)
                }else if (!favorites.some(in_favorites)){
                    favorites.push(gif_id)
                }else {
                    favorites = favorites.filter(element => element !== gif_id)
                }
                localStorage.setItem("favorites",JSON.stringify(favorites))
                toggle_favorite(favorite_button)
                event.stopPropagation()

            }

            download_button.onclick = (event) => {
                //download a gif element
                const link_download = download_button.querySelector('a')
                download(gif_id,link_download)
                event.stopPropagation()
            }

        }
    )
}

function button_query_action(){
    search_offset += 12
    if (total_searches - search_offset <= 12){
        button_more_results.classList.remove('visible')
        button_more_results.onclick = undefined
    }
    init_search(actual_search_option,search_offset,false)
}

function init_button_search_list(gif_query_res) {
    total_searches = gif_query_res.pagination.total_count
    console.log(`pagination object ${gif_query_res.pagination}`)
    search_offset = 0
    button_more_results.classList.add('visible')
    button_more_results.onclick = () => {
        //poner función de search query
        button_query_action()
    }
}

async function init_trending() {
    /**
     * This function generates a request to api in trending endpoint
     * and show 25 most populars gifs in carousel
     */
    
    try {
        const limit_search = 10
        let url = `https://api.giphy.com/v1/gifs/trending?api_key=${APIKEY}&limit=${limit_search}`
        const res = await fetch(url)
        let gif_trending_res = await res.json()
        create_html_gif_element(gif_trending_res,carousel)
        assign_events_items(carousel)

    } catch (err) {
        console.error(err)
    }

}

//search API section -----------------------------------------------

async function init_search(search_option,offset=0,new_query=true) {
    /**
     * This function generates a request to api in search endpoint
     * and show 12 search results per page
     */
    try {
        const limit_search = 12
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=${limit_search}&offset=${offset}&q=${search_option}`
        const res = await fetch(url)
        let gif_trending_res = await res.json() //puedo guardarlo--
        create_html_gif_element(gif_trending_res,search_container_list)
        assign_events_items(search_container_list)
        search_container_list.classList.add('margin_search_active')

        if(new_query){
            actual_search_option = search_option
            init_button_search_list(gif_trending_res)
        }

    } catch (err) {
        console.error(err)
    }
}

function clean_search_list(){
    search_container_list.innerHTML = ''
}

document.addEventListener('DOMContentLoaded', init_trending)