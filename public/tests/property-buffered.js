({
  name: 'property-buffered',
  description: 'Property "buffered"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#dom-media-buffered',
  assert: function(finish) {
    var audio = this.audio;

    audio.addEventListener('loadedmetadata', function() {
      finish(audio.buffered && audio.buffered.length);
    }, false);

    audio.src = AWPY.sound.mini.stream_url();
  }
})
