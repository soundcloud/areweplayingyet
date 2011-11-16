({
  name: 'event-play',
  description: 'Event "play"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#event-media-play',
  assert: function(finish) {
    var audio = this.audio;

    audio.addEventListener('play', function() {
      finish(true);
    }, false);

    audio.addEventListener('loadedmetadata', function() {
      audio.volume = 0;
      audio.play();
    }, false);

    audio.src = AWPY.sound.mini.stream_url();
  }
})
