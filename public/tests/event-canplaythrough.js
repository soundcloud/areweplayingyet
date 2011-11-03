({
  name: 'event-canplaythrough',
  description: 'Event "canplaythrough"',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('canplaythrough', function() {
      finish( true );
    }, false);

    audio.setAttribute('src', AWPY.sound.short.stream_url());
    audio.load();
  }
})
