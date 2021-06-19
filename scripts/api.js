//inputBox --> input_search
let carousel_trending_container= document.querySelector('.carousel')
APIKEY= "DCAxXJyKXP7rMfWdncYE04ImQn07Cvfg"

function init_trending() {
    /**
     * This function generates de request to api in trending endpoint
     * and show 25 most populars gifs in carousel
     */
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${APIKEY}&limit=10`
    let gif_html_element = ''
    console.log(url)
    fetch(url)
    .then(response => response.json())
    .then(content => {
        //data, pagination /meta
        console.log(content.data)
        console.log('META', content.meta)
        //create a HTML render element
        for (let index_gif = 0; index_gif < content.data.length; index_gif++) {
            //create the gif element
            gif_html_element += `
            <div class="bg-modal">
                <span class="bg-modal__modal-close" hidden><i class="fas fa-times"></i></span>
                <div class="carousel-item">
                    <img class="carousel-item__img" src="${content.data[index_gif].images.downsized.url}" alt="${content.data[index_gif].title}">
                    <div class="carousel-item__details item-detail">

                        <div class="carousel-item__buttons item-buttons">
                            <div id="favorite" aria-labelledby="favorite_icon"></div>
                            <div id="download" aria-labelledby="download"></div>
                            <div id="max" aria-labelledby="maximize"></div>
                        </div>

                        <div class="carousel-item__info item-info">
                            <p>${content.data[index_gif].username}</p>
                            <h3>${content.data[index_gif].title}</h3>
                        </div>
                    </div>
                </div>
            </div>
        `
        }
        //----------------------------
        carousel_trending_container.innerHTML += gif_html_element

        bg_modal_items = carousel.querySelectorAll(':scope > div')

        bg_modal_items.forEach(
            function (modal_item) {
                const carousel_item = modal_item.querySelector('.carousel-item')
                const modal_close = modal_item.querySelector('.bg-modal__modal-close')
                const carousel_item_details = carousel_item.querySelector('.item-detail')
                const carousel_item_details_buttons = carousel_item_details.querySelector('.item-buttons')
                const carousel_item_details_info = carousel_item_details.querySelector('.item-info')
                //const favorite_button = carousel_item.querySelector('#favorite')
                modal_close.hidden= true
                console.log(modal_close)
                carousel_item.addEventListener("click", ()=> {
                    //set the modal style in a gif item
                    modal_item.classList.remove("bg-modal")
                    modal_item.classList.add("bg-modal-active")
                    //change gif item description a buttons

                    carousel_item_details.classList.remove('carousel-item__details')
                    carousel_item_details.classList.add('carousel-item__details-active')
                    modal_close.hidden=false
                })
                
                if(modal_close){
                    modal_close.onclick = (event) => {
                        //remove modal style in a gif item
                        event.preventDefault()
                        modal_item.classList.remove("bg-modal-active")
                        modal_item.classList.add("bg-modal")
                        //remove modal gif item style
                        carousel_item_details.classList.remove('carousel-item__details-active')
                        carousel_item_details.classList.add('carousel-item__details')
                        modal_close.hidden=true
                    }
                }

                /* //save state of favorite button
                favorite_button.onclick = () => {
                    //save in localstorage

                } */

            }
        )
        
    })
    .catch(err => {
        console.error(err)
    })
}

document.addEventListener('DOMContentLoaded', init_trending)