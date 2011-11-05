({
  name: 'event-playing',
  description: 'Event "playing"',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('playing', function() {
      finish(true);
    }, false);

    audio.addEventListener('loadedmetadata', function() {
      audio.play();
    });

    audio.setAttribute('preload', 'metadata');
    audio.setAttribute('src', AWPY.sound.short.stream_url);
    audio.volume = 0;
  }
})
