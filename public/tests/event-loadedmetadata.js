({
  name: 'event-loadedmetadata',
  description: 'Trigger event "loadedmetadata"',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('loadedmetadata', function() {
      finish( true );
    }, false);

    audio.setAttribute('preload', 'metadata');
    audio.setAttribute('src', AWPY.sound.short.stream_url());
  }
})