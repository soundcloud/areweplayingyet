({
  name: 'property-paused',
  description: 'Property "paused"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#dom-media-paused',
  assert: function(finish) {
    var audio = this.audio;

    finish('paused' in audio);
  }
})
