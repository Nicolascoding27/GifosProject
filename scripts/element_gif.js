
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
                        <div id="delete" class="delete" aria-labelledby="delete_icon"></div>
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

function assign_events_items(father_element,active_favorite=false,delete_btn=false) {
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
            const delete_button = carousel_item.querySelector('#delete')

            if (delete_btn){
                delete_button.classList.add('block')
                favorite_button.hidden = true
            }

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
                if(father_element.classList[0]==='carousel__container'){
                    father_element.classList.add('carousel__container_inline')
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
                    if(father_element.classList[0]==='carousel__container'){
                        father_element.classList.remove('carousel__container_inline')
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

            delete_button.onclick = (event) => {
                let my_gifs = JSON.parse(localStorage.getItem("my_gifs"))
                my_gifs = my_gifs.filter(value => value !== gif_id)
                localStorage.setItem("my_gifs",JSON.stringify(my_gifs))
                event.stopPropagation()
            }

            if (active_favorite && favorite_button.classList.contains("favorite")) {toggle_favorite(favorite_button)}

        }
    )
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

function toggle_favorite(element){
    if(element.classList.contains("favorite")){
        element.classList.remove("favorite")
        element.classList.add("favorite_active")
    }else {
        element.classList.add("favorite")
        element.classList.remove("favorite_active")
    }
}

function toggle_show_empty_messague(element, class_name){
    if(element.classList.contains(class_name)){
        element.classList.remove(class_name)
    }else {
        element.classList.add(class_name)
    }
}

function button_query_action(){
    /* 
    This function generates requests to giphy endpoint
    */
    search_offset += 12
    if (total_searches - search_offset <= 12){
        button_more_results.classList.remove('visible')
        button_more_results.onclick = undefined
    }
    init_search(actual_search_option,search_offset,false)
}

function button_query_saved_elements_action(){
    /* 
    This function generates request to giphy id endpoint
    */
    update_my_gifs_array()
    initial_position += 12
    final_position += 12
    if (total_searches - final_position <= 0){
        button_more_results.classList.remove('visible')
        button_more_results.onclick = undefined
    }
    if (show_favorite){init_local_storage_gif_loop(favorites,init=false)}
    else {
        init_local_storage_gif_loop(my_gifs,init=false)
    }
    
}