({
  name: 'event-loadedmetadata',
  description: 'Event "loadedmetadata"',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('loadedmetadata', function() {
      finish(true);
    }, false);

    audio.setAttribute('src', AWPY.sound.short.stream_url);
    audio.load();
  }
})
