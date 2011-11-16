({
  name: 'property-volume',
  description: 'Property "volume"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#dom-media-volume',
  assert: function(finish) {
    var audio = this.audio;

    if (!('volume' in audio)) {
      finish(false);
    }

    audio.volume = 0.5;
    finish(audio.volume === 0.5);
  }
})
