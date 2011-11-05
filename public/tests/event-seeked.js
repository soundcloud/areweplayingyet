({
  name: 'event-seeked',
  description: 'Event "seeked"',
  longdesc: 'Should fire even when seeking to unbuffered position.',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('seeked', function() {
      finish(true);
    }, false);

    audio.addEventListener('loadedmetadata', function() {
      if (audio.buffered.length) {
        audio.currentTime = audio.buffered.end(0) + 60;
      } else {
        audio.currentTime = AWPY.sound.long.duration / 8;
      }
    }, false);

    audio.setAttribute('src', AWPY.sound.long.stream_url + (Math.random() * 1e9 | 0)); // Bust cache
    audio.load();
  }
})
