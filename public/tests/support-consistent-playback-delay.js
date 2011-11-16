({
  name: 'support-consistent-playback-delay',
  description: 'Consistent time between play() and actual playback (< 20ms)',
  assert: function(finish) {
    var audio = this.audio, playTime;

    audio.addEventListener('playing', function() {
      finish(Date.now() - playTime < 20);
    }, false);

    audio.addEventListener('canplay', function() {
      audio.volume = 0;
      playTime = Date.now();
      audio.play();
    }, false);

    audio.src = AWPY.sound.short.stream_url();
  }
})
