({
  name: 'prop-duration',
  description: 'Property "duration"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#dom-media-duration',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    finish('duration' in audio);
  }
})
