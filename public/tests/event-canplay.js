({
  name: 'event-canplay',
  description: 'Event "canplay"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#event-media-canplay',
  assert: function(finish) {
    var audio = this.audio;

    audio.addEventListener('canplay', function() {
      finish(true); // WIN
    }, false);

    audio.src = AWPY.sound.mini.stream_url();
  }
})
