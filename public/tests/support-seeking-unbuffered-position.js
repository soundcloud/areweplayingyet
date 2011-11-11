({
  name: 'support-seeking-unbuffered-position',
  description: 'Seeking to unbuffered position with continuous playback after seeking',
  assert: function(finish) {
    var audio = this.audio = new Audio(),
        seekedTime,
        counter = 0,
        result = true;

    audio.addEventListener('seeked', function() {
      if (Math.round(audio.currentTime) < seekedTime) {
        finish(false);
      }

      audio.volume = 0;
      audio.play();

      audio.addEventListener('timeupdate', function() {
        if (++counter > 30) {
          finish(result);
        } else if (!audio.paused && audio.currentTime > seekedTime) {
          result = true;
        } else {
          result = false;
        }
      }, false);
    }, false);

    audio.addEventListener('canplay', function() {
      audio.removeEventListener('canplay', arguments.callee, false);
      audio.currentTime = seekedTime = AWPY.sound.long.duration * 0.8 | 0;
    }, false);

    audio.src = AWPY.sound.long.stream_url();
  }
})
