({
  name: 'event-canplaythrough',
  description: 'Event "canplaythrough"',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('canplaythrough', function() {
      finish(true); // WIN
    }, false);

    audio.setAttribute('src', AWPY.sound.mini.stream_url);
    audio.load(); // Should trigger canplaythrough soon

    setTimeout(function() {
      finish(false); // FAIL
    }, 1000);
  }
})
