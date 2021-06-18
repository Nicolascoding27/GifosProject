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
                    <div class="carousel-item__details">

                        <div class="carousel-item__buttons">
                            <div id="favorite" aria-labelledby="favorite_icon"></div>
                            <div id="download" aria-labelledby="download"></div>
                            <div id="max" aria-labelledby="maximize"></div>
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
                const modal_close = modal_item.querySelector('.bg-modal__modal-close')
                //const favorite_button = carousel_item.querySelector('#favorite')
                modal_close.hidden= true
                console.log(modal_close)
                carousel_item.addEventListener("click", ()=> {
                    //set the modal style in a gif item
                    modal_item.classList.remove("bg-modal")
                    modal_item.classList.add("bg-modal-active")
                    modal_close.hidden=false
                })
                
                if(modal_close){
                    modal_close.onclick = (event) => {
                        //remove modal style in a gif item
                        event.preventDefault()
                        modal_item.classList.remove("bg-modal-active")
                        modal_item.classList.add("bg-modal")
                        modal_close.hidden=true
                    }
                    console.log("Create a close method")
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