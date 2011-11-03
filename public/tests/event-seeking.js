({
  name: 'event-seeking',
  description: 'Event "seeking"',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('seeking', function() {
      finish( true );
    }, false);

    audio.addEventListener('loadedmetadata', function() {
      audio.currentTime = Math.round(AWPY.sound.long.duration / 2);
      setTimeout(function() {
        finish( false );
      }, 3000);
    },false);

    audio.setAttribute('preload', 'metadata');
    audio.setAttribute('src', AWPY.sound.long.stream_url());
  }
})
