({
  name: 'event-canplaythrough',
  description: 'Trigger event "canplaythrough"',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('canplaythrough', function() {
      finish( true );
    }, false);

    audio.setAttribute('preload', 'metadata');
    audio.setAttribute('src', AWPY.sound.short.stream_url());
  }
})