({
  name: 'event-loadstart',
  description: 'Event "loadstart"',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('loadstart', function() {
      finish( true );
    }, false);

    audio.setAttribute('src', AWPY.sound.short.stream_url);
    audio.load();
  }
})
