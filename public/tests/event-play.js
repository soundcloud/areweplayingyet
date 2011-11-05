({
  name: 'event-play',
  description: 'Event "play"',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('play', function() {
      finish(true);
    }, false);

    audio.addEventListener('loadedmetadata', function() {
      audio.volume = 0;
      audio.play();
    }, false);

    audio.setAttribute('src', AWPY.sound.mini.stream_url());
  }
})
