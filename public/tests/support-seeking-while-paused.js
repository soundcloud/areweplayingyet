({
  name: 'support-seeking-while-paused',
  description: 'Seeks while paused',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('loadedmetadata', function() {
      var seekTo = AWPY.sound.short.duration * 0.5;
      audio.currentTime = seekTo;
      finish(audio.currentTime === seekTo);
    }, false);

    audio.setAttribute('preload', 'metadata');
    audio.setAttribute('src', AWPY.sound.short.stream_url);
  }
})
