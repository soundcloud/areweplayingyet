({
  name: 'event-seeked',
  description: 'Event "seeked"',
  longdesc: 'Should fire even when seeking to unbuffered position.',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('seeked', function() {
      finish( true );
    }, false);

    audio.addEventListener('loadedmetadata', function() {
      if (audio.buffered.length) {
        audio.currentTime = audio.buffered.end(0) + 60;
      } else {
        audio.currentTime = AWPY.sound.long.duration / 8;
      }

      setTimeout(function() {
        finish( false );
      }, 10000);
    }, false);

    audio.setAttribute('preload', 'metadata');
    audio.setAttribute('src', AWPY.sound.long.stream_url);
  }
})
