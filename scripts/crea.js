/**
 * Contrainst to make possible the recording of the video
 */
let constraintObj = {
  audio: false, //it could be true and true and that's it
  video: {
    facingMode: "user",
    width: { min: 640, ideal: 1200, max: 1920 },
    height: { min: 480, ideal: 720, max: 1080 },
  },
};
/** For old versions*/
if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices={}
    navigator.mediaDevices.getUserMedia=function(constraintObj){
        let getUserMedia=navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if(!getUserMedia){
            return Promise.reject(new Error (' getUserMedia is not implement in this browser')) //Directly goes to catch the error
        }
        return new Promise(function(resolve,reject){
            getUserMedia.call(navigator,constraintObj,resolve,reject)
            //we re calling a function in this case navigator 
        })
    }
} else {
  //enumerateDevices gives me a list of the devices to record in the device
  navigator.mediaDevices
    .enumerateDevices()
    .then(devices => {
      devices.forEach(device => {
        console.log(device.kind.toUpperCase(), device.label);
      });
    })
    .catch(err => {
      console.log(err);
    });
}

navigator.mediaDevices
  .getUserMedia(constraintObj)
  .then(function (mediaStreamObj) {
    let video = document.querySelector("video");
    if ("srcObject" in video) {
        video.srcObject = mediaStreamObj;
        console.log(video)
        console.log(mediaStreamObj)
    }
    //this is the old version
    else {
        video.src = window.URL.createObjectURL(mediaStreamObj);
    }
    video.onloadedmetadata = function (ev) {
        //When the data is ready
        //Reproduce the video that is being captured
        video.play();
    };
    //Add event listeners for saving and reproducing the audio
    let start = document.getElementById("btnStart");
    let stop = document.getElementById("btnStop");
    // let save = document.getElementById("btnSave");
    let vidSave=document.getElementById('vid2')
    let mediaRecorder = new MediaRecorder(mediaStreamObj); //second api
    let chunks = []; //the chunks are used every time is data avaiable
    start.addEventListener("click", en => {
      mediaRecorder.start();
      console.log(">>>>>estado media recorder" + mediaRecorder.state);
    }); //en s propbably
    stop.addEventListener("click", en => {
      mediaRecorder.stop();
      console.log(">>>>>estado media" + mediaRecorder.state);
    });
    mediaRecorder.ondataavailable = function (ev) {
      chunks.push(ev.data); //we're ppushing the data into the array
    };
    mediaRecorder.onstop = ev => {
      let blob = new Blob(chunks, { type: "video/mp4;" });
      console.log(chunks)
      chunks = []; //we're cleaning the chunks
      let videoURL = window.URL.createObjectURL(blob);
      vidSave.src = videoURL;
      console.log(videoURL)
    };
  })
  .catch(function (err) {
    console.log(err.name, err);
  });
// async function getMedia(constraints) {
//     let stream = null;

//     try {
//       stream = await navigator.mediaDevices.getUserMedia(constraints);
//       /* use the stream */
//     } catch(err) {
//       /* handle the error */
//     }
//   }
