//inputBox --> input_search
const search_main_container = document.querySelector('.main__container')
const search_container_list = search_main_container.querySelector('#result_list')

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
    let principal_container = father_element.classList
    //data, pagination /meta
    console.log(gif_elements.data)
    console.log(`Father element ${principal_container[0]}`, gif_elements.meta)
    //create a HTML render element
    for (let index_gif = 0; index_gif < gif_elements.data.length; index_gif++) {
        //create the gif element
        gif_html_element += `
        <div class="bg-modal">
            <span class="bg-modal__modal-close" hidden><i class="fas fa-times"></i></span>
            <div class="carousel-item">
                <img class="carousel-item__img" src="${gif_elements.data[index_gif].images.downsized.url}" alt="${gif_elements.data[index_gif].title}">
                <div class="carousel-item__details item-detail">

                    <div class="carousel-item__buttons item-buttons">
                        <div id="favorite" aria-labelledby="favorite_icon"></div>
                        <div id="download" aria-labelledby="download"></div>
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
            //const favorite_button = carousel_item.querySelector('#favorite')
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

            /* //save state of favorite button
            favorite_button.onclick = () => {
                //save in localstorage

            } */
        }
    )
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

async function init_search(search_option) {
    /**
     * This function generates a request to api in search endpoint
     * and show 12 search results per page
     */
    try {
        const limit_search = 10
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=${limit_search}&q=${search_option}`
        const res = await fetch(url)
        let gif_trending_res = await res.json()
        create_html_gif_element(gif_trending_res,search_container_list)
        assign_events_items(search_container_list)

    } catch (err) {
        console.error(err)
    }
}

document.addEventListener('DOMContentLoaded', init_trending)
init_search('father')