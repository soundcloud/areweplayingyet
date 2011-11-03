({
  name: 'event-loadeddata',
  description: 'Event "loadeddata"',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('loadeddata', function() {
      finish( true );
    }, false);

    audio.setAttribute('preload', 'metadata');
    audio.setAttribute('src', AWPY.sound.short.stream_url());
  }
})
