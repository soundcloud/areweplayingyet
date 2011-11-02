({
  description: 'Hot swapping audio src',
  spec: '#',
  longdesc: 'Audio should allow src changes without re-initializing the object.',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('loadedmetadata', function loadedMetaData1() {
      audio.removeEventListener('loadedmetadata', loadedMetaData1, false);
      audio.volume = 0;
      audio.play();
      setTimeout(function() {
        audio.addEventListener('loadedmetadata', function() {
          audio.addEventListener('timeupdate', function timeUpdate() {
            audio.removeEventListener('timeupdate', timeUpdate, false);
            finish(true);
          }, false);
          audio.play();
        }, false);

        audio.setAttribute('src', AWPY.sound.short.stream_url());

        if (audio.readyState) {
          finish(false);
        }
      }, 1000);
    }, false);

    audio.setAttribute('preload', 'metadata');
    audio.setAttribute('src', AWPY.sound.long.stream_url(true));
  }
});