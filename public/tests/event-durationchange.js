({
  name: 'event-durationchange',
  description: 'Event "durationchange"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#event-media-durationchange',
  assert: function(finish) {
    var audio = this.audio;

    audio.addEventListener('durationchange', function() {
      finish(true); // WIN
    }, false);

    audio.src = AWPY.sound.mini.stream_url();
  }
})
