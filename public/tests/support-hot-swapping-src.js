({
  name: 'support-hot-swapping-src',
  description: 'Hot swapping audio src',
  longdesc: 'Audio should allow src changes without re-initializing the object.',
  assert: function(finish) {
    var audio = this.audio;

    audio.addEventListener('loadedmetadata', function() {
      audio.removeEventListener('loadedmetadata', arguments.callee, false);
      audio.volume = 0.5;
      audio.addEventListener('loadedmetadata', function() {
        finish(audio.volume === 0.5);
      }, false);
      audio.src = AWPY.sound.short.stream_url();
    }, false);

    audio.src = AWPY.sound.mini.stream_url();
  }
})
