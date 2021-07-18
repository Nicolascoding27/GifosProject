//suggestion generator function and slider button functionality

let suggestions

async function get_suggestions (data){
    suggestions = await init_search_suggestions(data)
}

