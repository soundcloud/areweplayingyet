({
  name: 'event-seeking',
  description: 'Event "seeking"',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('seeking', function() {
      finish(true);
    }, false);

    audio.addEventListener('loadedmetadata', function() {
      audio.currentTime = AWPY.sound.long.duration / 2;
    }, false);

    audio.setAttribute('src', AWPY.sound.long.stream_url());
    audio.load();
  }
})
