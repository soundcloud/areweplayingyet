({
  name: 'property-seekable',
  description: 'Property "seekable"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#dom-media-seekable',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('canplay', function() {
      finish(audio.seekable && audio.seekable.length);
    }, false);

    audio.src = AWPY.sound.mini.stream_url();
  }
})
