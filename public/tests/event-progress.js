({
  name: 'event-progress',
  description: 'Event "progress"',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('progress', function() {
      finish( true );
    }, false);

    audio.setAttribute('src', AWPY.sound.short.stream_url(true));
    audio.load();
  }
})
