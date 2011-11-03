({
  name: 'event-timeupdate',
  description: 'Event "timeupdate"',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('timeupdate', function() {
      finish(true);
    }, false);

    audio.addEventListener('loadedmetadata', function() {
      audio.play();
    });

    audio.setAttribute('preload', 'metadata');
    audio.setAttribute('src', AWPY.sound.short.stream_url(true));
  }
})
