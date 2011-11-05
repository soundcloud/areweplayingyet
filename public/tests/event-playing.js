({
  name: 'event-playing',
  description: 'Event "playing"',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('playing', function() {
      finish(true);
    }, false);

    audio.addEventListener('loadedmetadata', function() {
      audio.volume = 0;
      audio.play();
    }, false);

    audio.setAttribute('src', AWPY.sound.mini.stream_url());
    audio.load();
  }
})
