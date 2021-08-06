const record = document.querySelector('.record')
const record_display = record.querySelector('#record_display')
const record_steps_container = record.querySelector('.record__steps')
const record_steps_counter = record_steps_container.querySelector('.record__step-counter')
const record_steps_repeat = record_steps_container.querySelector('.record_step-repeat')
const record_steps = record_steps_container.querySelectorAll('.record__steps-step')
const button_record_step = record.querySelector('#button_list')

let record_display_video
// record_display.querySelector('.record_display_video')

let button_step = 2
let videoStream

record_steps_counter.innerHTML = "00:00:00"
hours = 0
minutes = 0
seconds = 0

function clean_element(father) {
    father.innerHTML = ""
}

// view record display functions

/* 
Las vistas son insertadas en:
#record_display
*/

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
    <video class="record_display_video" src="./"></video>
    `
    father.innerHTML = content
}
function view_4_record(father) {
    const content = `
    <video class="record_display_video" src="./"></video>
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
    <video class="record_display_video" src="./"></video>
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

// visibility of counter and repeat
// toggle_show_empty_messague(record_steps_repeat,'block')

// buttons_visibility ----------------------------------------------------------------------
function asign_button_aspect(num) {
    let content = "<p></p>"
    clean_element(button_record_step)
    switch (num) {
        case 1:
            button_record_step.classList.add('visible')
            content = `<p>comenzar</p>`
            break
        case 2:
            button_record_step.classList.remove('visible')
            break
        case 3:
            content = `<p>grabar</p>`
            button_record_step.classList.add('visible')
            break
        case 4:
            content = `<p>finalizar</p>`
            break
        case 5:
            content = `<p>subir gifo</p>`
            break
        case 6:
            button_record_step.classList.remove('visible')
            break
        default:
            console.log(`case ${num} no esta definido en la secuencia`)
    }
    button_record_step.innerHTML = content
}

//initial conditions
view_1_record(record_display)
asign_button_aspect(1)

// timer ------------------------------------------------
function prependZeros(num){
    //function that format the time
    var str = ("" + num)
    return (Array(Math.max(3-str.length, 0)).join("0") + str)
}

let timekeeperFunction = ()=>{
    seconds +=1 
    //verificación segundos
    if(seconds === 60){
        seconds = 0
        minutes += 1
    }
    if(minutes === 60){
        minutes = 0
        hours += 1
    }
    if(hours === 24) {
        hours = 0
    }
    let hs = prependZeros(hours)
    let mm = prependZeros(minutes)
    let ss = prependZeros(seconds)
    record_steps_counter.innerHTML = hs +":"+mm+":"+ss
}

timekeeper =  setInterval(timekeeperFunction,1000) //timer

//record proccess ------------------------------------------------------

//Tiene toda la info del gif creado
let form = new FormData();
//url de la API search gifs GIPHY
let urlUploadGif = `https://upload.giphy.com/v1/gifs?api_key=${APIKEY}`
record_display_video = record_display.querySelector('.record_display_video')

function accessCam (){
    // Habilita permisos
    navigator.mediaDevices.getUserMedia({
        // devuelve promesa
        audio: false, 
        // sin audio
        video: {
           height: { max: 320 }
        }
        // medidas para el video
     })
     .then(responsesStream =>{
        showRecElements(responsesStream)
     })
}

let showRecElements = (stream)=>{
    // guarda el video y lo conecta a los elementos
    record_display_video.srcObject = stream //llamar record_display_video cuando este cargado
    record_display_video.play()
    //almacenar respuesta
    videoStream = stream
}

//grabar video
let streamVideo = ()=>{
    // create RTC object (simplifies recording)
    recorder = RecordRTC(videoStream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function() {
        console.log('started')
    },
    });
    recorder.startRecording();
    toggle_show_empty_messague(record_steps_counter,'block')
    timekeeper =  setInterval(timekeeperFunction,1000);
    //active button
}

function sequence_record(step) {
    if (step === 2) {
        view_1_record(record_display)
        asign_button_aspect(1)
        accessCam()
    }
    button_step += 1
}

button_record_step.onclick = () => {
    sequence_record(button_step)
}

