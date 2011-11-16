({
  name: 'event-loadedmetadata',
  description: 'Event "loadedmetadata"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#event-media-loadedmetadata',
  assert: function(finish) {
    var audio = this.audio;

    audio.addEventListener('loadedmetadata', function() {
      finish(true);
    }, false);

    audio.src = AWPY.sound.short.stream_url();
  }
})
