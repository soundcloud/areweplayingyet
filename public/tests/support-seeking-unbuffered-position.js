({
  name: 'support-seeking-unbuffered-position',
  description: 'Seeking to unbuffered position with seamless playback',
  spec: '#',
  longdesc: '',
  assert: function(finish) {
    var audio = this.audio = new Audio(),
        seekedTime,
        counter = 0,
        result = true;

    audio.addEventListener('loadedmetadata', function() {
      audio.volume = 0;
      audio.play();
      audio.currentTime = seekedTime = AWPY.sound.long.duration * 0.5;
      setTimeout(function() {
        if (audio.paused || Math.abs(audio.currentTime - seekedTime) > 100) {
          finish(false);
        }

        audio.addEventListener('timeupdate', function timeUpdate() {
          if (++counter > 20) {
            audio.removeEventListener('timeupdate', timeUpdate, false);
            finish(result);
          } else if (!audio.paused && audio.currentTime > seekedTime) {
            result = true;
          } else {
            result = false;
          }
        }, false);

        setTimeout(function() {
          if (!counter) {
            finish(false);
          }
        }, 1500);
      }, 1000);
    }, false);

    audio.setAttribute('preload', 'metadata');
    audio.setAttribute('src', AWPY.sound.long.stream_url());
  }
})