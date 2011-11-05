({
  name: 'support-seeking-unbuffered-position',
  description: 'Seeking to unbuffered position with seamless playback',
  assert: function(finish) {
    var audio = this.audio = new Audio(),
        seekedTime,
        counter = 0,
        result = true;

    audio.addEventListener('seeked', function() {
      if (audio.paused || Math.abs(audio.currentTime - seekedTime) > 100) {
        finish(false);
      }

      audio.addEventListener('timeupdate', function() {
        if (++counter > 20) {
          finish(result);
        } else if (!audio.paused && audio.currentTime > seekedTime) {
          result = true;
        } else {
          result = false;
        }
      }, false);
    }, false);

    audio.addEventListener('loadedmetadata', function() {
      audio.volume = 0;
      audio.play();

      if (audio.buffered.length) {
        audio.currentTime = seekedTime = audio.buffered.end(0) + 60;
      } else {
        audio.currentTime = seekedTime = AWPY.sound.long.duration * 0.5;
      }
    }, false);

    audio.setAttribute('preload', 'metadata');
    audio.setAttribute('src', AWPY.sound.long.stream_url());
  }
})
