({
  name: 'event-seeked',
  description: 'Event "seeked"',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('seeked', function() {
      finish(true);
    }, false);

    audio.addEventListener('loadedmetadata', function() {
      audio.currentTime = AWPY.sound.long.duration / 8;
    }, false);

    audio.setAttribute('src', AWPY.sound.long.stream_url());
    audio.load();
  }
})
