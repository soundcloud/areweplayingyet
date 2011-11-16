({
  name: 'support-consistent-timeupdate-interval',
  description: 'Consistent timeupdate interval (15ms - 250ms)',
  assert: function(finish) {
    var audio = this.audio,
        lastTime, count = 0;

    audio.addEventListener('timeupdate', function() {
      if (lastTime) {
        var now = new Date();
        if ((now - lastTime) < 15 || (now - lastTime) > 250) {
          finish(false);
        } else if (++count === 30) {
          finish(true);
        }
      }
      lastTime = new Date();
    }, false);

    audio.addEventListener('loadedmetadata', function() {
      audio.volume = 0;
      audio.play();
    }, false);

    audio.src = AWPY.sound.short.stream_url();
  }
})
