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
            //
            gif_html_element += `
            <div class="bg-modal">
            <span class="bg-modal__modal-close"><i class="fas fa-times"></i></span>
                <div class="carousel-item">
                    <img class="carousel-item__img" src="${content.data[index_gif].images.downsized.url}" alt="${content.data[index_gif].title}">
                    <div class="carousel-item__details">

                        <div class="carousel-item__buttons">
                            <img id="favorite" src="/assets/icon-fav.svg" alt="favorite_icon">
                            <img id="download" src="/assets/icon-download.svg" alt="favorite_icon">
                            <img id="max" src="/assets/icon-max-normal.svg" alt="favorite_icon">
                        </div>

                        <div class="carousel-item__info">
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
        console.log(bg_modal_items)

        bg_modal_items.forEach(
            function (modal_item) {
                const carousel_item = modal_item.querySelector('.carousel-item')
                const modal_close = modal_item.getElementsByClassName('bg-modal__modal-close')
                modal_close.hidden= true
                console.log(modal_close)
                modal_item.addEventListener("click", ()=> {
                    modal_item.classList.remove("bg-modal")
                    modal_item.classList.add("bg-modal-active")
                    modal_close.hidden=false
                })
                
                if(modal_close){

                    modal_close.addEventListener("click", ()=> {
                        modal_item.classList.remove("bg-modal-active")
                        modal_item.classList.add("bg-modal")
                        modal_close.hidden=true
                    })
                }
                /* window.onclick = function(event) {
                    if (event.target == modal_item) {
                    modal_item.classList.remove("bg-modal-active")
                    modal_item.classList.add("bg-modal")
                    }
                } */

            }
          )
    })
    .catch(err => {
        console.error(err)
    })
}

document.addEventListener('DOMContentLoaded', init_trending)