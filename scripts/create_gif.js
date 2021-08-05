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
function clean_element(father) {
    father.innerHTML = ""
}
function view_1_record(father) {
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
