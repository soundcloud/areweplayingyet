({
  name: 'event-loadstart',
  description: 'Trigger event "loadstart"',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('loadstart', function() {
      finish( true );
    }, false);

    audio.setAttribute('preload', 'metadata');
    audio.setAttribute('src', AWPY.sound.short.stream_url());
  }
})