({
  name: 'event-pause',
  description: 'Event "pause"',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('pause', function() {
      finish(true);
    }, false);

    audio.addEventListener('loadedmetadata', function() {
      audio.volume = 0;
      audio.play();
      audio.pause();
    }, false);

    audio.setAttribute('src', AWPY.sound.short.stream_url());
    audio.load();
  }
})
