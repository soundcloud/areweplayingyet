({
  name: 'event-pause',
  description: 'Event "pause"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#event-media-pause',
  assert: function(finish) {
    var audio = this.audio;

    audio.addEventListener('pause', function() {
      finish(true);
    }, false);

    audio.addEventListener('loadedmetadata', function() {
      audio.volume = 0;
      audio.play();
      audio.pause();
    }, false);

    audio.src = AWPY.sound.short.stream_url();
  }
})
