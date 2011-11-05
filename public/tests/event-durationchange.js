({
  name: 'event-durationchange',
  description: 'Event "durationchange"',
  spec: 'http://www.w3.org/TR/html5/video.html#event-media-durationchange',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('durationchange', function() {
      finish(true); // WIN
    }, false);

    audio.setAttribute('src', AWPY.sound.mini.stream_url);
    audio.load(); // Should trigger durationchange soon

    setTimeout(function() {
      finish(false); // FAIL
    }, 1000);
  }
})
