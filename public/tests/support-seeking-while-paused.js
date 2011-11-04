({
  name: 'support-seeking-while-paused',
  description: 'Seeks while paused',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('loadedmetadata', function() {
      var seekTo = AWPY.sound.short.duration * 0.5;
      audio.volume = 0;
      audio.currentTime = seekTo;
      finish(Math.abs(audio.currentTime - seekTo) < 100);
    }, false);

    audio.setAttribute('preload', 'metadata');
    audio.setAttribute('src', AWPY.sound.short.stream_url());
  }
})