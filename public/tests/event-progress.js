({
  name: 'event-progress',
  description: 'Event "progress"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#event-media-progress',
  assert: function(finish) {
    var audio = this.audio;

    audio.addEventListener('progress', function() {
      finish(true);
    }, false);

    audio.src = AWPY.sound.long.stream_url();
  }
})
