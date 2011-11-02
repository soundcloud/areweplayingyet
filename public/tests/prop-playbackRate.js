({
  name: 'prop-playbackRate',
  description: 'Property "playbackRate"',
  spec: 'http://dev.w3.org/html5/spec/Overview.html#dom-media-playbackrate',
  longdesc: '',
  assert: function(finish) {
    var audio = this.audio = new Audio();
    audio.addEventListener('loadedmetadata', function() {
      audio.playbackRate = 0.5;
      audio.addEventListener('timeupdate', function() {
        finish( audio.playbackRate === 0.5 );
      }, false);
    }, false);

    audio.setAttribute('preload', 'metadata');
    audio.setAttribute('src', AWPY.sound.mini.stream_url());
  }
})