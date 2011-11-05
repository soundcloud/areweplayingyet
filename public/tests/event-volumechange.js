({
  name: 'event-volumechange',
  description: 'Event "volumechange"',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('volumechange', function() {
      finish( audio.volume === 0.5 );
    }, false);

    audio.setAttribute('preload', 'metadata');
    audio.setAttribute('src', AWPY.sound.short.stream_url);
    audio.volume = 0.5;
  }
})
