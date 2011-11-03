({
  name: 'event-canplay',
  description: 'Event "canplay"',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('canplay', function() {
      finish(true);
    }, false);

    audio.setAttribute('src', AWPY.sound.short.stream_url(true));
    audio.load();
  }
})
