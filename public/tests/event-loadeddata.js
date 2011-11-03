({
  name: 'event-loadeddata',
  description: 'Trigger event "loadeddata"',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('loadeddata', function() {
      finish( true );
    }, false);

    audio.setAttribute('preload', 'metadata');
    audio.setAttribute('src', AWPY.sound.short.stream_url());
  }
})