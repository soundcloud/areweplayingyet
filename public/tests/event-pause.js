({
  name: 'event-pause',
  description: 'Event "pause"',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    // make sure we can play
    audio.addEventListener('loadedmetadata', function() {
      audio.play();
      audio.pause();
    }, false);

    audio.addEventListener('pause', function() {
      finish( true );
    }, false);

    audio.setAttribute('preload', 'metadata');
    audio.setAttribute('src', AWPY.sound.short.stream_url);
    audio.volume = 0;
  }
})
