({
  name: 'prop-paused',
  description: 'Property "paused"',
  spec: 'http://dev.w3.org/html5/spec/Overview.html#dom-media-paused',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    finish( 'paused' in audio );
  }
})
