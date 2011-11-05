({
  name: 'support-hot-swapping',
  description: 'Hot swapping audio src',
  longdesc: 'Audio should allow src changes without re-initializing the object.',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('loadedmetadata', function() {
      audio.removeEventListener('loadedmetadata', arguments.callee, false);
      audio.currentTime = 1;
      audio.addEventListener('loadedmetadata', function() {
        finish(audio.currentTime === 1);
      }, false);
      audio.setAttribute('src', AWPY.sound.short.stream_url);
      audio.load();
    }, false);

    audio.setAttribute('src', AWPY.sound.mini.stream_url);
    audio.load();
  }
})
