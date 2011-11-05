({
  name: 'event-ended',
  description: 'Event "ended"',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('ended', function() {
      finish(true);
    }, false);

    audio.addEventListener('loadedmetadata', function() {
      audio.volume = 0;
      audio.play();
    });

    audio.setAttribute('src', AWPY.sound.mini.stream_url);
    audio.load();
  }
})
