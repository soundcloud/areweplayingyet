({
  description: 'Property "currentTime"',
  assert: function(finish) {
    /* TODO: Fix Safari */
    var audio = this.audio = new Audio();
    audio.addEventListener('loadedmetadata', function() {
      audio.currentTime = 1;
      audio.addEventListener('timeupdate', function() {
        finish( audio.currentTime === 1 );
      }, false);
    }, false);

    audio.setAttribute('preload', 'metadata');
    audio.setAttribute('src', AWPY.sound.mini.stream_url());
  }
});
