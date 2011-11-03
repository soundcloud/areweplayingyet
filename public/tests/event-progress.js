({
  name: 'event-progress',
  description: 'Trigger event progress',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('progress', function() {
      finish( true );
    }, false);

    audio.setAttribute('preload', 'metadata');
    audio.setAttribute('src', AWPY.sound.short.stream_url());
  }
})