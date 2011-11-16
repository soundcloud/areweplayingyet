({
  name: 'event-canplaythrough',
  description: 'Event "canplaythrough"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#event-media-canplaythrough',
  assert: function(finish) {
    var audio = this.audio;

    audio.addEventListener('canplaythrough', function() {
      finish(true); // WIN
    }, false);

    audio.src = AWPY.sound.mini.stream_url();
  }
})
