/* 
Las vistas son insertadas en:
#record_display
*/

/* vista 1
<div id="show_container" class="record__container--display_messague">
    <h2>¿Nos das acceso</h2>
    <h2>a tu cámara?</h2>
    <p>El acceso a tu camara será válido sólo</p>
    <p>por el tiempo en el que estés creando el GIFO.</p>
</div>
*/

/* vista 2
<div id="show_container" class="record__container--display_messague">
    <h2>¿Nos das acceso</h2>
    <h2>a tu cámara?</h2>
    <p>El acceso a tu camara será válido sólo</p>
    <p>por el tiempo en el que estés creando el GIFO.</p>
</div>
*/

/* vista 3 is video instead img
<img class="record_display_video" src="https://images.nintendolife.com/07616fafa58c0/1280x720.jpg" alt="prove">
*/

/* vista 4 is video instead img
<img class="record_display_video" src="https://images.nintendolife.com/07616fafa58c0/1280x720.jpg" alt="prove">
<div id="show_container" class="record__container--display_cover">
    <div class="record__container--messague_check alself-center">
    <img id="loader" src="/assets/loader.svg" alt="loader">
    <p class="record__container--messague_check-text">Estamos subiendo tu GIFO</p>
    </div>
</div>
*/

/* vista 5 is video instead img
<img class="record_display_video" src="https://images.nintendolife.com/07616fafa58c0/1280x720.jpg" alt="prove">
<div id="show_container" class="record__container--display_cover">
    <div class="record__container--options">
    <div id="download-record" aria-labelledby="download-record"><a href="#" download></a></div>
    <div id="link-record" class="link-record" aria-labelledby="delete_icon"></div>
    </div>
    <div class="record__container--messague_check">
    <img src="/assets/check.svg" alt="check">
    <p class="record__container--messague_check-text">GIFO subido con éxito</p>
    </div>
</div>
*/

const record = document.querySelector('.record')
const record_display = record.querySelector('#record_display')
const record_steps_container = record.querySelector('.record__steps')
const record_steps_counter = record_steps_container.querySelector('.record__step-counter')
const record_steps_repeat = record_steps_container.querySelector('.record_step-repeat')
const record_steps = record_steps_container.querySelectorAll('.record__steps-step')

function clean_element(father) {
    father.innerHTML = ""
}

// view record display functions

function view_1_record(father) {
    const content = `
    <div id="show_container" class="record__container--display_messague">
        <h2>Aquí podrás</h2>
        <h2>crear tus propios <span>GIFOS</span></h2>
        <p>¡Crea tu GIFO en sólo 3 pasos!</p>
        <p>(sólo necesitas una cámara para grabar un video)</p>
    </div>
    `
    father.innerHTML = content
}
function view_2_record(father) {
    const content = `
    <div id="show_container" class="record__container--display_messague">
        <h2>¿Nos das acceso</h2>
        <h2>a tu cámara?</h2>
        <p>El acceso a tu camara será válido sólo</p>
        <p>por el tiempo en el que estés creando el GIFO.</p>
    </div>
    `
    father.innerHTML = content
}
function view_3_record(father) {
    const content = `
    <img class="record_display_video" src="https://images.nintendolife.com/07616fafa58c0/1280x720.jpg" alt="prove">
    `
    father.innerHTML = content
}
function view_4_record(father) {
    const content = `
    <img class="record_display_video" src="https://images.nintendolife.com/07616fafa58c0/1280x720.jpg" alt="prove">
    <div id="show_container" class="record__container--display_cover">
        <div class="record__container--messague_check alself-center">
            <img id="loader" src="/assets/loader.svg" alt="loader">
            <p class="record__container--messague_check-text">Estamos subiendo tu GIFO</p>
        </div>
    </div>
    `
    father.innerHTML = content
}
function view_5_record(father) {
    const content = `
    <img class="record_display_video" src="https://images.nintendolife.com/07616fafa58c0/1280x720.jpg" alt="prove">
    <div id="show_container" class="record__container--display_cover">
        <div class="record__container--options">
            <div id="download-record" aria-labelledby="download-record"><a href="#" download></a></div>
            <div id="link-record" class="link-record" aria-labelledby="delete_icon"></div>
        </div>
        <div class="record__container--messague_check">
            <img src="/assets/check.svg" alt="check">
            <p class="record__container--messague_check-text">GIFO subido con éxito</p>
        </div>
    </div>
    `
    father.innerHTML = content
}

// steps functions
function asign_step (index) {
    record_steps[index].classList.add('record__steps-step-active')
}
function remove_step (index) {
    record_steps[index].classList.remove('record__steps-step-active')
}

//visibility of counter and repeat
toggle_show_empty_messague(record_steps_repeat,'block')

view_1_record(record_display)
asign_step(0)
