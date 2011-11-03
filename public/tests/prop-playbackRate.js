({
  name: 'prop-playbackRate',
  description: 'Property "playbackRate"',
  spec: 'http://dev.w3.org/html5/spec/Overview.html#dom-media-playbackrate',
  longdesc: '',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    if (!('playbackRate' in audio)) {
      finish( false );
    }

    audio.playbackRate = 0.5;
    finish( audio.playbackRate === 0.5 );
  }
})
