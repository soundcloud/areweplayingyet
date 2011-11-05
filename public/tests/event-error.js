({
  name: 'event-error',
  description: 'Event "error"',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('error', function() {
      finish(true); // WIN
    }, false);

    audio.addEventListener('loadedmetadata', function() {
      audio.setAttribute('src', '');
      audio.load(); // Should trigger error soon
    });

    audio.setAttribute('src', AWPY.sound.mini.stream_url());
    audio.load();
  }
})
