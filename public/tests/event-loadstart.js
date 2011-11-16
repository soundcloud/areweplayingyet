({
  name: 'event-loadstart',
  description: 'Event "loadstart"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#event-media-loadstart',
  assert: function(finish) {
    var audio = this.audio;

    audio.addEventListener('loadstart', function() {
      finish(true);
    }, false);

    audio.src = AWPY.sound.mini.stream_url();
  }
})
