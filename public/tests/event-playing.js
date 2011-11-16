({
  name: 'event-playing',
  description: 'Event "playing"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#event-media-playing',
  assert: function(finish) {
    var audio = this.audio;

    audio.addEventListener('playing', function() {
      finish(true);
    }, false);

    audio.addEventListener('loadedmetadata', function() {
      audio.volume = 0;
      audio.play();
    }, false);

    audio.src = AWPY.sound.mini.stream_url();
  }
})
