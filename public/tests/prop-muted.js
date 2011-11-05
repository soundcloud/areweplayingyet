({
  name: 'prop-muted',
  description: 'Property "muted"',
  spec: 'http://dev.w3.org/html5/spec/Overview.html#dom-mediacontroller-muted',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    if (!('muted' in audio)) {
      finish(false);
    }

    audio.muted = true;
    finish(audio.muted === true);
  }
})
