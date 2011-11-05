({
  name: 'prop-volume',
  description: 'Property "volume"',
  spec: 'http://dev.w3.org/html5/spec/Overview.html#dom-mediacontroller-volume',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    if (!('volume' in audio)) {
      finish(false);
    }

    audio.volume = 0.5;
    finish(audio.volume === 0.5);
  }
})
