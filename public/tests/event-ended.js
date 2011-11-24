({
  name: 'event-ended',
  description: 'Event "ended"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#event-media-ended',
  assert: function(finish) {
    var audio = this.audio;

    audio.addEventListener('ended', function() {
      finish(true);
    }, false);

    audio.addEventListener('loadedmetadata', function() {
      audio.volume = 0;
      audio.play();
    }, false);

    audio.src = AWPY.sound.mini.stream_url();
  }
})
