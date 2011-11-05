({
  name: 'event-loadeddata',
  description: 'Event "loadeddata"',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('loadeddata', function() {
      finish(true);
    }, false);

    audio.setAttribute('src', AWPY.sound.mini.stream_url());
    audio.load();
  }
})
