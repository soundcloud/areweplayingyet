({
  name: 'event-durationchange',
  description: 'Event "durationchange"',
  assert: function(finish) {
    var audio = this.audio = new Audio();
    AWPY.logEvents(audio);
    audio.addEventListener('durationchange', function() {
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
