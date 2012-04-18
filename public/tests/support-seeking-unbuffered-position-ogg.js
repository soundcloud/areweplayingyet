({
  name: 'support-seeking-unbuffered-position-ogg',
  description: 'Seeking to unbuffered position with continuous playback after seeking (Ogg)',
  assert: function(finish) {
    var audio = this.audio,
        seekedTime,
        counter = 0,
        result = true,
        timeout = false;

    audio.addEventListener('seeked', function() {
      if (audio.currentTime < seekedTime) {
        finish(false);
      } else {
        clearTimeout(timeout);

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
      }
    }, false);

    audio.addEventListener('loadedmetadata', function() {
      audio.volume = 0;
      audio.currentTime = seekedTime = AWPY.sound.long.duration * 0.9;
      timeout = setTimeout(finish.bind(null, false), 3000);
    }, false);

    audio.preload = 'metadata';
    //Override default config with specific codec
    audio.src = AWPY.sound.long.stream_url(false, 'ogg');
  }
})
