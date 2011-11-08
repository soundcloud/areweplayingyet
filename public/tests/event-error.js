({
  name: 'event-error',
  description: 'Event "error"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#event-media-error',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('error', function() {
      finish(true); // WIN
    }, false);

    audio.addEventListener('loadedmetadata', function() {
      audio.src = 'invalid:url';
    }, false);

    audio.src = AWPY.sound.mini.stream_url();
  }
})
