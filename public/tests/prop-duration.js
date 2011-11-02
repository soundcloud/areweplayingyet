({
  description: 'Property "duration"',
  spec: 'http://dev.w3.org/html5/spec/Overview.html#dom-media-duration',
  longdesc: '',
  assert: function(finish) {
    var audio = this.audio = new Audio();
    finish( 'paused' in audio );
  }
})
