({
  name: 'event-loadeddata',
  description: 'Event "loadeddata"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#event-media-loadeddata',
  assert: function(finish) {
    var audio = this.audio;

    audio.addEventListener('loadeddata', function() {
      finish(true);
    }, false);

    audio.src = AWPY.sound.mini.stream_url();
  }
})
