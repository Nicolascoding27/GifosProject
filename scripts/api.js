//inputBox --> input_search
let carousel_trending_container= document.querySelector('.carousel')
APIKEY= "DCAxXJyKXP7rMfWdncYE04ImQn07Cvfg"

function init_trending() {
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${APIKEY}&limit=25`
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
        `
        }
        //----------------------------
        carousel_trending_container.innerHTML += gif_html_element
    })
    .catch(err => {
        console.error(err)
    })
}

document.addEventListener('DOMContentLoaded', init_trending)