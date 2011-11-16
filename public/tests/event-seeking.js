({
  name: 'event-seeking',
  description: 'Event "seeking"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#event-media-seeking',
  assert: function(finish) {
    var audio = this.audio;

    audio.addEventListener('seeking', function() {
      finish(true);
    }, false);

    audio.addEventListener('loadedmetadata', function() {
      audio.currentTime = AWPY.sound.long.duration / 2;
    }, false);

    audio.src = AWPY.sound.long.stream_url();
  }
})
