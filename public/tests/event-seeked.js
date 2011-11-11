({
  name: 'event-seeked',
  description: 'Event "seeked"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#event-media-seeked',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('seeked', function() {
      finish(true);
    }, false);

    audio.addEventListener('canplay', function() {
      audio.currentTime = AWPY.sound.long.duration / 8;
    }, false);

    audio.src = AWPY.sound.long.stream_url();
  }
})
