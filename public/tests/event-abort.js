({
  name: 'event-abort',
  description: 'Event "abort"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#event-media-abort',
  assert: function(finish) {
    var audio = this.audio;

    audio.addEventListener('abort', function() {
      finish(true); // WIN
    }, false);

    audio.addEventListener('loadstart', function() {
      audio.src = '';
      audio.load(); // Should trigger abort soon
    }, false);

    audio.src = AWPY.sound.short.stream_url();
  }
})
