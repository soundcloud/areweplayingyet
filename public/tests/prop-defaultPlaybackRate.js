({
  name: 'prop-defaultPlaybackRate',
  description: 'Property "defaultPlaybackRate"',
  spec: 'http://dev.w3.org/html5/spec/Overview.html#dom-media-defaultplaybackrate',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    if (!('defaultPlaybackRate' in audio)) {
      finish( false );
    }

    audio.defaultPlaybackRate = 0.5;
    finish( audio.defaultPlaybackRate === 0.5 );
  }
})
