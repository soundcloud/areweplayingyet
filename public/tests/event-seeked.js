({
  name: 'event-seeked',
  description: 'Event "seeked"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#event-media-seeked',
  assert: function(finish) {
    var audio = this.audio;

    audio.addEventListener('seeked', function() {
      finish(true);
    }, false);

    audio.addEventListener('loadedmetadata', function() {
      audio.currentTime = 2;
    }, false);

    audio.src = AWPY.sound.mini.stream_url();
  }
})
