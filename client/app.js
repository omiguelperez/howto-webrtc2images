'use strict'

const Webrtc2Images = require('webrtc2images')

let rtc = new Webrtc2Images({
  width: 200,
  hegiht: 200,
  frames: 10,
  type: 'image/jpeg',
  quality: 0.4,
  interval: 200
})

rtc.startVideo(function (err) {
  if (err) console.log(err)
})

let record = document.getElementById('record')

record.addEventListener('click', function (ev) {
  ev.preventDefault()

    rtc.recordVideo(function (err, frames) {
      if (err) console.log(err)
      else console.log(frames)
    })
})
