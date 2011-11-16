({
  name: 'event-suspend',
  description: 'Event "suspend"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#event-media-suspend',
  assert: function(finish) {
    var audio = this.audio;

    audio.addEventListener('suspend', function() {
      finish(true);
    }, false);

    audio.preload = 'metadata';
    audio.src = AWPY.sound.short.stream_url();
  }
})
