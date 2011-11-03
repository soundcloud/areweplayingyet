({
  name: 'event-ended',
  description: 'Event "ended"',
  assert: function(finish) {
    var audio = this.audio = new Audio();
    AWPY.logEvents(audio);
    audio.addEventListener('ended', function() {
      finish(true);
    }, false);

    audio.addEventListener('loadedmetadata', function() {
      audio.play();
    });

    audio.setAttribute('preload', 'metadata');
    audio.setAttribute('src', AWPY.sound.mini.stream_url(true));
    audio.volume = 0;
  }
})
