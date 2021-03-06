//global variables
/* 
total_searches ---> indicates total amount of results in a query, 
                    in the search list section
search_offset  ---> indicates the actual offset position
actual_search_option ---> save the actual search query term

initial_position ---> indicates the actual position in the array of gifs id's
final_position ---> indicates the final position in the array of gifs id's
favorites ---> array with gifs id's mark as favorite 
my_gifs ---> array with gifs id's mark as my_gifs
gifs_trending ---> number of gifs in trending
show_favorite ---> allow to update the array in show_favorite == true update favorite array and show_favorite == false update my_gifs array
include_delete ---> bool variable, allow to show the delete button and hide the favorite button
*/
let total_searches = 0
let search_offset = 0
let actual_search_option = ''

let initial_position = 0
let final_position = 12
let favorites = []
let my_gifs = []
let gifs_trending = 25
let show_favorite = true
let include_delete = false

//inputBox --> input_search--------------------------------
const search_main_container = document.querySelector('.main__container')
const search_container_list = search_main_container.querySelector('#result_list')
const button_more_results = search_main_container.querySelector('#button_list') 

//trending father html elements-----------------------------
const trending_element = document.querySelector('.trending')
const carousel = trending_element.querySelector('.carousel') //carousel__container
const carousel_container = carousel.querySelector('.carousel__container')
let bg_modal_items

//empty elements list---------------------------------------
let list_no_result = search_main_container.querySelector(".main__container_no-result")
//----------------------------------------------------------

//https://media0.giphy.com/media/${id}/giphy.gif
/* let response =  fetch(link)
let file = response.blob()
a.href = window.URL.createObjectURL(file);
a.click() */

function init_button_search_list(gif_query_res_total_results, option=0) {
    /* 
    This function initialize the button show more in search, favorite and my gifs section.
    option=0 for search settings
    option=1 for favorite settings
    option=2 for my gifs settings
    */
    total_searches = gif_query_res_total_results
    search_offset = 0
    button_more_results.classList.add('visible')
    if (option === 0){
        button_more_results.onclick = () => {
            button_query_action()
        }
    }
    else if (option === 1){
        button_more_results.onclick = () => {
            button_query_saved_elements_action()
        }
    }
    else if (option === 2){
        button_more_results.onclick = () => {
            button_query_saved_elements_action()
        }
    }
}
//suggestion bar search API ------------------------------------------
async function init_search_suggestions(search_option) {
    try {
        const limit_search = 4
        let result_suggestion = []
        let url = `https://api.giphy.com/v1/gifs/search/tags?api_key=${APIKEY}&limit=${limit_search}&q=${search_option}`
        const res = await fetch(url)
        let gif_suggestion_res = await res.json()
        console.log(`Sugerencias aqui:`, gif_suggestion_res)
        gif_suggestion_res.data.forEach(element => {
            result_suggestion.push(element.name)
        })
        return result_suggestion
    }catch (err) {
        console.error(err);
    }

}


//trending topic API section -----------------------------------------
async function init_trending() {
    /**
     * This function generates a request to api in trending endpoint
     * and show 25 most populars gifs in carousel
     */
    
    try {
        const limit_search = gifs_trending //25
        let url = `https://api.giphy.com/v1/gifs/trending?api_key=${APIKEY}&limit=${limit_search}`
        const res = await fetch(url)
        let gif_trending_res = await res.json()
        create_html_gif_element(gif_trending_res,carousel_container)
        assign_events_items(carousel_container)

    } catch (err) {
        console.error(err)
    }

}
//------------------------------------------------------------------

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
        search_container_list.classList.remove("hidden")
        list_no_result.classList.remove("visible_no_result")
        create_html_gif_element(gif_trending_res,search_container_list)
        assign_events_items(search_container_list)
        search_container_list.classList.add('margin_search_active')

        if(new_query){
            actual_search_option = search_option
            init_button_search_list(gif_trending_res.pagination.total_count)
        }

        if(gif_trending_res.data.length === 0) {
            search_container_list.classList.add("hidden")
            button_more_results.classList.remove("visible")
            list_no_result.classList.add("visible_no_result")
        }

    } catch (err) {
        console.error(err)
    }
}
// --------------------------------------------------------------------------------

//# favorite session --------------------------------------------------------------
async function init_save_gifs(id_element,delete_btn=false) {
    /**Function
     * This function generates a request to api in id endpoint
     * show the favorites gifs in local storage
     */
    try {
        const url = `https://api.giphy.com/v1/gifs/${id_element}?api_key=${APIKEY}`
        const res = await fetch(url)
        let gif_trending_res = await res.json()
        gif_trending_res.data = [gif_trending_res.data]
        create_html_gif_element(gif_trending_res,search_container_list)
        assign_events_items(search_container_list,true,delete_btn)
        if (!search_container_list.classList.contains("margin_search_active")){
            search_container_list.classList.add('margin_search_active')
        }

    } catch (err) {
        console.error(err)
    }
}

function init_local_storage_gif_loop(local_storage_array,init=true,option_value=1) {
    console.log("mis_gifs",my_gifs)
    if (local_storage_array.length !== 0){
        for (let i= initial_position; i<final_position; i++){
            if(i > (local_storage_array.length -1)) {break}
            init_save_gifs(local_storage_array[i],include_delete)
        }
        if (init) {init_button_search_list(local_storage_array.length, option=option_value)}
    }else {
        toggle_show_empty_messague(list_no_result,"visible_no_result")
    }
}

function update_favorite_array(){
    favorites = JSON.parse(localStorage.getItem("favorites"))
}
function update_my_gifs_array(){
    my_gifs = JSON.parse(localStorage.getItem("my_gifs"))
}

//-------------------------------------------------------------------------------

function clean_search_list(){
    search_container_list.innerHTML = ''
}

//initialize favorite localstorage gifs
if (document.querySelector("#main_favorite.main__container")){
    update_favorite_array()
    init_local_storage_gif_loop(favorites, option_value=1)
}
else if (document.querySelector("#main_my_gifs.main__container")) {
    update_my_gifs_array()
    show_favorite = false
    include_delete = true
    init_local_storage_gif_loop(my_gifs, option_value=2)
}


//implement active favorite button and live remove