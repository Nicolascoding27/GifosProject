/**Regular variables */

// header elements -------------------------------------------
let menu = document.querySelector('.header__menu')
let button = document.querySelector('.header__menu--button')
let xIcon = document.querySelector('.xIcon')
let menuIcon = document.querySelector('.menuIcon')
// -----------------------------------------------------------

let nightModeButton = document.getElementById('darkModeButton')
//header
let line = document.getElementById('line')
let header = document.getElementById('header')
let logo = document.getElementById('logo')
let toogleHeaderButton = document.getElementById('header--toggleButton')
let hamburguerMenu = document.getElementById('list')
let create_gif_button = hamburguerMenu.querySelector('.button_add_gif')

// search section
let title_search_section
let title_trend
try {
  title_search_section = search_main_container.querySelector('#title_gifos')
  title_trend = search_main_container.querySelector('#main--gifos')
  search_trending_title = search_main_container.querySelector('.main__container--trends--title')
} catch {
  console.log('search section no existe en la pagina')
}

//trending
let trendingTitle
try {
  trendingTitle = trending_element.querySelector('#trending--title')
} catch {
  console.log('No existe trending section')
}

// Create gif
///assets/element_cinta1-modo-noc.svg
let cinta_1
let cinta_2
let film_roll
let record_wrapper
let divisor_record
let record_container
try {
  cinta_1 = record.querySelector('.animation__container--wheels_cinta1')
  cinta_2 = record.querySelector('.animation__container--wheels_cinta2')
  film_roll = record.querySelector('.film_roll')
  record_wrapper = record.querySelector('.record__steps--wrapper')
  divisor_record = record.querySelector('.record__steps-divisor')
  record_container = record.querySelector('.record__container')
} catch {
  console.log("crear gif no disponible")
}


//footer
let footer = document.getElementById('footer');

//--------------------------------------------------------------------------
/**Function that aims to show the hamburger menu */
function toggleMenu() {
  /* 
  this function toggle the menu options in mobile view
  */
  if (menu.classList.contains("header__menu--active")) {
    menu.classList.remove("header__menu--active")
    menu.classList.add('header__menu')
    xIcon.style.display = "none"
    menuIcon.style.display = "block"
  } else {
    menu.classList.add("header__menu--active")
    menu.classList.remove("header__menu")
    xIcon.style.display = "block"
    menuIcon.style.display = "none"
  }
}

button.addEventListener("click", toggleMenu)

/**Function that activates the dark mode */
nightModeButton.addEventListener("click", activateDarkMode)
function activateDarkMode() {
  if (document.body.style.backgroundColor === '') {
    // general
    document.body.style.backgroundColor = "rgb(55, 56, 60)";
    
    // header
    header.backgroundColor = "rgb(55, 56, 60)"
    nightModeButton.innerHTML = "Modo diurno"
    line.style.background = "black";
    hamburguerMenu.classList.add('text_white_night')
    hamburguerMenu.classList.add('dark_menu_color')
    create_gif_button.classList.add('button_add_gif_night')
    toogleHeaderButton.style.backgroundColor = "rgb(55, 56, 60)";
    toogleHeaderButton.style.color = "white";
    logo.src="./assets/logo-mobile-modo-noct.svg"

    // search section
    try {
      title_search_section.classList.add('text_dark')
      title_trend.classList.add('text_dark')
      search_trending_title.classList.add('text_dark')
      searchWrapper.classList.add('main__container--searchbox_nigh')
      icon.classList.add('main__container--serachbox--icon_nigh')
      title_search.style.color = "white"
    } catch (error) {
      console.log("No existe la seccion de busqueda")
    }
    
    // footer
    footer.style.color="white"
    footer.classList.add('footer-night')

    // Trending
    try {
      trending_element.style.backgroundColor="rgb(34, 35, 38)"
      trending_element.style.color="white"
      trendingTitle.classList.add('title_nigh')
      button_carousel_previous.classList.add('carousel--button_night_color')
      button_carousel_next.classList.add('carousel--button_night_color')

      button_more_results.classList.add('button_more_night')
    }catch {
      console.log('No existe section trending en la pagina')
    }

    // Record session
    try {
      cinta_1.src = '/assets/element_cinta1-modo-noc.svg'
      cinta_2.src = '/assets/element_cinta2-modo-noc.svg'
      film_roll.src = '/assets/pelicula-modo-noc.svg'
      button_record_step.classList.add('button_more_night')
      record_wrapper.classList.add('nigth_mode')
      divisor_record.classList.add('night_mode')
      record_container.classList.add('night_mode')
      record_display.classList.add('night_mode')
      record_steps_counter.classList.add('night_mode')
      record_steps_repeat.classList.add('night_mode')
    } catch {
      console.log('No existe sesion de crear gif')
    }
    
  }
  else if (document.body.style.backgroundColor == "rgb(55, 56, 60)") {
    //general
    document.body.style.backgroundColor = '';
    

    // header
    header.backgroundColor = '';
    nightModeButton.innerHTML = "Modo nocturno";
    hamburguerMenu.classList.remove('text_white_night')
    hamburguerMenu.classList.remove('dark_menu_color')
    create_gif_button.classList.remove('button_add_gif_night')
    toogleHeaderButton.style.backgroundColor = ""
    line.style.background = "rgb(87, 46, 229)"
    toogleHeaderButton.style.color = "rgb(87, 46, 229)"
    logo.src="./assets/logo-mobile.svg"

    // search section
    try {
      title_search_section.classList.remove('text_dark')
      title_trend.classList.remove('text_dark')
      search_trending_title.classList.remove('text_dark')
      searchWrapper.classList.remove('main__container--searchbox_nigh')
      icon.classList.remove('main__container--serachbox--icon_nigh')
      title_search.style.color = ""
    } catch(error) {
      console.log("No existe la seccion de busqueda")
    }

    // footer
    footer.style.color="black"
    footer.classList.remove('footer-night')
    
    // Trending
    try {
      trending_element.style.backgroundColor=""
      trending_element.style.color="black"
      trendingTitle.classList.remove('title_nigh')
      button_carousel_previous.classList.remove('carousel--button_night_color')
      button_carousel_next.classList.remove('carousel--button_night_color')

      button_more_results.classList.remove('button_more_night')
    }
    catch {
      console.log('No existe section trending en la pagina')
    }

    // Record session
    try {
      cinta_1.src = '/assets/element_cinta1.svg'
      cinta_2.src = '/assets/element_cinta1.svg'
      film_roll.src = '/assets/pelicula.svg'
      button_record_step.classList.remove('button_more_night')
      record_wrapper.classList.remove('nigth_mode')
      divisor_record.classList.remove('night_mode')
      record_container.classList.remove('night_mode')
      record_display.classList.remove('night_mode')
      record_steps_counter.classList.remove('night_mode')
      record_steps_repeat.classList.remove('night_mode')
    } catch {
      console.log('No existe sesion de crear gif')
    }
    
  }
}

// Initialize trending and resize events -----------------------------------------------
window.addEventListener("resize", () => {
  width_viewport = window.innerWidth
  media_queries_changes(width_viewport)
  try {
      media_queries_changes_trending(width_viewport)
  } catch {
      console.log("Elementos de trending no definidos en esta sección")
  }
  
})

document.addEventListener('DOMContentLoaded', () => {
  media_queries_changes(window.innerWidth)
  try {
      init_trending()
      media_queries_changes_trending(window.innerWidth)
  } catch {
      console.log("Elementos de trending no definidos en esta sección")
  }
})