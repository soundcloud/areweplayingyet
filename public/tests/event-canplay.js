({
  name: 'event-canplay',
  description: 'Event "canplay"',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('canplay', function() {
      finish(true);
    }, false);

    audio.setAttribute('src', AWPY.sound.mini.stream_url);
    audio.load();
  }
})
