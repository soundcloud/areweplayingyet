({
  name: 'event-timeupdate',
  description: 'Event "timeupdate"',
  spec: 'http://dev.w3.org/html5/spec/media-elements.html#event-media-timeupdate',
  assert: function(finish) {
    var audio = this.audio;

    audio.addEventListener('timeupdate', function() {
      finish(true);
    }, false);

    audio.addEventListener('loadedmetadata', function() {
      audio.volume = 0;
      audio.play();
    }, false);

    audio.src = AWPY.sound.mini.stream_url();
  }
})
