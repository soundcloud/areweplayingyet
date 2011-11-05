({
  name: 'event-canplay',
  description: 'Event "canplay"',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('canplay', function() {
      finish(true); // WIN
    }, false);

    audio.setAttribute('src', AWPY.sound.mini.stream_url);
    audio.load(); // Should trigger canplay soon
  }
})
