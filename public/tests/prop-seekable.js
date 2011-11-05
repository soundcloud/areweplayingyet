({
  name: 'prop-seekable',
  description: 'Property "seekable"',
  spec: 'http://dev.w3.org/html5/spec/Overview.html#dom-media-seekable',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('loadedmetadata', function() {
      finish( audio.seekable && audio.seekable.length );
    }, false);

    audio.setAttribute('preload', 'metadata');
    audio.setAttribute('src', AWPY.sound.long.stream_url);
  }
})
