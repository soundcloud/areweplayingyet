({
  name: 'property-muted',
  description: 'Property "muted"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#dom-media-muted',
  assert: function(finish) {
    var audio = this.audio;

    if (!('muted' in audio)) {
      finish(false);
    }

    audio.muted = true;
    finish(audio.muted === true);
  }
})
